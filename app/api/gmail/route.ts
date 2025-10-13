import { google } from 'googleapis';
import { auth } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });

    if (!response.data.messages) {
      return NextResponse.json({ messages: [] });
    }

    const messages = await Promise.all(
      response.data.messages.slice(0, 10).map(async (message) => {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
        });

        const headers = msg.data.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
        
        let body = '';
        if (msg.data.payload?.parts) {
          const textPart = msg.data.payload.parts.find(p => p.mimeType === 'text/plain');
          if (textPart?.body?.data) {
            body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
          }
        } else if (msg.data.payload?.body?.data) {
          body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
        }

        return {
          id: message.id,
          subject,
          from,
          body: body.substring(0, 500),
          date: new Date(parseInt(msg.data.internalDate || '0')).toISOString(),
        };
      })
    );

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Gmail API error:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}