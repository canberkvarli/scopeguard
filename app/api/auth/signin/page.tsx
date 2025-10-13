'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignInPage() {
  useEffect(() => {
    signIn('google', { callbackUrl: '/dashboard' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-white text-xl">Redirecting to Google...</div>
    </div>
  );
}