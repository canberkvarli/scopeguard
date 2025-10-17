'use client'

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface Project {
  id: string
  projectName: string
  clientName: string
  createdAt: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchProjects()
    }
  }, [session])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-900">ScopeGuard</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">{session.user?.email}</span>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-semibold text-slate-900 mb-2">Your projects</h2>
            <p className="text-slate-600">Manage your design projects and protect your scope</p>
          </div>
          <button
            onClick={() => router.push("/projects/new")}
            className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800"
          >
            New project
          </button>
        </div>

        {loading ? (
          <div>Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No projects yet</h3>
            <p className="text-slate-600 mb-6">Create your first project to start protecting your scope</p>
            <button
              onClick={() => router.push("/projects/new")}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800"
            >
              Create project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => router.push(`/projects/${project.id}`)}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">{project.projectName}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Active</span>
                </div>
                <p className="text-slate-600 text-sm">Client: {project.clientName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
