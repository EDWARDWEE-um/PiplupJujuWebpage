"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function MarketPriceWidget() {
  const [category, setCategory] = useState("trending")

  // Mock data - in a real app, this would come from TCGPlayer API
  const trendingCards = [
    {
      id: 1,
      name: "Charizard VMAX",
      set: "Darkness Ablaze",
      currentPrice: 89.99,
      previousPrice: 79.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 12.5,
    },
    {
      id: 2,
      name: "Pikachu VMAX",
      set: "Vivid Voltage",
      currentPrice: 34.99,
      previousPrice: 39.99,
      image: "/placeholder.svg?height=60&width=40",
      change: -12.5,
    },
    {
      id: 3,
      name: "Mewtwo V Alt Art",
      set: "Paldean Fates",
      currentPrice: 129.99,
      previousPrice: 99.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 30.0,
    },
    {
      id: 4,
      name: "Lugia V Alt Art",
      set: "Silver Tempest",
      currentPrice: 189.99,
      previousPrice: 199.99,
      image: "/placeholder.svg?height=60&width=40",
      change: -5.0,
    },
  ]

  const trendingSealed = [
    {
      id: 1,
      name: "Scarlet & Violet Booster Box",
      currentPrice: 149.99,
      previousPrice: 139.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 7.1,
    },
    {
      id: 2,
      name: "Paldean Fates ETB",
      currentPrice: 89.99,
      previousPrice: 79.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 12.5,
    },
    {
      id: 3,
      name: "Hidden Fates ETB",
      currentPrice: 249.99,
      previousPrice: 199.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 25.0,
    },
    {
      id: 4,
      name: "151 Booster Box",
      currentPrice: 179.99,
      previousPrice: 189.99,
      image: "/placeholder.svg?height=60&width=40",
      change: -5.3,
    },
  ]

  const trendingSlabs = [
    {
      id: 1,
      name: "Charizard Base Set PSA 9",
      currentPrice: 1999.99,
      previousPrice: 1899.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 5.3,
    },
    {
      id: 2,
      name: "Pikachu Illustrator PSA 7",
      currentPrice: 149999.99,
      previousPrice: 139999.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 7.1,
    },
    {
      id: 3,
      name: "Lugia 1st Edition PSA 10",
      currentPrice: 24999.99,
      previousPrice: 22999.99,
      image: "/placeholder.svg?height=60&width=40",
      change: 8.7,
    },
    {
      id: 4,
      name: "Charizard VMAX PSA 10",
      currentPrice: 299.99,
      previousPrice: 349.99,
      image: "/placeholder.svg?height=60&width=40",
      change: -14.3,
    },
  ]

  return (
    <Card>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <Tabs defaultValue="trending" onValueChange={setCategory}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="trending" className="text-xs sm:text-sm">
                Trending
              </TabsTrigger>
              <TabsTrigger value="singles" className="text-xs sm:text-sm">
                Singles
              </TabsTrigger>
              <TabsTrigger value="sealed" className="text-xs sm:text-sm">
                Sealed
              </TabsTrigger>
              <TabsTrigger value="slabs" className="text-xs sm:text-sm">
                Slabs
              </TabsTrigger>
            </TabsList>
            <div className="text-xs text-muted-foreground">
              Powered by TCGPlayer API • Last updated: Today at 9:00 AM
            </div>
          </div>

          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-8">
              {trendingCards.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 sm:p-3 border rounded-lg max-w-full overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={60}
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.set}</div>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold text-xs sm:text-sm">${item.currentPrice.toFixed(2)}</span>
                      <span
                        className={`ml-2 text-xs flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {trendingSealed.slice(0, 1).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 sm:p-3 border rounded-lg max-w-full overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={60}
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">Sealed Product</div>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold text-xs sm:text-sm">${item.currentPrice.toFixed(2)}</span>
                      <span
                        className={`ml-2 text-xs flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {trendingSlabs.slice(0, 1).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 sm:p-3 border rounded-lg max-w-full overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={60}
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">Graded Card</div>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold text-xs sm:text-sm">${item.currentPrice.toFixed(2)}</span>
                      <span
                        className={`ml-2 text-xs flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="singles" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-8">
              {trendingCards.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 sm:p-3 border rounded-lg max-w-full overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={60}
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.set}</div>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold text-xs sm:text-sm">${item.currentPrice.toFixed(2)}</span>
                      <span
                        className={`ml-2 text-xs flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sealed" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-8">
              {trendingSealed.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 sm:p-3 border rounded-lg max-w-full overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={60}
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">Sealed Product</div>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold text-xs sm:text-sm">${item.currentPrice.toFixed(2)}</span>
                      <span
                        className={`ml-2 text-xs flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="slabs" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-8">
              {trendingSlabs.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 sm:p-3 border rounded-lg max-w-full overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={60}
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">Graded Card</div>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold text-xs sm:text-sm">${item.currentPrice.toFixed(2)}</span>
                      <span
                        className={`ml-2 text-xs flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(item.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
