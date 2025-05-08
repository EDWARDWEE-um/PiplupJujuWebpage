import { NextResponse } from "next/server"
import { getWixClient } from "@/lib/wix-server-client"

export async function POST() {
  try {
    const wixClient = getWixClient()

    const { logoutUrl } = await wixClient.auth.logout("/")

    return NextResponse.json({ message: "Logged out", logoutUrl })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Logout failed", details: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    )
  }
}
