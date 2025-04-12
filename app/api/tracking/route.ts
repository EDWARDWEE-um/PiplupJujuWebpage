import { type NextRequest, NextResponse } from "next/server"
import { getTrackingService } from "@/lib/delivery-tracking"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { trackingNumber, carrier } = body

    if (!trackingNumber) {
      return NextResponse.json({ error: "Tracking number is required" }, { status: 400 })
    }

    const trackingService = getTrackingService()
    const trackingInfo = await trackingService.trackShipment({
      trackingNumber,
      carrier,
    })

    return NextResponse.json(trackingInfo)
  } catch (error) {
    console.error("Error tracking shipment:", error)
    return NextResponse.json({ error: "Failed to track shipment" }, { status: 500 })
  }
}
