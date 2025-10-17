// app/dashboard/page.tsx
'use client'

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface Project {
  id: string
  projectName: string
  clientName: string
  flaggedCount: number
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetch("/api/projects")
        .then(r => r.json())
        .then(data => setProjects(data))
        .catch(err => console.error(err))
    }
  }, [session])

  if (status === "loading") return null

  if (!session) return null

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-900">ScopeGuard</span>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="text-xs text-slate-600 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <button
            onClick={() => router.push("/projects/new")}
            className="text-sm bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800"
          >
            New
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-600 text-sm mb-4">No projects yet</p>
            <button
              onClick={() => router.push("/projects/new")}
              className="text-sm bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800"
            >
              Create one
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => router.push(`/projects/${project.id}`)}
                className="border border-slate-200 rounded p-4 hover:border-slate-900 hover:shadow-sm cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-slate-900 text-sm">{project.projectName}</h2>
                    <p className="text-xs text-slate-600">{project.clientName}</p>
                  </div>
                  {project.flaggedCount > 0 && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {project.flaggedCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}