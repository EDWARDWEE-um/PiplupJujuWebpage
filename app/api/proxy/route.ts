import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  const auctionId = request.nextUrl.searchParams.get("auction_id")
  const bid = request.nextUrl.searchParams.get("bid")
  const authHeader = request.headers.get("Authorization")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Construct the full URL with query parameters
    const fullUrl = `${url}?auction_id=${auctionId}&bid=${bid}`

    // Forward the request to the target URL
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    // Get the response data
    const data = await response.json()

    // Return the response
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch from target URL" }, { status: 500 })
  }
}
