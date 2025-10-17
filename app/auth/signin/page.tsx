'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-slate-900 mb-2">ScopeGuard</h1>
          <p className="text-slate-600">Sign in to protect your project scope</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSignIn("github")}
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in with GitHub"}
          </button>

          <button
            onClick={() => handleSignIn("google")}
            disabled={isLoading}
            className="w-full bg-white border border-slate-300 text-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>

        <p className="text-center text-slate-600 mt-6 text-sm">
          We use OAuth for secure, passwordless authentication
        </p>
      </div>
    </div>
  )
}
