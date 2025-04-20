"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import { myWixClient } from "@/lib/wix-ecommerce"

export default function SealedProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [auctionData, setAuctionData] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [memberToken, setMemberToken] = useState<string | null>(null)
  const [bidStatus, setBidStatus] = useState<{message: string; type: string} | null>(null)
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const [currentBid, setCurrentBid] = useState(0)
  const [totalBids, setTotalBids] = useState(0)

  useEffect(() => {
  async function fetchProducts() {
    try {
        setLoading(true)
        const response = await myWixClient.products.queryProducts().find()
        setProducts(response.items)
      } catch (err) {
        setError("Failed to load products")
        console.error("Error fetching products:", err)
    } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    async function fetchAuctionData() {
      try {
        const response = await fetch('https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/auction/df8d9839-d503-5c9a-91ec-cffdba41b9e4')
        const data = await response.json()
        setAuctionData(data)
        
        // Parse the HTML to get the end date and bid information
        const parser = new DOMParser()
        const doc = parser.parseFromString(data.html, 'text/html')
        
        // Extract bid end date
        const endDateElement = doc.querySelector('.bid-end-date b')
        if (endDateElement) {
          const endDate = endDateElement.textContent
          if (endDate) {
            setTimeRemaining(calculateTimeRemaining(endDate))
          }
        }

        // Extract current bid and total bids
        const currentBidElement = doc.querySelector('#currentBidAmount')
        const totalBidsElement = doc.querySelector('#currentBids')
        
        if (currentBidElement) {
          // Remove any non-numeric characters except decimal point
          const bidText = currentBidElement.textContent || '0'
          const cleanBid = bidText.replace(/[^\d.]/g, '')
          const bidAmount = parseFloat(cleanBid)
          console.log("Parsed bid amount:", bidAmount)
          setCurrentBid(bidAmount)
        }
        if (totalBidsElement) {
          setTotalBids(parseInt(totalBidsElement.textContent || '0'))
        }
      } catch (err) {
        console.error("Error fetching auction data:", err)
      }
    }

    fetchAuctionData()

    // Set up interval to refresh auction data every 10 seconds
    const auctionRefreshInterval = setInterval(fetchAuctionData, 10000)

    return () => {
      clearInterval(auctionRefreshInterval)
    }
  }, [])

  useEffect(() => {
    if (!auctionData?.html) return

    // Clear any existing interval
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }

    // Set up new interval
    countdownRef.current = setInterval(() => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(auctionData.html, 'text/html')
      const endDateElement = doc.querySelector('.bid-end-date b')
      if (endDateElement) {
        const endDate = endDateElement.textContent
        if (endDate) {
          setTimeRemaining(calculateTimeRemaining(endDate))
        }
      }
    }, 1000)

    // Cleanup
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [auctionData])

  useEffect(() => {
    async function fetchMemberToken() {
      try {
        console.log("Fetching member token...")
        // Temporary hardcoded token for testing
        const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3d3dy5waXBsdXBqdWp1dGNnLmNvbSIsInN1YiI6IjEyMzQ1Njc4OTAiLCJhdWQiOiJwaXBsdXBqdWp1dGNnIiwiZXhwIjoxNzEzMjY0ODAwLCJpYXQiOjE3MTMyNjEyMDAsIm5hbWUiOiJUZXN0IFVzZXIiLCJlbWFpbCI6InRlc3RAdXNlci5jb20ifQ.1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        
        console.log("Using hardcoded token for testing")
        setMemberToken(hardcodedToken)
        setBidStatus(null)
        
        // Keep the original fetch code commented for future use
        /*
        const response = await fetch('https://www.piplupjujutcg.com/_api/apps/current-member/aa2896dd-2c3e-4f7d-84da-89f88b6ced1b', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })

        console.log("Token response status:", response.status)
        
        if (!response.ok) {
          console.log("Not authenticated with Wix")
          setBidStatus({
            message: "Please sign in to place a bid",
            type: "error"
          })
          return
        }

        const data = await response.json()
        console.log("Token response data:", data)
        
        if (data.signedToken) {
          console.log("Token received successfully")
          setMemberToken(data.signedToken)
          setBidStatus(null)
        } else {
          console.log("No token in response")
          setBidStatus({
            message: "Please sign in to place a bid",
            type: "error"
          })
        }
        */
      } catch (err) {
        console.error("Error in token handling:", err)
        setBidStatus({
          message: "Please sign in to place a bid",
          type: "error"
        })
      }
    }

    fetchMemberToken()

    // Set up interval to refresh token periodically
    const tokenRefreshInterval = setInterval(fetchMemberToken, 5 * 60 * 1000) // Refresh every 5 minutes

    return () => {
      clearInterval(tokenRefreshInterval)
    }
  }, [])

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("=== Starting Bid Submission Process ===")
    console.log("Form submitted with bid amount:", bidAmount)
    
    // Add basic validation
    if (!bidAmount) {
      console.log("❌ No bid amount entered")
      setBidStatus({
        message: "Please enter a bid amount",
        type: "error"
      })
      return
    }

    if (!memberToken) {
      console.log("❌ Bid submission failed: No member token available")
      setBidStatus({
        message: "Please sign in to place a bid",
        type: "error"
      })
      return
    }

    try {
      console.log("1. Validating bid amount...")
      const bidValue = parseFloat(bidAmount)
      if (isNaN(bidValue) || bidValue <= 0) {
        console.log("❌ Invalid bid amount:", bidAmount)
        throw new Error("Please enter a valid bid amount")
      }
      console.log("✅ Bid amount validated:", bidValue)

      console.log("2. Preparing bid request...")
      const bidUrl = `https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/placeBid/aa7ebf45-3521-46af-a084-74a1d16794a0`
      console.log("Bid URL:", bidUrl)
      console.log("Member token (first 20 chars):", memberToken.substring(0, 20) + "...")

      console.log("3. Sending bid request through proxy...")
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(bidUrl)}&auction_id=14618&bid=${bidAmount}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${memberToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log("4. Received response:")
      console.log("- Status:", response.status)
      console.log("- Status text:", response.statusText)
      console.log("- Headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.log("❌ Bid submission failed:")
        console.log("- Error status:", response.status)
        console.log("- Error text:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`)
      }

      console.log("5. Parsing response data...")
      const data = await response.json()
      console.log("Response data:", data)
      
      console.log("6. Processing bid result...")
      handleBidSuccess(data)
      console.log("✅ Bid submission completed successfully")
      
    } catch (err) {
      console.log("❌ Error in bid submission process:")
      console.error(err)
      setBidStatus({
        message: `Failed to place bid: ${err instanceof Error ? err.message : 'Unknown error'}`,
        type: "error"
      })
    }
  }

  const handleBidSuccess = (data: any) => {
    console.log("=== Processing Successful Bid ===")
    console.log("1. Setting bid status...")
    setBidStatus({
      message: data.message,
      type: data.type
    })

    if (data.type === "success") {
      console.log("2. Updating UI with new bid data...")
      console.log("- New bid amount:", data.price)
      console.log("- New total bids:", data.totalBids)
      
      setCurrentBid(parseFloat(data.price))
      setTotalBids(parseInt(data.totalBids))
      
      console.log("3. Refreshing auction data...")
      fetch('https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/auction/df8d9839-d503-5c9a-91ec-cffdba41b9e4')
        .then(response => response.json())
        .then(auctionData => {
          console.log("4. Auction data refreshed successfully")
          console.log("New auction data:", auctionData)
          setAuctionData(auctionData)
        })
        .catch(err => {
          console.log("❌ Error refreshing auction data:")
          console.error(err)
        })
    }
    
    console.log("5. Resetting bid amount input")
    setBidAmount("")
    console.log("✅ Bid processing completed")
  }

  // Function to calculate time remaining
  const calculateTimeRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    const difference = end - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    }
  }

  if (loading) {
    return (
      <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }
  
  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      {/* Auction Test Area */}
      {auctionData && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Auction Test Area</h2>
          {bidStatus && (
            <div className={`mb-4 p-3 rounded ${
              bidStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {bidStatus.message}
        </div>
      )}
          <div className="auction-data-container">
            <div className="auction-container">
              <p className="bid-end-date">
                Bid End Date: <span><b>2025-04-17 15:00:00</b></span>
              </p>
              <p>Time Remaining</p>
              <div className="auction-countdown">
                <div className="container">
                  <div id="countdown">
                    <ul className="flex gap-2">
                      <li>
                        <span className="block bg-black/70 text-white rounded px-2 py-1">{timeRemaining.days}</span>
                        <p className="text-xs font-bold">days</p>
                      </li>
                      <li>
                        <span className="block bg-black/70 text-white rounded px-2 py-1">{timeRemaining.hours}</span>
                        <p className="text-xs font-bold">Hours</p>
                      </li>
                      <li>
                        <span className="block bg-black/70 text-white rounded px-2 py-1">{timeRemaining.minutes}</span>
                        <p className="text-xs font-bold">Minutes</p>
                      </li>
                      <li>
                        <span className="block bg-black/70 text-white rounded px-2 py-1">{timeRemaining.seconds}</span>
                        <p className="text-xs font-bold">Seconds</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="bids-data flex justify-between">
                <p>
                  Current Bid Amount
                  <br />
                  <span>
                    MYR <span id="currentBidAmount">{currentBid.toFixed(2)}</span>
                  </span>
                </p>
                <p>
                  <span id="currentBids">{totalBids}</span> Bids
                </p>
              </div>
              <hr className="my-4" />
              <form 
                id="auction-bid-form" 
                onSubmit={(e) => {
                  console.log("Form submit event triggered")
                  handleBidSubmit(e)
                }} 
                className="flex gap-4"
              >
                <div className="wk-bid-input-container flex-1">
                  <input
                    type="number"
                    name="wk_bid_amount"
                    id="wkBidAmount"
                    value={bidAmount}
                    onChange={(e) => {
                      console.log("Bid amount changed:", e.target.value)
                      setBidAmount(e.target.value)
                    }}
                    className="w-full h-8 border-2 border-gray-300 rounded px-2"
                    placeholder="Enter bid amount"
                    min="1"
                    step="1"
                    required
                        />
                      </div>
                <div className="wk-bid-button-container">
                        <button
                    type="submit"
                    onClick={() => console.log("Place bid button clicked")}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
                    disabled={!memberToken}
                  >
                    Place Bid
                        </button>
                      </div>
              </form>
              <div className="min-bid-data mt-4">
                Minimum Bid: MYR 1.00
                    </div>
              <div className="note-bid-increment mt-4 border-l-4 border-yellow-400 pl-2">
                <div><b>Note</b>: Please place your bids in increments of 1</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Mobile filter button that shows at the top on mobile */}
        <div className="md:hidden">
          <Button variant="outline" size="sm" className="w-full mb-4">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Sidebar filters - hidden on mobile by default */}
        <div className="hidden md:block md:w-1/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Filters</h2>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Reset
            </Button>
          </div>

          <div className="space-y-4">
                      <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <Slider defaultValue={[0, 250]} max={500} step={1} />
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="h-8" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="h-8" />
                </div>
                      </div>
                    </div>

            <div>
              <h3 className="font-medium mb-2">Product Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="booster-box" />
                  <Label htmlFor="booster-box">Booster Box</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="etb" />
                  <Label htmlFor="etb">Elite Trainer Box</Label>
                  </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="booster-pack" />
                  <Label htmlFor="booster-pack">Booster Pack</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="premium-collection" />
                  <Label htmlFor="premium-collection">Premium Collection</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl font-bold">Sealed Products</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-8 md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="featured">
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/products/sealed/${product._id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                  <div className="relative">
                    <Image
                      src={product.media?.mainMedia?.image?.url || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full aspect-square"
                    />
                    {product.stock?.quantity === 0 && (
                      <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-2 sm:p-4">
                    <h3 className="font-semibold text-xs sm:text-base line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-2 sm:p-4 pt-0 flex justify-between items-center">
                    <p className="font-bold text-sm sm:text-base">
                      {product.price?.formatted?.price || "Price unavailable"}
                    </p>
                    <Button 
                      size="sm" 
                      className="h-8 text-xs sm:text-sm"
                      disabled={product.stock?.quantity === 0}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
