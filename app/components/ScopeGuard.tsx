'use client';

import { useState } from 'react';
import { AlertTriangle, Shield, CheckCircle, DollarSign, Clock, TrendingUp, ArrowRight, Sparkles, BarChart3, Bell, Lock, Eye, Database, Chrome } from 'lucide-react';

// Type definitions
interface LandingPageProps {
  onNavigate: (page: string) => void;
}

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

// ============= LANDING PAGE =============
const LandingPage = ({ onNavigate }: LandingPageProps) => (
  <div className="min-h-screen bg-slate-950 relative overflow-hidden font-['Inter',sans-serif]">
    {/* Animated background gradients */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-60 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>

    {/* Header */}
    <nav className="relative bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Shield className="text-indigo-400" size={36} />
            <div className="absolute inset-0 blur-lg bg-indigo-400/30"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ScopeGuard
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="text-slate-300 hover:text-white font-medium transition-colors">
            Privacy
          </a>
          <button 
            onClick={() => onNavigate('pricing')}
            className="text-slate-300 hover:text-white font-medium transition-colors"
          >
            Pricing
          </button>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-full px-5 py-2 mb-8 group hover:border-indigo-500/40 transition-all">
          <Sparkles className="text-indigo-400 mr-2" size={18} />
          <span className="text-indigo-300 font-medium text-sm">AI-Powered Chrome Extension</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Stop Losing
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            $500/Month
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            to Scope Creep
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
          Chrome extension that uses AI to catch scope creep in your Gmail. 
          <span className="text-indigo-300"> Works right where you read emails. Private & secure.</span>
        </p>

        {/* CTA Button */}
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
          >
            <Chrome size={24} />
            Install Chrome Extension
            <ArrowRight size={20} />
          </a>
        </div>

        <p className="text-slate-500 mt-5 text-sm">Free forever • No credit card • Installs in 30 seconds</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-24">
        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300">
          <div className="relative inline-block mb-5">
            <DollarSign className="text-green-400 transition-transform duration-300 group-hover:scale-110" size={44} />
            <div className="absolute inset-0 blur-xl bg-green-400/30 group-hover:bg-green-400/50 transition-all"></div>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
            $500/mo
          </div>
          <p className="text-slate-400">Average lost to scope creep by freelancers</p>
        </div>
        
        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300">
          <div className="relative inline-block mb-5">
            <Clock className="text-blue-400 transition-transform duration-300 group-hover:scale-110" size={44} />
            <div className="absolute inset-0 blur-xl bg-blue-400/30 group-hover:bg-blue-400/50 transition-all"></div>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            10 hrs/wk
          </div>
          <p className="text-slate-400">Wasted on unpaid scope creep work</p>
        </div>
        
        <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300">
          <div className="relative inline-block mb-5">
            <TrendingUp className="text-purple-400 transition-transform duration-300 group-hover:scale-110" size={44} />
            <div className="absolute inset-0 blur-xl bg-purple-400/30 group-hover:bg-purple-400/50 transition-all"></div>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            57M
          </div>
          <p className="text-slate-400">US freelancers affected by this problem</p>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-32">
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-center text-slate-400 mb-16 text-lg">Three simple steps to protect your income</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center group-hover:border-indigo-500/50 transition-all duration-300">
              <div className="relative inline-block mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                  <Chrome className="text-white" size={36} />
                </div>
                <div className="absolute inset-0 blur-xl bg-indigo-500/30 group-hover:bg-indigo-500/50 transition-all"></div>
              </div>
              <div className="text-sm font-bold text-indigo-400 mb-3 tracking-wider">STEP 01</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Install Extension</h3>
              <p className="text-slate-400 leading-relaxed">One-click install from Chrome Web Store. Takes 30 seconds.</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center group-hover:border-purple-500/50 transition-all duration-300">
              <div className="relative inline-block mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                  <AlertTriangle className="text-white" size={36} />
                </div>
                <div className="absolute inset-0 blur-xl bg-purple-500/30 group-hover:bg-purple-500/50 transition-all"></div>
              </div>
              <div className="text-sm font-bold text-purple-400 mb-3 tracking-wider">STEP 02</div>
              <h3 className="text-2xl font-bold mb-3 text-white">AI Detects Creep</h3>
              <p className="text-slate-400 leading-relaxed">AI analyzes emails as you read them in Gmail</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-indigo-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center group-hover:border-pink-500/50 transition-all duration-300">
              <div className="relative inline-block mb-6">
                <div className="bg-gradient-to-br from-pink-500 to-indigo-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                  <CheckCircle className="text-white" size={36} />
                </div>
                <div className="absolute inset-0 blur-xl bg-pink-500/30 group-hover:bg-pink-500/50 transition-all"></div>
              </div>
              <div className="text-sm font-bold text-pink-400 mb-3 tracking-wider">STEP 03</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Get Paid More</h3>
              <p className="text-slate-400 leading-relaxed">Copy AI-generated responses to charge fairly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="mt-32" id="privacy">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2 mb-6">
            <Shield className="text-green-400 mr-2" size={18} />
            <span className="text-green-300 font-medium text-sm">Privacy First</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Your Privacy Matters
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We built ScopeGuard with privacy at its core. Your emails stay yours.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center hover:border-green-500/50 transition-all duration-300">
            <div className="relative inline-block mb-6">
              <Lock className="text-green-400 mx-auto" size={48} />
              <div className="absolute inset-0 blur-xl bg-green-400/20"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Read-Only Access</h3>
            <p className="text-slate-400 leading-relaxed">
              We never send, delete, or modify your emails. The extension only reads to analyze - nothing else.
            </p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center hover:border-green-500/50 transition-all duration-300">
            <div className="relative inline-block mb-6">
              <Database className="text-green-400 mx-auto" size={48} />
              <div className="absolute inset-0 blur-xl bg-green-400/20"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No Data Storage</h3>
            <p className="text-slate-400 leading-relaxed">
              Emails are analyzed in real-time using AI and immediately discarded. We don&apos;t store any email content.
            </p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center hover:border-green-500/50 transition-all duration-300">
            <div className="relative inline-block mb-6">
              <Eye className="text-green-400 mx-auto" size={48} />
              <div className="absolute inset-0 blur-xl bg-green-400/20"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">You Control Access</h3>
            <p className="text-slate-400 leading-relaxed">
              Revoke permissions anytime from your Google account. One click and we&apos;re gone.
            </p>
          </div>
        </div>

        {/* Additional Privacy Details */}
        <div className="mt-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 backdrop-blur-xl">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="text-green-400" size={20} />
            How We Handle Your Data
          </h4>
          <div className="grid md:grid-cols-2 gap-6 text-slate-300 text-sm">
            <div>
              <p className="mb-3">
                <strong className="text-white">✓ Processed Locally:</strong> AI analysis happens through secure API calls. Your email content is sent only to Claude AI for analysis.
              </p>
              <p className="mb-3">
                <strong className="text-white">✓ No Tracking:</strong> We don&apos;t track which emails you receive or who you communicate with.
              </p>
            </div>
            <div>
              <p className="mb-3">
                <strong className="text-white">✓ Open Source Ready:</strong> Our extension code will be open-sourced so you can verify our privacy claims.
              </p>
              <p className="mb-3">
                <strong className="text-white">✓ GDPR Compliant:</strong> We follow European privacy standards even if you&apos;re not in Europe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features showcase */}
      <div className="mt-32 grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300">
          <BarChart3 className="text-indigo-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-3">Real-time Analysis</h3>
          <p className="text-slate-400">AI powered by Claude Sonnet 4 analyzes emails as you read them, catching scope creep instantly.</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300">
          <Bell className="text-purple-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-3">Smart Responses</h3>
          <p className="text-slate-400">Get AI-generated professional responses that help you charge for additional work politely.</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-32 text-center">
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Ready to Stop Losing Money?
          </h3>
          <p className="text-slate-400 mb-8 text-lg">Join freelancers protecting their income with AI</p>
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
          >
            <Chrome size={24} />
            Install Free Extension
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ============= PRICING PAGE =============
const PricingPage = ({ onNavigate }: PricingPageProps) => (
  <div className="min-h-screen bg-slate-950 font-['Inter',sans-serif]">
    <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate('landing')}
        >
          <Shield className="text-indigo-400" size={32} />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">ScopeGuard</span>
        </div>
      </div>
    </nav>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Simple, Honest Pricing</h1>
        <p className="text-xl text-slate-400">Start free. Upgrade when you see value.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
          <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">$0</span>
            <span className="text-slate-400">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-slate-300">10 emails analyzed per day</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-slate-300">AI scope creep detection</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-slate-300">Suggested responses</span>
            </li>
          </ul>
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors text-center block"
          >
            Install Extension
          </a>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-indigo-500/50 rounded-2xl p-8 relative hover:border-indigo-500/70 transition-all">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-2xl text-sm font-bold">
            MOST POPULAR
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">$19</span>
            <span className="text-slate-300">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <CheckCircle className="text-indigo-300 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-white font-medium">Unlimited email analysis</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-indigo-300 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-white font-medium">Real-time alerts</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-indigo-300 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-white font-medium">Custom response templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-indigo-300 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-white font-medium">Analytics dashboard</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-indigo-300 mr-3 mt-1 flex-shrink-0" size={20} />
              <span className="text-white font-medium">Priority support</span>
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Coming Soon
          </button>
          <p className="text-center text-slate-400 text-sm mt-4">
            Saves avg $500/month • Cancel anytime
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-400">
          Questions? Email us at <span className="text-indigo-400">hello@scopeguard.app</span>
        </p>
      </div>
    </div>
  </div>
);

// ============= MAIN APP =============
const ScopeGuard = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div>
      {currentPage === 'landing' && (
        <LandingPage 
          onNavigate={setCurrentPage}
        />
      )}
      {currentPage === 'pricing' && (
        <PricingPage 
          onNavigate={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ScopeGuard;