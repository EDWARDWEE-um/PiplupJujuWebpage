"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Flame, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState("")
  const [currentBid, setCurrentBid] = useState(299.99)
  const [totalBids, setTotalBids] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("=== Starting Bid Submission Process ===")
    console.log("Form submitted with bid amount:", bidAmount)
    
    const amount = Number.parseFloat(bidAmount)

    if (isNaN(amount) || amount <= currentBid) {
      toast({
        title: "Invalid bid amount",
        description: "Your bid must be higher than the current bid.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log("1. Validating bid amount...")
      console.log("✅ Bid amount validated:", amount)

      console.log("2. Preparing bid request...")
      const bidUrl = `https://wix.webkul.com/en/wix/app/auctions/Piplupjujutcg2dea/endpoint/auction/df8d9839-d503-5c9a-91ec-cffdba41b9e4?auction_id=${params.id}&bid=${amount}`
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
      
      if (data.status === "success") {
        // Update UI with new bid data
        setCurrentBid(amount)
        setTotalBids(totalBids + 1)
        setBidAmount("")
        setIsLoading(false)

        toast({
          title: "Bid placed successfully!",
          description: `You are now the highest bidder at $${amount.toFixed(2)}.`,
        })
      } else {
        throw new Error(data.message || "Failed to place bid")
      }
      
    } catch (err) {
      console.log("❌ Error in bid submission process:")
      console.error(err)
      setIsLoading(false)
      toast({
        title: "Failed to place bid",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const handleAutoBid = () => {
    const newBid = currentBid + 5
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setCurrentBid(newBid)
      setTotalBids(totalBids + 1)
      setIsLoading(false)

      toast({
        title: "Bid placed successfully!",
        description: `You are now the highest bidder at $${newBid.toFixed(2)}.`,
      })
    }, 1000)
  }

  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Charizard VMAX (PSA 10)"
              width={600}
              height={600}
              className="object-cover w-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Thumbnail 1"
                width={150}
                height={150}
                className="object-cover w-full aspect-square"
              />
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Thumbnail 2"
                width={150}
                height={150}
                className="object-cover w-full aspect-square"
              />
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Thumbnail 3"
                width={150}
                height={150}
                className="object-cover w-full aspect-square"
              />
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Thumbnail 4"
                width={150}
                height={150}
                className="object-cover w-full aspect-square"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1 text-xs sm:text-sm">
                <Flame className="h-3 w-3" />
                Live Auction
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                Slabs
              </Badge>
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm">Rare</Badge>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Charizard VMAX (PSA 10)</h1>

            <Card className="mt-4">
              <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-lg sm:text-2xl font-bold">${currentBid.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-muted-foreground">Bids</p>
                    <p className="text-base sm:text-lg font-medium">{totalBids}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Ends in 2 hours</span>
                </div>

                <form onSubmit={handleBid} className="space-y-2 sm:space-y-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input
                        type="number"
                        step="0.01"
                        min={currentBid + 0.01}
                        placeholder={(currentBid + 1).toFixed(2)}
                        className="pl-7 h-9 sm:h-10 text-sm sm:text-base"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="h-9 sm:h-10 text-xs sm:text-sm">
                      Place Bid
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-9 sm:h-10 text-xs sm:text-sm"
                    onClick={handleAutoBid}
                    disabled={isLoading}
                  >
                    Bid ${(currentBid + 5).toFixed(2)} (Next Increment)
                  </Button>
                </form>

                <div className="text-xs text-muted-foreground">
                  By placing a bid, you agree to our{" "}
                  <Link href="/terms" className="underline">
                    Terms of Service
                  </Link>
                  .
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Item Details</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Charizard VMAX from Darkness Ablaze</li>
              <li>PSA 10 Gem Mint condition</li>
              <li>Card #020/189</li>
              <li>Professionally graded and authenticated</li>
              <li>Includes PSA case and label</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Seller Information</h3>
            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-full p-2">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">PokéCollect Official</p>
                <p className="text-xs text-muted-foreground">Verified Seller · 1,245 ratings (99% positive)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="bid-history">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="bid-history">Bid History</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
          </TabsList>
          <TabsContent value="bid-history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bid History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-muted rounded-full p-1">
                        <User className="h-3 w-3" />
                      </div>
                      <span className="font-medium">u***r</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${currentBid.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-muted rounded-full p-1">
                        <User className="h-3 w-3" />
                      </div>
                      <span className="font-medium">p***e</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$294.99</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-muted rounded-full p-1">
                        <User className="h-3 w-3" />
                      </div>
                      <span className="font-medium">c***z</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$289.99</p>
                      <p className="text-xs text-muted-foreground">25 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  This item will be shipped via USPS Priority Mail with tracking and insurance. Shipping is free within
                  the United States.
                </p>
                <p>
                  International shipping is available at an additional cost. Please contact us for international
                  shipping rates.
                </p>
                <p>Item will be shipped within 2 business days after payment is received.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="terms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By placing a bid, you are entering into a legally binding contract to purchase this item if you are
                  the winning bidder.
                </p>
                <p>
                  Payment is due within 48 hours of auction end. We accept PayPal, credit cards, and cryptocurrency.
                </p>
                <p>
                  All sales are final. Returns are only accepted if the item is significantly different from its
                  description.
                </p>
                <p>
                  PokéCollect reserves the right to cancel bids from bidders with negative feedback or unverified
                  accounts.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
