import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const auctionId = searchParams.get('auction_id')
    const bid = searchParams.get('bid')

    if (!auctionId || !bid) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const bidUrl = `https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/placeBid/aa7ebf45-3521-46af-a084-74a1d16794a0?auction_id=${auctionId}&bid=${bid}`

    const response = await fetch(bidUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in bid proxy:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 