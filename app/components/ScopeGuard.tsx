'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, Mail, Shield, CheckCircle, DollarSign, Clock, TrendingUp, ArrowRight, Sparkles, BarChart3, Bell } from 'lucide-react';

// Type definitions
interface EmailDetection {
  id: number;
  from: string;
  subject: string;
  body: string;
  date: string;
  isCreep?: boolean;
  confidence?: string;
  reason?: string;
  suggestedResponse?: string;
}

interface LandingPageProps {
  onConnect: () => void;
  onNavigate: (page: string) => void;
  isLoading?: boolean;
}

interface DashboardProps {
  isConnected: boolean;
  analyzing: boolean;
  detections: EmailDetection[];
  onNavigate: (page: string) => void;
  userEmail: string;
}

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onConnect: () => void;
  isLoading?: boolean;
}

// ============= LANDING PAGE =============
const LandingPage = ({ onConnect, onNavigate, isLoading }: LandingPageProps) => (
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
        <button 
          onClick={() => onNavigate('pricing')}
          className="text-slate-300 hover:text-white font-medium transition-colors"
        >
          Pricing
        </button>
      </div>
    </nav>

    {/* Hero */}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-full px-5 py-2 mb-8 group hover:border-indigo-500/40 transition-all">
          <Sparkles className="text-indigo-400 mr-2" size={18} />
          <span className="text-indigo-300 font-medium text-sm">AI-Powered Scope Creep Detection</span>
        </div>
        
        {/* Main heading with gradient */}
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
          AI monitors your emails and Slack. Catches when clients sneak in extra work. 
          <span className="text-indigo-300"> Get paid for every hour you work.</span>
        </p>

        {/* CTA Button */}
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <button
            onClick={onConnect}
            disabled={isLoading}
            className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Connecting...
              </>
            ) : (
              <>
                Connect Your Gmail
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        <p className="text-slate-500 mt-5 text-sm">No credit card • Free forever • 2-minute setup</p>
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
                  <Mail className="text-white" size={36} />
                </div>
                <div className="absolute inset-0 blur-xl bg-indigo-500/30 group-hover:bg-indigo-500/50 transition-all"></div>
              </div>
              <div className="text-sm font-bold text-indigo-400 mb-3 tracking-wider">STEP 01</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Connect Email</h3>
              <p className="text-slate-400 leading-relaxed">Connect Gmail in 60 seconds with secure OAuth</p>
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
              <p className="text-slate-400 leading-relaxed">Advanced AI flags requests outside your scope</p>
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
              <p className="text-slate-400 leading-relaxed">Use AI-generated responses to charge fairly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features showcase */}
      <div className="mt-32 grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
          <BarChart3 className="text-indigo-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-3">Real-time Monitoring</h3>
          <p className="text-slate-400">AI analyzes every email and Slack message as they arrive, catching scope creep before it costs you money.</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
          <Bell className="text-purple-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-3">Instant Alerts</h3>
          <p className="text-slate-400">Get notified immediately when AI detects scope creep with suggested professional responses.</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-32 text-center">
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Ready to Stop Losing Money?
          </h3>
          <p className="text-slate-400 mb-8 text-lg">Join freelancers who are protecting their income with AI</p>
          <button
            onClick={onConnect}
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Connecting...
              </>
            ) : (
              <>
                Start Free Now
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ============= DASHBOARD =============
const Dashboard = ({ isConnected, analyzing, detections, onNavigate, userEmail }: DashboardProps) => (
  <div className="min-h-screen bg-slate-950 font-['Inter',sans-serif]">
    {/* Header */}
    <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="text-indigo-400" size={28} />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">ScopeGuard</span>
        </div>
        <div className="flex items-center space-x-4">
          {userEmail && (
            <span className="text-sm text-slate-400">{userEmail}</span>
          )}
          {isConnected && (
            <span className="flex items-center text-sm text-green-400">
              <CheckCircle className="mr-2" size={16} />Connected
            </span>
          )}
          <button 
            onClick={() => onNavigate('pricing')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </nav>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Email Analysis</h1>
        <p className="text-slate-400">AI is monitoring your conversations for scope creep</p>
      </div>

      {analyzing && (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-lg p-8 text-center mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Analyzing your emails with AI...</p>
        </div>
      )}

      {/* Detection Summary */}
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
              {detections.filter((d: EmailDetection) => d.isCreep).length}
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Money Saved</span>
              <DollarSign className="text-green-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-green-400">
               ${detections.filter((d: EmailDetection) => d.isCreep).length * 250}
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
                    {email.isCreep ? 'SCOPE CREEP DETECTED' : 'No Issues'}
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
                  <button className="mt-3 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Copy Response →
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Free tier limitation */}
      {detections.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-6 text-center backdrop-blur-xl">
          <p className="text-white font-medium mb-2">
             🎉 You&apos;ve used your free analysis limit
          </p>
          <p className="text-slate-400 mb-4">
            Upgrade to Pro for unlimited email analysis and real-time alerts
          </p>
          <button 
            onClick={() => onNavigate('pricing')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Upgrade to Pro - $19/month
          </button>
        </div>
      )}
    </div>
  </div>
);

// ============= PRICING PAGE =============
const PricingPage = ({ onNavigate, onConnect, isLoading }: PricingPageProps) => (
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
              <span className="text-slate-300">5 emails analyzed per month</span>
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
          <button 
            onClick={onConnect}
            disabled={isLoading}
            className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto mb-2"></div>
                Connecting...
              </>
            ) : (
              'Get Started Free'
            )}
          </button>
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
              <span className="text-white font-medium">Slack integration</span>
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
              <span className="text-white font-medium">Priority support</span>
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Upgrade to Pro
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
  const [isConnected, setIsConnected] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [detections, setDetections] = useState<EmailDetection[]>([]);
  const [userEmail, setUserEmail] = useState('');


  const analyzeEmail = async (email: EmailDetection) => {
    const prompt = `You are a scope creep detector for freelancers. Analyze this email and determine if the client is requesting work outside the original project scope.

Email: "${email.body}"

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
      
      // Clean up response
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
      console.error("Analysis error:", error);
      return {
        ...email,
        isCreep: false,
        confidence: "low",
        reason: "Analysis failed",
        suggestedResponse: ""
      };
    }
  };

  const handleConnectEmail = async () => {
    // Show loading state
    setIsConnected(false);
    setAnalyzing(true);
    
    // Trigger Google OAuth using NextAuth v5
    window.location.href = '/api/auth/signin';
  };
  
  // Add this useEffect to handle OAuth callback
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/gmail');
      if (response.ok) {
        const data = await response.json();
        setIsConnected(true);
        setUserEmail(data.messages[0]?.from || 'Connected');
        setCurrentPage('dashboard');
        setAnalyzing(true);
  
        // Analyze real emails with AI
        const analyzed = [];
        for (const email of data.messages.slice(0, 3)) {
          const result = await analyzeEmail(email);
          analyzed.push(result);
          setDetections([...analyzed]);
        }
        
        setAnalyzing(false);
      }
    };
  
    checkAuth();
  }, []);

  return (
    <div>
      {currentPage === 'landing' && (
        <LandingPage 
          onConnect={handleConnectEmail}
          onNavigate={setCurrentPage}
          isLoading={analyzing}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard 
          isConnected={isConnected}
          analyzing={analyzing}
          detections={detections}
          onNavigate={setCurrentPage}
          userEmail={userEmail}
        />
      )}
      {currentPage === 'pricing' && (
        <PricingPage 
          onNavigate={setCurrentPage}
          onConnect={handleConnectEmail}
          isLoading={analyzing}
        />
      )}
    </div>
  );
};

export default ScopeGuard;