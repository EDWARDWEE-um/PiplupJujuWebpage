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
import { Filter, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Single Cards | PokéCollect",
  description: "Browse our collection of Pokemon TCG single cards.",
}

export default function SingleCardsPage() {
  const products = [
    {
      id: 1,
      name: "Charizard VMAX",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Darkness Ablaze",
      rarity: "Ultra Rare",
      badge: "Popular",
      marketPrice: 94.99,
    },
    {
      id: 2,
      name: "Pikachu V Full Art",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Vivid Voltage",
      rarity: "Ultra Rare",
      marketPrice: 27.99,
    },
    {
      id: 3,
      name: "Mewtwo V Alt Art",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Paldean Fates",
      rarity: "Secret Rare",
      badge: "Hot",
      marketPrice: 139.99,
    },
    {
      id: 4,
      name: "Lugia V Alt Art",
      price: 189.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Silver Tempest",
      rarity: "Secret Rare",
      badge: "Rare",
      marketPrice: 199.99,
    },
    {
      id: 5,
      name: "Mew VMAX Rainbow",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Fusion Strike",
      rarity: "Secret Rare",
      marketPrice: 52.99,
    },
    {
      id: 6,
      name: "Gardevoir ex",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Scarlet & Violet",
      rarity: "Ultra Rare",
      marketPrice: 18.99,
    },
    {
      id: 7,
      name: "Rayquaza VMAX Alt Art",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Evolving Skies",
      rarity: "Secret Rare",
      badge: "Rare",
      marketPrice: 259.99,
    },
    {
      id: 8,
      name: "Umbreon VMAX Alt Art",
      price: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Evolving Skies",
      rarity: "Secret Rare",
      badge: "Rare",
      marketPrice: 319.99,
    },
    {
      id: "blaziken-vmax-alt",
      name: "Blaziken VMAX (Alternate Art Secret)",
      set: "SWSH06: Chilling Reign",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=300",
      link: "/products/singles/blaziken-vmax-alt",
    },
  ]

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Reset
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <Slider defaultValue={[0, 300]} max={500} step={1} />
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="h-8" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="h-8" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Rarity</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="common" />
                  <Label htmlFor="common">Common</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="uncommon" />
                  <Label htmlFor="uncommon">Uncommon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rare" />
                  <Label htmlFor="rare">Rare</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ultra-rare" />
                  <Label htmlFor="ultra-rare">Ultra Rare</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="secret-rare" />
                  <Label htmlFor="secret-rare">Secret Rare</Label>
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
                  <Checkbox id="paldean-fates" />
                  <Label htmlFor="paldean-fates">Paldean Fates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evolving-skies" />
                  <Label htmlFor="evolving-skies">Evolving Skies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="silver-tempest" />
                  <Label htmlFor="silver-tempest">Silver Tempest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fusion-strike" />
                  <Label htmlFor="fusion-strike">Fusion Strike</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="darkness-ablaze" />
                  <Label htmlFor="darkness-ablaze">Darkness Ablaze</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Card Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pokemon" />
                  <Label htmlFor="pokemon">Pokémon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trainer" />
                  <Label htmlFor="trainer">Trainer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="energy" />
                  <Label htmlFor="energy">Energy</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Condition</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mint" />
                  <Label htmlFor="mint">Mint</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="near-mint" />
                  <Label htmlFor="near-mint">Near Mint</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="excellent" />
                  <Label htmlFor="excellent">Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="good" />
                  <Label htmlFor="good">Good</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Single Cards</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-8 lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="featured">
                <SelectTrigger className="w-full sm:w-[180px] h-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/singles/${product.id}`}>
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
                      <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                        {product.badge}
                      </Badge>
                    )}
                    {product.marketPrice !== product.price && (
                      <Badge
                        className={`absolute top-2 left-2 ${product.marketPrice > product.price ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {product.marketPrice > product.price
                          ? `${Math.round(((product.marketPrice - product.price) / product.marketPrice) * 100)}% Below Market`
                          : `${Math.round(((product.price - product.marketPrice) / product.marketPrice) * 100)}% Above Market`}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {product.set} · {product.rarity}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                    <Button size="sm">Add to Cart</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Watch Us on TikTok!</h2>
        <p className="text-gray-700">
          Follow our TikTok channel for live pack openings, card pulls, and market updates on the latest Pokémon TCG
          releases!
        </p>
      </div>
    </div>
  )
}
