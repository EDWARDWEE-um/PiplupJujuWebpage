"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Clock, Flame } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuctionsPage() {
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

  const liveAuctions = [
    {
      id: 1,
      name: "Charizard VMAX (PSA 10)",
      currentBid: 299.99,
      bids: 12,
      image: "/placeholder.svg?height=300&width=300",
      endTime: "2 hours",
      category: "slabs",
    },
    {
      id: 2,
      name: "Base Set Booster Pack (Unweighed)",
      currentBid: 499.99,
      bids: 8,
      image: "/placeholder.svg?height=300&width=300",
      endTime: "4 hours",
      category: "sealed",
      badge: "Vintage",
    },
    {
      id: 3,
      name: "Pikachu Gold Star (PSA 9)",
      currentBid: 1299.99,
      bids: 24,
      image: "/placeholder.svg?height=300&width=300",
      endTime: "1 hour",
      category: "slabs",
      badge: "Rare",
    },
    {
      id: 4,
      name: "Scarlet & Violet Booster Box",
      currentBid: 129.99,
      bids: 5,
      image: "/placeholder.svg?height=300&width=300",
      endTime: "6 hours",
      category: "sealed",
    },
  ]

  const upcomingAuctions = [
    {
      id: 5,
      name: "Lugia 1st Edition (PSA 8)",
      startingBid: 899.99,
      image: "/placeholder.svg?height=300&width=300",
      startTime: "Tomorrow, 7:00 PM",
      category: "slabs",
      badge: "Rare",
    },
    {
      id: 6,
      name: "Hidden Fates ETB",
      startingBid: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      startTime: "Tomorrow, 8:00 PM",
      category: "sealed",
    },
    {
      id: 7,
      name: "Mewtwo GX Rainbow Rare",
      startingBid: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      startTime: "Tomorrow, 9:00 PM",
      category: "singles",
    },
  ]

  const pastAuctions = [
    {
      id: 8,
      name: "Blastoise 1st Edition (PSA 7)",
      finalPrice: 799.99,
      image: "/placeholder.svg?height=300&width=300",
      endedAt: "Yesterday",
      category: "slabs",
    },
    {
      id: 9,
      name: "Celebrations Ultra-Premium Collection",
      finalPrice: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      endedAt: "2 days ago",
      category: "sealed",
    },
  ]

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
    const auctionRefreshInterval = setInterval(fetchAuctionData, 10000)
    return () => clearInterval(auctionRefreshInterval)
  }, [])

  useEffect(() => {
    if (!auctionData?.html) return

    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }

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
        const signedToken = "eyJraWQiOiJPeWFTQnVMWSIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjp7IlNIQTI1NiI6IntcIm1lbWJlclwiOntcImlkXCI6XCJhYTdlYmY0NS0zNTIxLTQ2YWYtYTA4NC03NGExZDE2Nzk0YTBcIn19In0sImlhdCI6MTc0NTA3NzUyMCwiZXhwIjoxNzQ1MDc4MTIwfQ.WUYwU_fthOwTcfJFXp73-oLokrCRrrInJxqMquZ9W9SWWT9votGhjTVfvLBuLodjauT7HGLlB-eA0o0NFnBUztEj75buP17YWpEWwbQzZf8OjPUMVP2Wh6wOYO3Co8w-tVoU0R-TgzLd_QdvWPHAATiPxtNM8i3fgh9YSgxrETWfD2eWo5xS4R7jkJM0t_GHuy-u8yMVHNZ41ud-ez97WlYzHIV22n6VOm4J2z_JJVOKpIFmitqhLQP6lmdtLUan4cJFxhKWVX0RgMqUl9ueMqRP8LbCJFzhLODOFEobvFH89onrofoDmmam0tz1foiwyt2SfRfCPkSLjGtFkHAiJA"
        
        console.log("Using signed token")
        setMemberToken(signedToken)
        setBidStatus(null)
      } catch (err) {
        console.error("Error in token handling:", err)
        setBidStatus({
          message: "Please sign in to place a bid",
          type: "error"
        })
      }
    }

    fetchMemberToken()
    const tokenRefreshInterval = setInterval(fetchMemberToken, 5 * 60 * 1000)
    return () => clearInterval(tokenRefreshInterval)
  }, [])

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("=== Starting Bid Submission Process ===")
    console.log("Form submitted with bid amount:", bidAmount)
    
    if (!bidAmount) {
      console.log("❌ No bid amount entered")
      setBidStatus({
        message: "Please enter a bid amount",
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
      const bidUrl = `/api/bid?auction_id=14620&bid=${bidAmount}`
      console.log("Bid URL:", bidUrl)

      console.log("3. Sending bid request...")
      const response = await fetch(bidUrl, {
        method: 'GET',
        headers: {
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

  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Auctions</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Bid on rare Pokemon TCG cards, slabs, and sealed products. New auctions daily!
        </p>
      </div>

      <Tabs defaultValue="live" className="mt-6 sm:mt-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="live" className="text-xs sm:text-sm">
            Live Auctions
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="text-xs sm:text-sm">
            Past Auctions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-4 sm:mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {liveAuctions.map((auction) => (
              <Link key={auction.id} href={`/auctions/${auction.id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                  <div className="relative">
                    <Image
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.name}
                      width={300}
                      height={300}
                      className="object-cover w-full aspect-square"
                    />
                    {auction.badge && (
                      <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-600 text-black">
                        {auction.badge}
                      </Badge>
                    )}
                    <Badge className="absolute top-1 left-1 sm:top-2 sm:left-2 text-xs sm:text-sm bg-red-500 hover:bg-red-600 flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Live
                    </Badge>
                  </div>
                  <CardContent className="p-2 sm:p-4">
                    <h3 className="font-semibold text-xs sm:text-base line-clamp-1">{auction.name}</h3>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Ends in {auction.endTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 sm:p-4 pt-0 flex flex-col items-start">
                    <div className="flex justify-between w-full">
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Current Bid</p>
                        <p className="font-bold text-sm sm:text-base">${auction.currentBid.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm text-muted-foreground">Bids</p>
                        <p className="text-sm sm:text-base">{auction.bids}</p>
                      </div>
                    </div>
                    <Button className="mt-2 sm:mt-3 w-full text-xs sm:text-sm h-8 sm:h-9">Place Bid</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingAuctions.map((auction) => (
              <Link key={auction.id} href={`/auctions/${auction.id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                  <div className="relative">
                    <Image
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.name}
                      width={300}
                      height={300}
                      className="object-cover w-full aspect-square"
                    />
                    {auction.badge && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                        {auction.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{auction.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Starts {auction.startTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting Bid</p>
                      <p className="font-bold">${auction.startingBid.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" className="mt-3 w-full">
                      Remind Me
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastAuctions.map((auction) => (
              <Link key={auction.id} href={`/auctions/${auction.id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-lg opacity-80">
                  <div className="relative">
                    <Image
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.name}
                      width={300}
                      height={300}
                      className="object-cover w-full aspect-square"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{auction.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm gap-1">
                      <span>Ended {auction.endedAt}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Final Price</p>
                      <p className="font-bold">${auction.finalPrice.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" className="mt-3 w-full" disabled>
                      Auction Ended
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {auctionData && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Current Auction</h2>
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
                  onSubmit={handleBidSubmit} 
                  className="flex gap-4"
                >
                  <div className="wk-bid-input-container flex-1">
                    <Input
                      type="number"
                      name="wk_bid_amount"
                      id="wkBidAmount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter bid amount"
                      min="1"
                      step="1"
                      required
                    />
                  </div>
                  <div className="wk-bid-button-container">
                    <Button
                      type="submit"
                      disabled={!memberToken}
                    >
                      Place Bid
                    </Button>
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
          </CardContent>
        </Card>
      )}
    </div>
  )
}
