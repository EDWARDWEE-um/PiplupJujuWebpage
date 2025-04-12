import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, TrendingUp } from "lucide-react"
import PriceChart from "@/components/price-chart"
import RipOrShipOption from "@/components/rip-or-ship-option"
import MarketPriceInfo from "@/components/market-price-info"

export const metadata: Metadata = {
  title: "Scarlet & Violet Booster Box | PokéCollect",
  description: "Buy Scarlet & Violet Booster Box at PokéCollect, your premier Pokemon TCG marketplace.",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Scarlet & Violet Booster Box"
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
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm">New Release</Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                In Stock
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Scarlet & Violet Booster Box</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-lg sm:text-xl font-bold">$149.99</div>
              <MarketPriceInfo tcgplayerPrice={154.99} lowestPrice={139.99} highestPrice={169.99} />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-full max-w-[80px] sm:max-w-[100px]">
                <Select defaultValue="1">
                  <SelectTrigger className="h-9 sm:h-10">
                    <SelectValue placeholder="Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="flex-1 h-9 sm:h-10 text-sm sm:text-base">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <RipOrShipOption productId={params.id} />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm sm:text-base">Product Details</h3>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li>36 booster packs per box</li>
              <li>10 cards per pack</li>
              <li>Scarlet & Violet Base Set</li>
              <li>Official Pokemon TCG product</li>
              <li>Release Date: March 31, 2023</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm sm:text-base">Description</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              The Pokémon TCG: Scarlet & Violet booster box contains 36 booster packs, each with 10 cards and at least
              one rare card per pack. With over 190 cards in the set, including powerful Pokémon ex, you'll be able to
              build a variety of decks and expand your collection with this exciting new release.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div className="text-xs sm:text-sm">
              Earn <span className="font-medium">300</span> loyalty points with this purchase!
              <span className="text-xs block text-muted-foreground">Double points when you choose Rip or Ship</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-12">
        <Tabs defaultValue="price-chart">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="price-chart" className="text-xs sm:text-sm">
              Price Chart
            </TabsTrigger>
            <TabsTrigger value="pull-rates" className="text-xs sm:text-sm">
              Pull Rates
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-sm">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="price-chart" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium">Market Price History</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Data source:</span>
                    <span className="font-medium">TCGPlayer API</span>
                  </div>
                </div>
                <PriceChart productType="sealed" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pull-rates" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Estimated Pull Rates</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Pokémon ex</span>
                    <span className="font-medium">1:8 packs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Full Art Pokémon</span>
                    <span className="font-medium">1:18 packs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Special Illustration Rare</span>
                    <span className="font-medium">1:36 packs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gold Hyper Rare</span>
                    <span className="font-medium">1:72 packs</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  *Pull rates are estimates based on community data and may vary.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">John D.</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4 fill-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">Great product! Pulled some amazing cards including a Charizard ex.</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Sarah M.</div>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4 fill-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                        <svg
                          className="w-4 h-4 fill-muted stroke-muted-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm">Fast shipping and good pulls. Would buy again!</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
