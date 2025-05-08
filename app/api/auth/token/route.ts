import { type NextRequest, NextResponse } from "next/server"
import { getServerWixClient } from "@/lib/server-wix-client"

// The hardcoded member token - in a real app, this would be securely stored
const MEMBER_TOKEN = {
  refreshToken: {
    value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc", // Replace with your actual token
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  },
}

export async function GET(request: NextRequest) {
  try {
    // Create a Wix client with the token
    const wixClient = await getServerWixClient()

    // Set the token in the client
    wixClient.auth.setTokens({
      refreshToken: MEMBER_TOKEN.refreshToken,
      accessToken: { value: "", expiresAt: 0 }, // This will be refreshed automatically
    })

    // Try to get the current member to verify the token works
    try {
      const currentMember = await wixClient.members.getCurrentMember()

      if (!currentMember) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }

      // Create response with redirect
      const response = NextResponse.redirect(new URL("/account", request.url))

      // Set the token in cookies
      response.cookies.set("refreshToken", JSON.stringify(MEMBER_TOKEN.refreshToken), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })

      return response
    } catch (memberError) {
      console.error("Error fetching member:", memberError)
      return NextResponse.json({ error: "Invalid token or token expired" }, { status: 401 })
    }
  } catch (error) {
    console.error("Token auth error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Authentication failed" },
      { status: 500 },
    )
  }
}
