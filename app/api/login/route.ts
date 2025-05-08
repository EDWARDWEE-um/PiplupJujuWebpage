import { type NextRequest, NextResponse } from "next/server"
import { getWixClient } from "@/lib/wix-server-client"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const wixClient = getWixClient()

    const session = await wixClient.auth.login({
      email,
      password,
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Login failed", details: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    )
  }
}
