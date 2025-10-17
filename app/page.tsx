"use client"

import React, { useEffect, useState } from "react"

const Icons = {
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 1L3 5v7c0 6 9 10 9 10s9-4 9-10V5l-9-4z"/>
    </svg>
  ),
  Arrow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20 6L9 17l-5-5"/>
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
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a8 8 0 0 0-8 8c0 2.5 1 4.8 2.5 6.5M12 2a8 8 0 0 1 8 8c0 2.5-1 4.8-2.5 6.5M9 18c-1.5 1.5-3 2.5-4.5 3M15 18c1.5 1.5 3 2.5 4.5 3M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    </svg>
  ),
}

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setFadeIn(true)
  }, [])

  return (
    <main className="min-h-screen bg-white font-['Inter',sans-serif]">
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
            <a href="/auth/signin" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Sign In</a>
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
            <p className="text-xl text-slate-600">We built ScopeGuard with privacy at its core. Here&apos;s how.</p>
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
              <a href="/auth/signin" className="w-full py-3 px-4 border border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-center inline-block">
                Get Started
              </a>
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
              <a href="/auth/signin" className="w-full py-3 px-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors text-center inline-block">
                Start Free Trial
              </a>
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
              <a href="/auth/signin" className="w-full py-3 px-4 border border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-center inline-block">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to protect your income?</h2>
          <p className="text-xl text-slate-300 mb-8">Join freelancers protecting their boundaries with AI.</p>
          <a href="/auth/signin" className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-all inline-flex items-center gap-2 group hover:shadow-lg">
            Get Started Free
            <Icons.Arrow className="group-hover:translate-x-1 transition-transform" />
          </a>
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
                <li><a href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</a></li>
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
    </main>
  )
}