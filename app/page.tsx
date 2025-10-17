'use client'

import { useSession } from "next-auth/react"
import ScopeGuard from './components/ScopeGuard'

export default function Home() {
  const { status } = useSession()

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <ScopeGuard />
}