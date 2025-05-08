import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasWixClientId: !!process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    hasWixSiteId: !!process.env.WIX_SITE_ID,
    hasShipEngineKey: !!process.env.SHIPENGINE_API_KEY,
    environment: process.env.NODE_ENV,
  })
}
