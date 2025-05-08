"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import { Filter, ShoppingCart } from "lucide-react"
import { myWixClient } from "@/lib/wix-ecommerce"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import { toast } from "@/hooks/use-toast"

export default function SealedProductsClientPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useWixEcommerce()

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("🔍 Fetching sealed products...")
        setLoading(true)
        setError(null)

        // Query products with category filter for sealed products
        const response = await myWixClient.products
          .queryProducts({
            // You might need to adjust this filter based on your actual category ID
            // filter: { categoryIds: { $hasSome: ["sealed-products"] } },
            limit: 100,
          })
          .find()
          .catch((err) => {
            console.error("Wix API error:", err)
            throw new Error(`Failed to fetch products: ${err.message || "Unknown error"}`)
          })

        if (!response || !response.items) {
          console.error("❌ No products found in response:", response)
          throw new Error("No products found")
        }

        console.log(`✅ Successfully fetched ${response.items.length} sealed products`)

        // Log each product's key details
        response.items.forEach((product, index) => {
          console.log(`Product ${index + 1}:`, {
            id: product._id,
            name: product.name,
            slug: product.slug,
            price: product.price?.formatted?.price,
            stock: product.stock?.quantity,
            hasMedia: !!product.media?.mainMedia?.image?.url,
          })
        })

        // Log the full products array for detailed debugging
        console.log("📦 Full products data:", JSON.parse(JSON.stringify(response.items)))

        setProducts(response.items)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        console.error("❌ Error fetching products:", errorMessage)
        setError(errorMessage)
        toast({
          title: "Error",
          description: `Failed to load products: ${errorMessage}`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Stop event propagation

    try {
      console.log(`🛒 Adding product ${productId} to cart...`)
      await addToCart(productId, 1)
      console.log(`✅ Successfully added product ${productId} to cart`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("❌ Error adding to cart:", errorMessage)
      toast({
        title: "Error",
        description: `Failed to add to cart: ${errorMessage}`,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  console.log(`🖥️ Rendering ${products.length} sealed products`)

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

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {products.map((product) => (
                <Link key={product._id} href={`/products/sealed/${product.slug}`}>
                  <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                    <div className="relative">
                      <Image
                        src={
                          product.media?.mainMedia?.image?.url ||
                          "/placeholder.svg?height=300&width=300&query=pokemon sealed product" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-cover w-full aspect-square"
                      />
                      {product.stock?.quantity === 0 && (
                        <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-2 sm:p-4">
                      <h3 className="font-semibold text-xs sm:text-base line-clamp-2">{product.name}</h3>
                      {product.description && (
                        <div
                          className="text-muted-foreground text-xs sm:text-sm line-clamp-2 product-description"
                          dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                      )}
                      {!product.description && (
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                          Pokemon TCG Sealed Product
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="p-2 sm:p-4 pt-0 flex justify-between items-center">
                      <p className="font-bold text-sm sm:text-base">{product.price?.formatted?.price || "$0.00"}</p>
                      <Button
                        size="sm"
                        className="h-8 text-xs sm:text-sm"
                        disabled={product.stock?.quantity === 0}
                        onClick={(e) => handleAddToCart(e, product._id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
