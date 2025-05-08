import { NextResponse } from "next/server"

export async function GET() {
  // Only check if public variables exist, never expose their values
  // This is safer than exposing the actual values
  return NextResponse.json({
    hasNextPublicWixClientId: !!process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    hasWixClientId: !!process.env.WIX_CLIENT_ID,
    // Include some debugging info that might help
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
}
