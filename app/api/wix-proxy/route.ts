import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    const auctionId = searchParams.get('auction_id')
    const bid = searchParams.get('bid')

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Missing endpoint parameter' },
        { status: 400 }
      )
    }

    let url = ''
    switch (endpoint) {
      case 'auction':
        url = `https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/auction/df8d9839-d503-5c9a-91ec-cffdba41b9e4?auction_id=${auctionId}`
        break
      case 'placeBid':
        url = `https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/placeBid/aa7ebf45-3521-46af-a084-74a1d16794a0?auction_id=${auctionId}&bid=${bid}`
        break
      default:
        return NextResponse.json(
          { error: 'Invalid endpoint' },
          { status: 400 }
        )
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Failed to fetch data: ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // If this is an auction endpoint, parse the HTML
    if (endpoint === 'auction') {
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
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in Wix proxy:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 