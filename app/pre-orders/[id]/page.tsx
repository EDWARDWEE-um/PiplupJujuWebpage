import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, ShoppingCart, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Paradox Rift Booster Box Pre-Order | PokéCollect",
  description: "Pre-order the upcoming Paradox Rift Booster Box for the Pokemon TCG.",
}

export default function PreOrderDetailPage({ params }: { params: { id: string } }) {
  // Mock product data based on ID
  const product = {
    id: params.id,
    name: "Paradox Rift Booster Box",
    price: 159.99,
    originalPrice: 179.99,
    discount: 10,
    image: "/placeholder.svg?height=600&width=600",
    releaseDate: "November 3, 2023",
    category: "Booster Box",
    set: "Scarlet & Violet",
    badge: "Popular",
    description:
      "The Pokémon TCG: Scarlet & Violet—Paradox Rift expansion introduces more Ancient and Future Pokémon, including Roaring Moon ex, Iron Valiant ex, and Walking Wake ex. This booster box contains 36 booster packs, each with 10 cards and at least one rare card per pack.",
    features: [
      "36 booster packs per box",
      "10 cards per pack",
      "Introduces Ancient and Future Pokémon",
      "Features Roaring Moon ex, Iron Valiant ex, and Walking Wake ex",
      "Includes Tera Pokémon ex and Tera Pokémon",
    ],
    bonuses: [
      "Exclusive card sleeves with pre-order",
      "Double loyalty points",
      "Early shipping (1-2 days before release)",
    ],
    stock: 25,
    thumbnails: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
  }

  const releaseDate = new Date(product.releaseDate)
  const today = new Date()
  const daysUntilRelease = Math.ceil((releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="mb-4">
        <Link href="/pre-orders" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Pre-Orders
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.thumbnails.map((thumb, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <Image
                  src={thumb || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={150}
                  height={150}
                  className="object-cover w-full aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">{product.badge}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Pre-Order
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {product.category} · {product.set}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
              {product.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</div>
              )}
              {product.discount && <Badge className="bg-green-500">{product.discount}% Off</Badge>}
            </div>
          </div>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-4 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">
                  Releasing on{" "}
                  {releaseDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {daysUntilRelease > 0 ? `${daysUntilRelease} days until release` : "Released today!"}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-24">
                <Select defaultValue="1">
                  <SelectTrigger>
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
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Pre-Order Now
              </Button>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Only {product.stock} left available for pre-order</span>
            </div>
          </div>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Pre-Order Bonuses</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ul className="space-y-2">
                {product.bonuses.map((bonus, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{bonus}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="policy">Pre-Order Policy</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <Card>
              <CardContent className="p-4 md:p-6">
                <p className="text-sm md:text-base">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <Card>
              <CardContent className="p-4 md:p-6">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="policy" className="mt-4">
            <Card>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Your card will be charged immediately when you place a pre-order. If the price changes before
                    release, you'll always get the lower price.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Cancellation</h3>
                  <p className="text-sm text-muted-foreground">
                    Pre-orders can be cancelled for a full refund up to 7 days before the release date. After that,
                    standard return policies apply.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Pre-orders are shipped as soon as we receive stock, often 1-2 days before the official release date.
                    Priority is given to earliest orders.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((id) => (
            <Link key={id} href={`/pre-orders/${id}`}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Related product"
                    width={200}
                    height={200}
                    className="object-cover w-full aspect-square"
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                    Pre-Order
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">Related Product {id}</h3>
                  <p className="text-sm font-bold mt-1">$149.99</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
