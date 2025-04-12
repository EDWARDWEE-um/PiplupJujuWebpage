import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Flame, Package } from "lucide-react"
import NewsletterSection from "@/components/newsletter-section"
import UpcomingStreams from "@/components/upcoming-streams"
import PriceChart from "@/components/price-chart"
import LoyaltyPointsPromo from "@/components/loyalty-points-promo"
import MarketPriceWidget from "@/components/market-price-widget"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - Now Rip or Ship Focused */}
        <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-white">
                  Rip or Ship Your Pokemon TCG
                </h1>
                <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-200">
                  Your choice: Watch us open your packs live on stream or get them shipped sealed to your door
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full sm:flex-row sm:gap-4 sm:w-auto">
                <Link href="/rip-or-ship?option=rip" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white w-full h-12 text-base">
                    <Flame className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Live Rip
                  </Button>
                </Link>
                <Link href="/rip-or-ship?option=ship" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white w-full h-12 text-base">
                    <Package className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Ship Sealed
                  </Button>
                </Link>
              </div>
              <div className="mt-4 text-white/80 text-xs sm:text-sm">
                Earn 2X loyalty points on all Rip or Ship purchases this week!
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full py-6 sm:py-8 md:py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted-foreground/20 px-3 py-1 text-sm">
                  Featured Products
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tighter">Hot Items This Week</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground text-sm">
                  Perfect for Rip or Ship - Choose your adventure!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-8">
              {/* Adjust the FeaturedProducts component to use smaller cards on mobile */}
            </div>
          </div>
        </section>

        {/* Loyalty Points Promo */}
        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <LoyaltyPointsPromo />
          </div>
        </section>

        {/* Market Price Trends */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Market Trends</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground text-sm md:text-base">
                  Real-time TCGPlayer pricing data to help you make informed decisions
                </p>
              </div>
            </div>
            <Tabs defaultValue="sealed" className="mt-6 md:mt-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="sealed">Sealed</TabsTrigger>
                <TabsTrigger value="singles">Singles</TabsTrigger>
                <TabsTrigger value="slabs">Slabs</TabsTrigger>
              </TabsList>
              <TabsContent value="sealed" className="mt-4 md:mt-6">
                <Card>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <PriceChart productType="sealed" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="singles" className="mt-4 md:mt-6">
                <Card>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <PriceChart productType="singles" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="slabs" className="mt-4 md:mt-6">
                <Card>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <PriceChart productType="slabs" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Market Price Widget */}
        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6 md:mb-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Today's Market Prices</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground text-sm md:text-base">
                  Powered by TCGPlayer API - Updated hourly
                </p>
              </div>
            </div>
            <MarketPriceWidget />
          </div>
        </section>

        {/* Livestreams and Newsletter Section */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted-foreground/20 px-3 py-1 text-sm">
                  Upcoming Livestreams
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Join Our Live Rip Events</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Watch pack openings, participate in live auctions, and see your cards get ripped!
                </p>
                <UpcomingStreams />
                <div className="flex justify-center lg:justify-start">
                  <Link href="/livestreams">
                    <Button className="mt-4">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      View Full Calendar
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <NewsletterSection />
              </div>
            </div>
          </div>
        </section>

        {/* How Rip or Ship Works */}
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
                    The Rip or Ship Experience
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground text-sm md:text-base">
                    Purchase sealed products and decide whether you want us to open them live on stream or ship them
                    directly to you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/rip-or-ship">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Flame className="mr-2 h-4 w-4" />
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Card className="bg-gradient-to-b from-red-500 to-red-600 text-white">
                    <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-2">
                      <Flame className="h-8 w-8 md:h-12 md:w-12 mb-2" />
                      <h3 className="text-lg md:text-xl font-bold">Live Rip</h3>
                      <p className="text-xs md:text-sm">Watch us open your packs live on stream</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-b from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-2">
                      <Package className="h-8 w-8 md:h-12 md:w-12 mb-2" />
                      <h3 className="text-lg md:text-xl font-bold">Ship Sealed</h3>
                      <p className="text-xs md:text-sm">Get your sealed products delivered untouched</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
