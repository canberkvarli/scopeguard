'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Mail, AlertTriangle, CheckCircle, Copy, RefreshCw } from 'lucide-react';

interface Email {
  id: string;
  messageId: string;
  subject: string;
  sender: string;
  recipient: string;
  body: string;
  receivedAt: string;
  inScope: boolean;
  confidence: number;
  reason?: string;
  generatedResponse?: string;
  project: {
    id: string;
    projectName: string;
    clientName: string;
  };
}

interface Project {
  id: string;
  projectName: string;
  clientName: string;
  emails: Email[];
}

export default function EmailsDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchEmails();
    }
  }, [status, router]);

  const fetchEmails = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const projectsData = await response.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectEmails = async (projectId: string) => {
    try {
      const response = await fetch('/api/emails/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId })
      });

      if (response.ok) {
        await fetchEmails(); // Refresh the data
      }
    } catch (error) {
      console.error('Error fetching project emails:', error);
    }
  };

  const analyzeEmail = async (emailId: string) => {
    setAnalyzing(emailId);
    try {
      const response = await fetch('/api/emails/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId })
      });

      if (response.ok) {
        await fetchEmails(); // Refresh the data
      }
    } catch (error) {
      console.error('Error analyzing email:', error);
    } finally {
      setAnalyzing(null);
    }
  };

  const generateResponse = async (emailId: string) => {
    setGenerating(emailId);
    try {
      const response = await fetch('/api/emails/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId })
      });

      if (response.ok) {
        await fetchEmails(); // Refresh the data
      }
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setGenerating(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const allEmails = projects.flatMap(project => 
    project.emails.map(email => ({ ...email, project }))
  );

  const inScopeCount = allEmails.filter(email => email.inScope).length;
  const outOfScopeCount = allEmails.filter(email => !email.inScope).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading emails...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Scope Monitor</h1>
          <p className="text-gray-600">Monitor client emails for scope compliance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Emails</p>
                <p className="text-2xl font-semibold text-gray-900">{allEmails.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Scope</p>
                <p className="text-2xl font-semibold text-gray-900">{inScopeCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Out of Scope</p>
                <p className="text-2xl font-semibold text-gray-900">{outOfScopeCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{project.projectName}</h2>
                  <p className="text-sm text-gray-600">Client: {project.clientName}</p>
                </div>
                <button
                  onClick={() => fetchProjectEmails(project.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 inline mr-2" />
                  Fetch Emails
                </button>
              </div>
            </div>

            {project.emails.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No emails found. Click &quot;Fetch Emails&quot; to load emails from Gmail.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {project.emails.map(email => (
                  <div key={email.id} className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-medium text-gray-900 mr-3">{email.subject}</h3>
                          {email.inScope ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              In Scope
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Out of Scope
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <p><strong>From:</strong> {email.sender}</p>
                          <p><strong>To:</strong> {email.recipient}</p>
                          <p><strong>Date:</strong> {new Date(email.receivedAt).toLocaleString()}</p>
                          {email.confidence && (
                            <p><strong>Confidence:</strong> {email.confidence}%</p>
                          )}
                        </div>

                        <div className="text-sm text-gray-700 mb-3">
                          <p className="line-clamp-3">{email.body}</p>
                        </div>

                        {email.reason && (
                          <div className="bg-gray-50 rounded-md p-3 mb-3">
                            <p className="text-sm text-gray-700"><strong>Analysis:</strong> {email.reason}</p>
                          </div>
                        )}

                        {email.generatedResponse && (
                          <div className="bg-blue-50 rounded-md p-3 mb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-blue-900 mb-1">Generated Response:</p>
                                <p className="text-sm text-blue-800">{email.generatedResponse}</p>
                              </div>
                              <button
                                onClick={() => copyToClipboard(email.generatedResponse!)}
                                className="ml-2 p-1 hover:bg-blue-100 rounded"
                                title="Copy to clipboard"
                              >
                                <Copy className="h-4 w-4 text-blue-600" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-col space-y-2">
                        {!email.inScope && !email.generatedResponse && (
                          <button
                            onClick={() => generateResponse(email.id)}
                            disabled={generating === email.id}
                            className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 disabled:opacity-50"
                          >
                            {generating === email.id ? 'Generating...' : 'Generate Response'}
                          </button>
                        )}
                        
                        <button
                          onClick={() => analyzeEmail(email.id)}
                          disabled={analyzing === email.id}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                          {analyzing === email.id ? 'Analyzing...' : 'Re-analyze'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
