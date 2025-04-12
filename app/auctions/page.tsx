import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Flame } from "lucide-react"

export const metadata: Metadata = {
  title: "Auctions | PokéCollect",
  description: "Bid on rare Pokemon TCG cards and sealed products.",
}

export default function AuctionsPage() {
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
    </div>
  )
}
