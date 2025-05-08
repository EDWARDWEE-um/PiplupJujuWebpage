import { type NextRequest, NextResponse } from "next/server"
import { getWixClient } from "@/lib/wix-server-client"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const wixClient = getWixClient()

    const result = await wixClient.auth.register({
      email,
      password,
    })

    return NextResponse.json({ message: "User registered", result })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Registration failed", details: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    )
  }
}
