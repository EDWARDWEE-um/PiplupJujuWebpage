import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Sealed Products | PokéCollect",
  description: "Browse our collection of sealed Pokemon TCG products.",
}

export default function SealedProductsPage() {
  const products = [
    {
      id: 1,
      name: "Scarlet & Violet Booster Box",
      price: 149.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Booster Box",
      set: "Scarlet & Violet",
      badge: "New Release",
    },
    {
      id: 2,
      name: "Pokemon Center ETB",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Elite Trainer Box",
      set: "Scarlet & Violet",
      badge: "Limited",
    },
    {
      id: 3,
      name: "Paradox Rift Booster Box",
      price: 159.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Booster Box",
      set: "Scarlet & Violet",
      badge: "Pre-order",
    },
    {
      id: 4,
      name: "Crown Zenith ETB",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Elite Trainer Box",
      set: "Sword & Shield",
    },
    {
      id: 5,
      name: "Paldean Fates Booster Box",
      price: 169.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Booster Box",
      set: "Scarlet & Violet",
      badge: "Pre-order",
    },
    {
      id: 6,
      name: "Obsidian Flames Booster Box",
      price: 144.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Booster Box",
      set: "Scarlet & Violet",
    },
    {
      id: 7,
      name: "Celebrations Ultra-Premium Collection",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Premium Collection",
      set: "Celebrations",
      badge: "Rare",
    },
    {
      id: 8,
      name: "Brilliant Stars Booster Box",
      price: 139.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Booster Box",
      set: "Sword & Shield",
    },
  ]

  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
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

            <div>
              <h3 className="font-medium mb-2">Set</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="scarlet-violet" />
                  <Label htmlFor="scarlet-violet">Scarlet & Violet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sword-shield" />
                  <Label htmlFor="sword-shield">Sword & Shield</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="celebrations" />
                  <Label htmlFor="celebrations">Celebrations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sun-moon" />
                  <Label htmlFor="sun-moon">Sun & Moon</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" />
                  <Label htmlFor="in-stock">In Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pre-order" />
                  <Label htmlFor="pre-order">Pre-order</Label>
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
              <Link key={product.id} href={`/products/sealed/${product.id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full aspect-square"
                    />
                    {product.badge && (
                      <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-600 text-black">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-2 sm:p-4">
                    <h3 className="font-semibold text-xs sm:text-base line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {product.category} · {product.set}
                    </p>
                  </CardContent>
                  <CardFooter className="p-2 sm:p-4 pt-0 flex justify-between items-center">
                    <p className="font-bold text-sm sm:text-base">${product.price.toFixed(2)}</p>
                    <Button size="sm" className="h-8 text-xs sm:text-sm">
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
