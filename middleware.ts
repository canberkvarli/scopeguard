import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For now, let all requests pass through
  // In production, you'd want to implement proper auth checking here
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/projects/:path*"]
}
