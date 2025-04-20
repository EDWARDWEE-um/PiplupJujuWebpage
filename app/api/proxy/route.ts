import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')
  const bid = searchParams.get('bid')
  const auctionId = searchParams.get('auction_id')
  const token = request.headers.get('authorization')

  if (!targetUrl || !bid || !auctionId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const response = await fetch(`${targetUrl}?auction_id=${auctionId}&bid=${bid}`, {
      method: 'GET',
      headers: {
        'Authorization': token || '',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
} 