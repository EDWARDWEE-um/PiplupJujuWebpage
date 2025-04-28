import { NextResponse } from "next/server"
import { getShipEngineService } from "@/lib/shipengine-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackingNumber = searchParams.get("trackingNumber")
  const carrierCode = searchParams.get("carrierCode") || undefined

  if (!trackingNumber) {
    return NextResponse.json({ error: "Tracking number is required" }, { status: 400 })
  }

  try {
    const shipEngineService = getShipEngineService()
    const trackingInfo = await shipEngineService.trackShipment(trackingNumber, carrierCode)
    return NextResponse.json(trackingInfo)
  } catch (error) {
    console.error("Error tracking shipment:", error)
    return NextResponse.json({ error: "Failed to track shipment" }, { status: 500 })
  }
}
