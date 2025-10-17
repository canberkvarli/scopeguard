import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../auth/[...nextauth]/route';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId } = await request.json();
    
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Get the project to verify ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id
      }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Get user's Google account tokens
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: 'google'
      }
    });

    if (!account?.access_token || !account?.refresh_token) {
      return NextResponse.json({ error: 'Google account not connected' }, { status: 400 });
    }

    // Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL + '/api/auth/callback/google'
    );

    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
    });

    // Create Gmail API instance
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for emails from the client
    const searchQuery = `from:${project.clientName.toLowerCase().replace(/\s+/g, '')}@* OR to:${project.clientName.toLowerCase().replace(/\s+/g, '')}@*`;
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: searchQuery,
      maxResults: 50
    });

    const messages = response.data.messages || [];
    const emails = [];

    // Fetch full message details
    for (const message of messages) {
      try {
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
          format: 'full'
        });

        const headers = fullMessage.data.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || '';
        const from = headers.find(h => h.name === 'From')?.value || '';
        const to = headers.find(h => h.name === 'To')?.value || '';
        const date = headers.find(h => h.name === 'Date')?.value || '';

        // Extract email body
        let body = '';
        if (fullMessage.data.payload?.body?.data) {
          body = Buffer.from(fullMessage.data.payload.body.data, 'base64').toString();
        } else if (fullMessage.data.payload?.parts) {
          for (const part of fullMessage.data.payload.parts) {
            if (part.mimeType === 'text/plain' && part.body?.data) {
              body = Buffer.from(part.body.data, 'base64').toString();
              break;
            }
          }
        }

        // Check if email already exists
        const existingEmail = await prisma.email.findUnique({
          where: { messageId: message.id! }
        });

        if (!existingEmail) {
          emails.push({
            messageId: message.id!,
            subject,
            sender: from,
            recipient: to,
            body: body.substring(0, 10000), // Limit body size
            receivedAt: new Date(date),
            projectId
          });
        }
      } catch (error) {
        console.error('Error fetching message details:', error);
      }
    }

    // Save emails to database
    const savedEmails = [];
    for (const email of emails) {
      try {
        const savedEmail = await prisma.email.create({
          data: email
        });
        savedEmails.push(savedEmail);
      } catch (error) {
        console.error('Error saving email:', error);
      }
    }

    return NextResponse.json({
      success: true,
      emails: savedEmails,
      count: savedEmails.length
    });

  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}
