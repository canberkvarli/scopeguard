import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import Anthropic from '@anthropic-ai/sdk';

const prisma = new PrismaClient();
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { emailId } = await request.json();
    
    if (!emailId) {
      return NextResponse.json({ error: 'Email ID is required' }, { status: 400 });
    }

    // Get the email and its project
    const email = await prisma.email.findFirst({
      where: {
        id: emailId,
        project: {
          userId: session.user.id
        }
      },
      include: {
        project: true
      }
    });

    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }

    // Only generate response for out-of-scope emails
    if (email.inScope) {
      return NextResponse.json({ error: 'Response generation only available for out-of-scope emails' }, { status: 400 });
    }

    // Prepare the response generation prompt
    const prompt = `Generate a professional, friendly response to this out-of-scope request:
     "${email.body}"
     
     Keep it to 2-3 sentences. Be polite but firm. Reference the original scope.
     
     Project scope:
     - Deliverables: ${email.project.deliverables}
     - Out of scope: ${email.project.outOfScope}`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const generatedResponse = response.content[0].type === 'text' ? response.content[0].text : '';

    // Update the email with generated response
    const updatedEmail = await prisma.email.update({
      where: { id: emailId },
      data: {
        generatedResponse: generatedResponse.trim()
      }
    });

    return NextResponse.json({
      success: true,
      response: generatedResponse.trim(),
      email: updatedEmail
    });

  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
