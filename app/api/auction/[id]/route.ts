import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auctionUrl = `https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/auction/df8d9839-d503-5c9a-91ec-cffdba41b9e4?auction_id=${params.id}`

    const response = await fetch(auctionUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Failed to fetch auction data: ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Parse the HTML to get the current bid and total bids
    const parser = new DOMParser()
    const doc = parser.parseFromString(data.html, 'text/html')
    
    const currentBidElement = doc.querySelector('#currentBidAmount')
    const totalBidsElement = doc.querySelector('#currentBids')
    
    const currentBid = currentBidElement ? parseFloat(currentBidElement.textContent?.replace(/[^\d.]/g, '') || '0') : 0
    const totalBids = totalBidsElement ? parseInt(totalBidsElement.textContent || '0') : 0

    return NextResponse.json({
      currentBid,
      totalBids,
      ...data
    })
  } catch (error) {
    console.error('Error fetching auction data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch auction data' },
      { status: 500 }
    )
  }
} 