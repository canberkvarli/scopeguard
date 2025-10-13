export default function PrivacyPage() {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-['Inter',sans-serif] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-slate-400 mb-8">Last updated: October 12, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-slate-300 mb-4">
              ScopeGuard (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we handle your data when you use our Chrome extension.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Data We Access</h2>
            <p className="text-slate-300 mb-4">
              ScopeGuard requires read-only access to your Gmail to analyze emails for scope creep detection. 
              Specifically, we access:
            </p>
            <ul className="list-disc ml-6 text-slate-300 space-y-2">
              <li>Email subject lines</li>
              <li>Email sender information</li>
              <li>Email body content (for AI analysis only)</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Data</h2>
            <p className="text-slate-300 mb-4">
              Email content is sent to Anthropic&apos;s Claude AI API for real-time analysis only. 
              We do not:
            </p>
            <ul className="list-disc ml-6 text-slate-300 space-y-2">
              <li>Store your email content on our servers</li>
              <li>Share your emails with third parties (except Claude AI for analysis)</li>
              <li>Use your emails for marketing or training purposes</li>
              <li>Track who you communicate with</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Data Storage</h2>
            <p className="text-slate-300 mb-4">
              The extension stores minimal data locally in your browser:
            </p>
            <ul className="list-disc ml-6 text-slate-300 space-y-2">
              <li>OAuth authentication token (in Chrome storage)</li>
              <li>Analysis results (temporary, in browser memory only)</li>
            </ul>
            <p className="text-slate-300 mt-4">
              All data is deleted when you uninstall the extension.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-slate-300 mb-4">
              We use Anthropic&apos;s Claude AI API to analyze email content. Anthropic&apos;s privacy policy 
              can be found at: <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">https://www.anthropic.com/privacy</a>
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-slate-300 mb-4">You have the right to:</p>
            <ul className="list-disc ml-6 text-slate-300 space-y-2">
              <li>Revoke Gmail access at any time from your Google Account settings</li>
              <li>Request deletion of any stored data</li>
              <li>Uninstall the extension at any time</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-slate-300">
              For privacy concerns or questions, email us at: 
              <span className="text-indigo-400"> privacy@scopeguard.app</span>
            </p>
          </section>
        </div>
      </div>
    );
  }