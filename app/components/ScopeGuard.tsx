'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

// Type definitions
interface Project {
  id: number;
  projectName: string;
  clientName: string;
  deliverables: string;
  revisions: string;
  timeline: string;
  outOfScope: string;
  createdAt: Date;
}

interface ProjectData {
  projectName: string;
  clientName: string;
  deliverables: string;
  revisions: string;
  timeline: string;
  outOfScope: string;
}

// Simple elegant SVG icons
const Icons = {
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 1L3 5v7c0 6 9 10 9 10s9-4 9-10V5l-9-4z"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 8l3-3m0 0l-3-3m3 3v12"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  Alert: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 20h20L12 2zm0 7v4m0 4v.01"/>
    </svg>
  ),
  Lock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-8-4V6a2 2 0 0 1 4 0v1"/>
    </svg>
  ),
  Database: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
    </svg>
  ),
  Eye: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Back: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  ),
};

export default function ScopeGuard() {
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState('landing');
  const [projects, setProjects] = useState<Project[]>([]);

  // Set initial page based on authentication status
  React.useEffect(() => {
    if (status === 'authenticated') {
      setCurrentPage('dashboard');
    } else if (status === 'unauthenticated') {
      setCurrentPage('landing');
    }
  }, [status]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleCreateProject = (projectData: ProjectData) => {
    setProjects([...projects, { id: Date.now(), ...projectData, createdAt: new Date() }]);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        {currentPage === 'landing' && (
          <LandingPage />
        )}
      </div>
    );
  }

  return (
    <div>
      {currentPage === 'dashboard' && (
        <DashboardPage projects={projects} onNavigate={handleNavigate} onLogout={handleLogout} userEmail={session?.user?.email || ''} />
      )}
      {currentPage === 'create-project' && (
        <CreateProjectPage onNavigate={handleNavigate} onCreate={handleCreateProject} />
      )}
      {currentPage.startsWith('project-') && (
        <ProjectDetailPage projectId={parseInt(currentPage.split('-')[1])} projects={projects} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

// ============= LANDING PAGE =============
function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Icons.Shield />
            </div>
            <span className="text-2xl font-semibold text-slate-900">ScopeGuard</span>
          </div>
          <a
            href="/auth/signin"
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Sign In
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-semibold text-slate-900 mb-6 leading-tight">
            Stop losing money to scope creep
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Define your project scope once. Let AI protect your boundaries as client requests come in.
          </p>
          <a
            href="/auth/signin"
            className="bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 inline-block"
          >
            Get Started Free
            <Icons.Arrow />
          </a>
          <p className="text-slate-500 mt-4 text-sm">No credit card required • Free forever tier</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-12 mt-24 py-12 border-t border-b border-slate-200">
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-2">$500</div>
            <p className="text-slate-600">Average lost monthly to scope creep</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-2">57M</div>
            <p className="text-slate-600">Freelancers affected globally</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-2">10 hrs</div>
            <p className="text-slate-600">Wasted weekly on unpaid work</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-4xl font-semibold text-slate-900 mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6">
                <span className="text-lg font-semibold text-slate-900">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Define scope</h3>
              <p className="text-slate-600">Write what&apos;s included in your project. Be specific about deliverables, revisions, and timelines.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6">
                <span className="text-lg font-semibold text-slate-900">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Share with client</h3>
              <p className="text-slate-600">Get them to acknowledge they&apos;ve read and agreed to the scope before work starts.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6">
                <span className="text-lg font-semibold text-slate-900">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Get protected</h3>
              <p className="text-slate-600">AI monitors incoming requests. When something&apos;s out of scope, get a polite response template ready.</p>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="mt-24 bg-slate-50 p-12 rounded-lg border border-slate-200">
          <h3 className="text-2xl font-semibold text-slate-900 mb-8">Your privacy matters</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-6 h-6 text-slate-900 flex-shrink-0 mt-1">
                <Icons.Lock />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Read-only access</h4>
                <p className="text-slate-600 text-sm">We never modify your messages. Only analyze what you share.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 text-slate-900 flex-shrink-0 mt-1">
                <Icons.Database />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">No data storage</h4>
                <p className="text-slate-600 text-sm">Messages analyzed in real-time. Never stored on our servers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 text-slate-900 flex-shrink-0 mt-1">
                <Icons.Eye />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">You control access</h4>
                <p className="text-slate-600 text-sm">Revoke permissions anytime. One click and we&apos;re gone.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============= DASHBOARD PAGE =============
function DashboardPage({ projects, onNavigate, onLogout, userEmail }: { projects: Project[]; onNavigate: (page: string) => void; onLogout: () => void; userEmail: string }) {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Icons.Shield />
            </div>
            <span className="text-xl font-semibold text-slate-900">ScopeGuard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-sm">{userEmail}</span>
            <button
              onClick={onLogout}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2"
            >
              <Icons.LogOut />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 mb-2">Your projects</h1>
            <p className="text-slate-600">Manage your design projects and protect your scope</p>
          </div>
          <button
            onClick={() => onNavigate('create-project')}
            className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Icons.Plus />
            New project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-lg border border-slate-200">
            <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-600">
              <Icons.Shield />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No projects yet</h3>
            <p className="text-slate-600 mb-6">Create your first project to start protecting your scope</p>
            <button
              onClick={() => onNavigate('create-project')}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              <Icons.Plus />
              Create project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project: Project) => (
              <div
                key={project.id}
                onClick={() => onNavigate(`project-${project.id}`)}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">{project.projectName}</h3>
                  <span className="bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full">Active</span>
                </div>
                <p className="text-slate-600 text-sm mb-4">Client: {project.clientName}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">View project</span>
                  <Icons.Arrow />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============= CREATE PROJECT PAGE =============
function CreateProjectPage({ onNavigate, onCreate }: { onNavigate: (page: string) => void; onCreate: (projectData: ProjectData) => void }) {
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    deliverables: '',
    revisions: '',
    timeline: '',
    outOfScope: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.projectName && formData.clientName && formData.deliverables && formData.revisions && formData.timeline && formData.outOfScope) {
      onCreate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2"
          >
            <Icons.Back />
            Back to projects
          </button>
        </div>
      </nav>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-slate-900 mb-2">Create new project</h1>
          <p className="text-slate-600">Define your scope clearly to protect yourself from creep</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Project name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="E.g., Brand Redesign for TechCorp"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Client name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="E.g., John at TechCorp"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Deliverables (what&apos;s included)</label>
            <textarea
              name="deliverables"
              value={formData.deliverables}
              onChange={handleChange}
              placeholder="List everything you&apos;ll deliver. E.g., 3 design concepts, 2 rounds of revisions, final files in Figma"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Revisions included</label>
            <input
              type="text"
              name="revisions"
              value={formData.revisions}
              onChange={handleChange}
              placeholder="E.g., 2 rounds of unlimited revisions"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Timeline</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="E.g., 2 weeks from start to delivery"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">What&apos;s NOT included (out of scope)</label>
            <textarea
              name="outOfScope"
              value={formData.outOfScope}
              onChange={handleChange}
              placeholder="Be specific about what you won&apos;t do. E.g., animations, custom coding, video production"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 h-24"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Create project
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= PROJECT DETAIL PAGE =============
function ProjectDetailPage({ projectId, projects, onNavigate }: { projectId: number; projects: Project[]; onNavigate: (page: string) => void }) {
  const project = projects.find((p: Project) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white font-['Inter',sans-serif]">
        <nav className="border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2"
            >
              <Icons.Back />
              Back to projects
            </button>
          </div>
        </nav>
        <div className="text-center py-24">
          <p className="text-slate-600">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2"
          >
            <Icons.Back />
            Back to projects
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-slate-900 mb-2">{project.projectName}</h1>
          <p className="text-slate-600">Client: {project.clientName}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-5 h-5 text-slate-900">
                <Icons.Check />
              </div>
              What&apos;s included
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Deliverables</p>
                <p className="text-slate-600 mt-1">{project.deliverables}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Revisions</p>
                <p className="text-slate-600 mt-1">{project.revisions}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Timeline</p>
                <p className="text-slate-600 mt-1">{project.timeline}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-5 h-5 text-slate-900">
                <Icons.Alert />
              </div>
              What&apos;s NOT included
            </h3>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <p className="text-slate-600">{project.outOfScope}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Next steps</h3>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-900 mb-2">Share with your client</p>
              <p className="text-slate-600 text-sm mb-4">Get them to review and acknowledge this scope before starting work.</p>
              <button className="text-slate-900 font-medium text-sm hover:underline">Copy scope link →</button>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-900 mb-2">Monitor email & Slack</p>
              <p className="text-slate-600 text-sm mb-4">Connect your email or Slack to get alerts when scope creep appears.</p>
              <button className="text-slate-900 font-medium text-sm hover:underline">Coming soon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}