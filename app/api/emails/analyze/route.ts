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

    // Prepare the scope analysis prompt
    const prompt = `Here's a project scope:
     {deliverables: "${email.project.deliverables}", revisions: "${email.project.revisions}", timeline: "${email.project.timeline}", outOfScope: "${email.project.outOfScope}"}
     
     Here's an incoming client email:
     {subject: "${email.subject}", body: "${email.body}"}
     
     Is this request in-scope or out-of-scope? Why?
     Return JSON: { inScope: boolean, confidence: 0-100, reason: string }`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const analysisText = response.content[0].type === 'text' ? response.content[0].text : '';
    
    // Parse the JSON response
    let analysis;
    try {
      // Extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (error) {
      console.error('Error parsing Claude response:', error);
      // Fallback analysis
      analysis = {
        inScope: false,
        confidence: 50,
        reason: 'Unable to analyze email content'
      };
    }

    // Update the email with analysis results
    const updatedEmail = await prisma.email.update({
      where: { id: emailId },
      data: {
        inScope: analysis.inScope,
        confidence: analysis.confidence,
        reason: analysis.reason
      }
    });

    return NextResponse.json({
      success: true,
      analysis,
      email: updatedEmail
    });

  } catch (error) {
    console.error('Error analyzing email:', error);
    return NextResponse.json(
      { error: 'Failed to analyze email' },
      { status: 500 }
    );
  }
}
