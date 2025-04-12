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
  title: "Graded Cards (Slabs) | PokéCollect",
  description: "Browse our collection of PSA, BGS, and CGC graded Pokemon cards.",
}

export default function SlabsPage() {
  const products = [
    {
      id: 1,
      name: "Charizard VMAX (PSA 10)",
      price: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Darkness Ablaze",
      grader: "PSA",
      grade: "10",
      badge: "Popular",
      marketPrice: 319.99,
    },
    {
      id: 2,
      name: "Pikachu V Full Art (BGS 9.5)",
      price: 149.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Vivid Voltage",
      grader: "BGS",
      grade: "9.5",
      marketPrice: 159.99,
    },
    {
      id: 3,
      name: "Mewtwo V Alt Art (PSA 10)",
      price: 499.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Paldean Fates",
      grader: "PSA",
      grade: "10",
      badge: "Rare",
      marketPrice: 529.99,
    },
    {
      id: 4,
      name: "Lugia V Alt Art (CGC 9.5)",
      price: 399.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Silver Tempest",
      grader: "CGC",
      grade: "9.5",
      badge: "Rare",
      marketPrice: 389.99,
    },
    {
      id: 5,
      name: "Charizard Base Set (PSA 7)",
      price: 1999.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Base Set",
      grader: "PSA",
      grade: "7",
      badge: "Vintage",
      marketPrice: 2099.99,
    },
    {
      id: 6,
      name: "Blastoise 1st Edition (PSA 8)",
      price: 2499.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Base Set",
      grader: "PSA",
      grade: "8",
      badge: "Vintage",
      marketPrice: 2599.99,
    },
    {
      id: 7,
      name: "Rayquaza VMAX Alt Art (PSA 10)",
      price: 899.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Evolving Skies",
      grader: "PSA",
      grade: "10",
      badge: "Rare",
      marketPrice: 949.99,
    },
    {
      id: 8,
      name: "Umbreon VMAX Alt Art (CGC 9)",
      price: 699.99,
      image: "/placeholder.svg?height=300&width=300",
      set: "Evolving Skies",
      grader: "CGC",
      grade: "9",
      badge: "Rare",
      marketPrice: 679.99,
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
                <Slider defaultValue={[0, 1000]} max={3000} step={10} />
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="h-8" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="h-8" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Grading Company</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="psa" />
                  <Label htmlFor="psa">PSA</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bgs" />
                  <Label htmlFor="bgs">BGS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cgc" />
                  <Label htmlFor="cgc">CGC</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sgc" />
                  <Label htmlFor="sgc">SGC</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Grade</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="grade-10" />
                  <Label htmlFor="grade-10">10 (Gem Mint)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="grade-9" />
                  <Label htmlFor="grade-9">9 (Mint)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="grade-8" />
                  <Label htmlFor="grade-8">8 (Near Mint-Mint)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="grade-7" />
                  <Label htmlFor="grade-7">7 (Near Mint)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="grade-below-7" />
                  <Label htmlFor="grade-below-7">Below 7</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Set</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="base-set" />
                  <Label htmlFor="base-set">Base Set</Label>
                </div>
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
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Card Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="vintage" />
                  <Label htmlFor="vintage">Vintage (Pre-2000)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="modern" />
                  <Label htmlFor="modern">Modern</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="alt-art" />
                  <Label htmlFor="alt-art">Alt Art</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="full-art" />
                  <Label htmlFor="full-art">Full Art</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Graded Cards (Slabs)</h1>
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
              <Link key={product.id} href={`/products/slabs/${product.id}`}>
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
                    <Badge className="absolute bottom-2 right-2 bg-primary">
                      {product.grader} {product.grade}
                    </Badge>
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
                    <p className="text-muted-foreground text-sm">{product.set}</p>
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
    </div>
  )
}
