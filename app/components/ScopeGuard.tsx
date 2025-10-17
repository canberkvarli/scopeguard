import React, { useState, useEffect } from 'react';

// ============= AUTH PAGE =============
interface AuthPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string) => void;
}

function AuthPage({ onNavigate, onLogin }: AuthPageProps) {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (email) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-['Inter',sans-serif] px-4">
      <div className="max-w-md w-full">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Icons.Shield />
            </div>
            <span className="text-2xl font-semibold text-slate-900">ScopeGuard</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Welcome</h1>
          <p className="text-slate-600">Sign in to protect your project scope</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <button
            onClick={handleContinue}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Continue
          </button>
        </div>

        <p className="text-center text-slate-600 mt-6 text-sm">
          In production: OAuth with GitHub & Google
        </p>

        <button
          onClick={() => onNavigate('landing')}
          className="w-full mt-6 text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Icons.Back />
          Back to home
        </button>
      </div>
    </div>
  );
}

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

const Icons = {
  Shield: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 1L3 5v7c0 6 9 10 9 10s9-4 9-10V5l-9-4z"/>
    </svg>
  ),
  Arrow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  LogOut: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 8l3-3m0 0l-3-3m3 3v12"/>
    </svg>
  ),
  Check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  Alert: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 2L2 20h20L12 2zm0 7v4m0 4v.01"/>
    </svg>
  ),
  Lock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-8-4V6a2 2 0 0 1 4 0v1"/>
    </svg>
  ),
  Database: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
    </svg>
  ),
  Eye: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Back: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  ),
  Zap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  Brain: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 2a8 8 0 0 0-8 8c0 2.5 1 4.8 2.5 6.5M12 2a8 8 0 0 1 8 8c0 2.5-1 4.8-2.5 6.5M9 18c-1.5 1.5-3 2.5-4.5 3M15 18c1.5 1.5 3 2.5 4.5 3M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    </svg>
  ),
  Slack: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M8 12a4 4 0 0 0 4 4h4M8 12a4 4 0 1 1 8 0v4"/>
    </svg>
  ),
};

export default function ScopeGuard() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentPage('landing');
    setProjects([]);
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleCreateProject = (projectData: ProjectData) => {
    setProjects([...projects, { id: Date.now(), ...projectData, createdAt: new Date() }]);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return (
      <div>
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} onLogin={handleLogin} />}
        {currentPage === 'auth' && <AuthPage onNavigate={setCurrentPage} onLogin={handleLogin} />}
      </div>
    );
  }

  return (
    <div>
      {currentPage === 'dashboard' && (
        <DashboardPage projects={projects} onNavigate={handleNavigate} onLogout={handleLogout} userEmail={userEmail} />
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
interface LandingPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string) => void;
}

function LandingPage({ onNavigate, onLogin }: LandingPageProps) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Icons.Shield />
            </div>
            <span className="text-xl font-semibold text-slate-900">ScopeGuard</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
            <button onClick={() => onNavigate('auth')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className={`max-w-7xl mx-auto px-6 py-32 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl mb-24">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full">
            <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <Icons.Zap /> AI-powered scope protection
            </span>
          </div>
          <h1 className="text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Stop losing money to scope creep
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
            Define your project scope once. AI monitors your emails and Slack, flags scope creep, and generates professional responses. You stay paid.
          </p>
          <a
            href="#pricing"
            className="bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-all inline-flex items-center gap-2 group hover:shadow-lg"
          >
            Get Started Free
            <Icons.Arrow className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-slate-500 mt-4 text-sm">No credit card required • Free forever tier • Built by Canberk</p>
        </div>

        {/* Stats with animation */}
        <div className="grid md:grid-cols-3 gap-8 py-16 border-t border-b border-slate-200">
          {[
            { value: '$500', label: 'Average lost monthly to scope creep' },
            { value: '57M', label: 'Freelancers affected globally' },
            { value: '10 hrs', label: 'Wasted weekly on unpaid work' }
          ].map((stat, i) => (
            <div key={i} className="group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">{stat.value}</div>
              <p className="text-slate-600 group-hover:text-slate-700 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works - Modern */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-xl text-slate-600">Three simple steps to protect your income</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />

            {[
              {
                step: '1',
                title: 'Define Scope',
                desc: 'Write exactly what\'s included in your project. Deliverables, revisions, timeline—be specific.',
                icon: Icons.Brain
              },
              {
                step: '2',
                title: 'Share & Confirm',
                desc: 'Send scope to your client. They acknowledge they understand and agree before work starts.',
                icon: Icons.Check
              },
              {
                step: '3',
                title: 'AI Protection',
                desc: 'Our AI monitors emails and Slack. When scope creep appears, you get a professional response ready to send.',
                icon: Icons.Zap
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-900 hover:shadow-lg transition-all duration-300 h-full group">
                  <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6 font-semibold group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Section - Modern */}
      <div className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Your privacy is sacred</h2>
            <p className="text-xl text-slate-600">We built ScopeGuard with privacy at its core. Here's how.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Icons.Lock,
                title: 'Read-Only Access',
                desc: 'We never send, delete, or modify your emails. Analysis only. Your data is yours.'
              },
              {
                icon: Icons.Database,
                title: 'No Data Hoarding',
                desc: 'Emails analyzed in real-time and discarded. We don\'t store your message content.'
              },
              {
                icon: Icons.Eye,
                title: 'You Stay in Control',
                desc: 'Revoke email/Slack access anytime from your account. One click and we\'re gone.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-white hover:border-slate-900 hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 text-slate-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gradient-to-b from-white to-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Simple pricing</h2>
            <p className="text-xl text-slate-600">Start free. Upgrade when you see value.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-900 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">$0</span>
                <span className="text-slate-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Unlimited project creation', 'Scope definition & storage', 'Client sharing link', 'Manual scope checking'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icons.Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('auth')} className="w-full py-3 px-4 border border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 border-2 border-slate-900 hover:shadow-2xl transition-all duration-300 relative -mt-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold">$39</span>
                <span className="text-slate-300">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Everything in Free', 'Gmail integration & AI detection', 'Slack integration', 'AI-generated responses', 'Analytics dashboard', 'Priority support'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icons.Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('auth')} className="w-full py-3 px-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Business */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-900 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Business</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">$99</span>
                <span className="text-slate-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Everything in Pro', 'Team members (up to 5)', 'Custom AI prompts', 'Zapier/Make integration', 'Advanced analytics', 'Dedicated support'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icons.Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('auth')} className="w-full py-3 px-4 border border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to protect your income?</h2>
          <p className="text-xl text-slate-300 mb-8">Join freelancers protecting their boundaries with AI.</p>
          <button onClick={() => onNavigate('auth')} className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all inline-flex items-center gap-2 group hover:shadow-lg">
            Get Started Free
            <Icons.Arrow className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Icons.Shield />
                </div>
                <span className="font-semibold text-slate-900">ScopeGuard</span>
              </div>
              <p className="text-slate-600 text-sm">Protecting freelancers through systematic scope management and AI.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a></li>
                <li><a href="/auth/signin" className="text-slate-600 hover:text-slate-900 transition-colors">Sign In</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Built by</h4>
              <p className="text-slate-600 text-sm">Made by Canberk to solve a real problem: protecting freelancer income.</p>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex justify-between items-center text-sm text-slate-600">
            <p>&copy; 2024 ScopeGuard. All rights reserved.</p>
            <p>Built with AI to protect your boundaries.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============= DASHBOARD PAGE =============
function DashboardPage({ projects, onNavigate, onLogout, userEmail }: { projects: Project[]; onNavigate: (page: string) => void; onLogout: () => void; userEmail: string }) {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
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
            <button onClick={onLogout} className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2">
              <Icons.LogOut />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Your projects</h1>
            <p className="text-slate-600">Manage your projects and protect your scope</p>
          </div>
          <button onClick={() => onNavigate('create-project')} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
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
            <button onClick={() => onNavigate('create-project')} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2">
              <Icons.Plus />
              Create project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} onClick={() => onNavigate(`project-${project.id}`)} className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 hover:shadow-md transition-all cursor-pointer">
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
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button onClick={() => onNavigate('dashboard')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2">
            <Icons.Back />
            Back to projects
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Create new project</h1>
          <p className="text-slate-600">Define your scope clearly to protect yourself from creep</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Project name</label>
            <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="E.g., Brand Redesign for TechCorp" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Client name</label>
            <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="E.g., John at TechCorp" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Deliverables (what's included)</label>
            <textarea name="deliverables" value={formData.deliverables} onChange={handleChange} placeholder="List everything you'll deliver. E.g., 3 design concepts, 2 rounds of revisions, final files in Figma" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 h-24" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Revisions included</label>
            <input type="text" name="revisions" value={formData.revisions} onChange={handleChange} placeholder="E.g., 2 rounds of unlimited revisions" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Timeline</label>
            <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="E.g., 2 weeks from start to delivery" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">What's NOT included (out of scope)</label>
            <textarea name="outOfScope" value={formData.outOfScope} onChange={handleChange} placeholder="Be specific about what you won't do. E.g., animations, custom coding, video production" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 h-24" />
          </div>

          <div className="flex gap-4 pt-6">
            <button onClick={handleSubmit} className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
              Create project
            </button>
            <button onClick={() => onNavigate('dashboard')} className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
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
            <button onClick={() => onNavigate('dashboard')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2">
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
          <button onClick={() => onNavigate('dashboard')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-2">
            <Icons.Back />
            Back to projects
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{project.projectName}</h1>
          <p className="text-slate-600">Client: {project.clientName}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-5 h-5 text-slate-900">
                <Icons.Check />
              </div>
              What's included
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
              What's NOT included
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