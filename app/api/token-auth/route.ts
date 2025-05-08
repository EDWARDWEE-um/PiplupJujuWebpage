import { type NextRequest, NextResponse } from "next/server"
import { getServerWixClient } from "@/lib/server-wix-client"

// The hardcoded member token - in a real app, this would be securely stored
const MEMBER_TOKEN = {
  accessToken: {
    value: "YOUR_ACCESS_TOKEN_VALUE", // Replace with actual token
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days from now
  },
  refreshToken: {
    value: "YOUR_REFRESH_TOKEN_VALUE", // Replace with actual token
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days from now
  },
}

export async function GET(request: NextRequest) {
  try {
    // Get the member ID from the token or from a query parameter
    const memberId = request.nextUrl.searchParams.get("memberId") || "MEMBER_ID_FROM_TOKEN"

    if (!memberId) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 })
    }

    // Get member tokens for the specified member ID
    const memberTokens = await getServerWixClient().auth.getMemberTokensForExternalLogin(
      memberId,
      process.env.WIX_API_KEY!,
    )

    // Create response with redirect
    const response = NextResponse.redirect(new URL("/account", request.url))

    // Set session cookie with the tokens
    response.cookies.set("session", JSON.stringify(memberTokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Token auth error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Authentication failed" },
      { status: 500 },
    )
  }
}
