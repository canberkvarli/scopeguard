'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Mail, Shield, CheckCircle, DollarSign, Clock, ArrowRight } from 'lucide-react';

interface EmailDetection {
  id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
  isCreep?: boolean;
  confidence?: string;
  reason?: string;
  suggestedResponse?: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);
  const [detections, setDetections] = useState<EmailDetection[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (status === 'authenticated') {
      loadAndAnalyzeEmails();
    }
  }, [status, router]);

  const analyzeEmail = async (email: EmailDetection) => {
    const prompt = `You are a scope creep detector for freelancers. Analyze this email and determine if the client is requesting work outside the original project scope.

Email from: ${email.from}
Subject: ${email.subject}
Body: "${email.body}"

Respond ONLY with a JSON object (no markdown, no backticks):
{
  "isScopeCreep": true/false,
  "confidence": "high/medium/low",
  "reason": "brief explanation",
  "suggestedResponse": "professional response template"
}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      let analysisText = data.content[0].text;
      
      analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const analysis = JSON.parse(analysisText);
      
      return {
        ...email,
        isCreep: analysis.isScopeCreep,
        confidence: analysis.confidence,
        reason: analysis.reason,
        suggestedResponse: analysis.suggestedResponse
      };
    } catch (error) {
      console.error("AI Analysis error:", error);
      return {
        ...email,
        isCreep: false,
        confidence: "low",
        reason: "Analysis failed",
        suggestedResponse: ""
      };
    }
  };

  const loadAndAnalyzeEmails = async () => {
    setAnalyzing(true);
    
    try {
      const response = await fetch('/api/gmail');
      const data = await response.json();
      
      if (data.messages) {
        const analyzed = [];
        for (const email of data.messages.slice(0, 5)) {
          const result = await analyzeEmail(email);
          analyzed.push(result);
          setDetections([...analyzed]);
        }
      }
    } catch (error) {
      console.error('Error loading emails:', error);
    }
    
    setAnalyzing(false);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-['Inter',sans-serif]">
      {/* Header */}
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
            <Shield className="text-indigo-400" size={28} />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">ScopeGuard</span>
          </div>
          <div className="flex items-center space-x-4">
            {session?.user?.email && (
              <span className="text-sm text-slate-400">{session.user.email}</span>
            )}
            <span className="flex items-center text-sm text-green-400">
              <CheckCircle className="mr-2" size={16} />Connected
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Email Analysis Dashboard</h1>
          <p className="text-slate-400">AI is analyzing your emails for scope creep with Claude Sonnet 4</p>
        </div>

        {analyzing && (
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-lg p-8 text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-slate-400">Analyzing your emails with AI...</p>
          </div>
        )}

        {/* Stats */}
        {!analyzing && detections.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Total Analyzed</span>
                <Mail className="text-slate-500" size={20} />
              </div>
              <div className="text-3xl font-bold text-white">{detections.length}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Scope Creep Detected</span>
                <AlertTriangle className="text-red-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-red-400">
                {detections.filter(d => d.isCreep).length}
              </div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Money Saved</span>
                <DollarSign className="text-green-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-green-400">
                ${detections.filter(d => d.isCreep).length * 250}
              </div>
            </div>
          </div>
        )}

        {/* Email List */}
        <div className="space-y-4">
          {detections.map(email => (
            <div 
              key={email.id} 
              className={`bg-slate-900/50 backdrop-blur-xl border rounded-lg p-6 border-l-4 ${
                email.isCreep ? 'border-l-red-500 border-slate-800' : 'border-l-green-500 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {email.isCreep ? (
                      <AlertTriangle className="text-red-400 mr-2" size={20} />
                    ) : (
                      <CheckCircle className="text-green-400 mr-2" size={20} />
                    )}
                    <span className={`font-semibold ${email.isCreep ? 'text-red-400' : 'text-green-400'}`}>
                      {email.isCreep ? '⚠️ SCOPE CREEP DETECTED' : '✓ No Issues'}
                    </span>
                    <span className="ml-2 text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                      {email.confidence} confidence
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{email.subject}</h3>
                  <p className="text-sm text-slate-400 mb-1">From: {email.from}</p>
                  <p className="text-slate-300 mt-3 text-sm">{email.body}</p>
                </div>
              </div>

              {email.isCreep && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-red-300 mb-2">⚠️ Why this is scope creep:</p>
                    <p className="text-sm text-red-200">{email.reason}</p>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-300 mb-2">💡 Suggested Response:</p>
                    <p className="text-sm text-blue-200 italic">{email.suggestedResponse}</p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(email.suggestedResponse || '')}
                      className="mt-3 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Copy Response →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upgrade CTA */}
        {detections.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-6 text-center backdrop-blur-xl">
            <p className="text-white font-medium mb-2">
              🎉 You&apos;ve analyzed {detections.length} emails
            </p>
            <p className="text-slate-400 mb-4">
              Upgrade to Pro for unlimited analysis and real-time monitoring
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Upgrade to Pro - $19/month
            </button>
          </div>
        )}
      </div>
    </div>
  );
}