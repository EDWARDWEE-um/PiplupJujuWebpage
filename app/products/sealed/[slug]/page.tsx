"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import { getWixEcommerceService, type ProductItem } from "@/lib/wix-ecommerce"
import PriceChart from "@/components/price-chart"
import RipOrShipOption from "@/components/rip-or-ship-option"
import MarketPriceInfo from "@/components/market-price-info"

export default function SealedProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<ProductItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useWixEcommerce()

  // Create a unique key for this component instance based on the slug
  const componentKey = `sealed-product-${params.slug}`

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        console.log(`Page component: Fetching sealed product with slug: ${params.slug}`)

        // Get a fresh instance of the service
        const wixService = getWixEcommerceService()

        // Use the dedicated method to fetch by slug
        const productData = await wixService.getProductBySlug(params.slug)

        console.log(`Page component: Sealed product data received:`, {
          id: productData.id,
          name: productData.name,
          slug: productData.slug,
          price: productData.price,
          formattedPrice: productData.formattedPrice,
          stock: productData.stock,
          images: productData.images?.length,
          categoryIds: productData.categoryIds,
          collectionIds: productData.collectionIds,
        })

        // Log the full mapped product object
        console.log("Page component: Full mapped product data:", JSON.stringify(productData, null, 2))

        setProduct(productData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        console.error("Error fetching product:", errorMessage)
        setError(errorMessage)
        toast({
          title: "Error",
          description: `Failed to load product: ${errorMessage}`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug]) // Re-fetch when slug changes

  const handleAddToCart = async () => {
    try {
      if (!product) return

      await addToCart(product.id, quantity)
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("Error adding to cart:", errorMessage)
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
        <div className="mb-6">
          <Link
            href="/products/sealed"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Sealed Products
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Link
            href="/products/sealed"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Sealed Products
          </Link>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The requested product could not be found."}</p>
          <Button asChild>
            <Link href="/products/sealed">Browse All Sealed Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Extract product details
  const productName = product.name
  const productDescription = product.description || "No description available"
  const productPrice = product.formattedPrice || "$0.00"
  const productImages = product.images || []
  const mainImage = productImages[0] || "/placeholder.svg?key=zxjk5"
  const inStock = product.stock > 0
  const stockQuantity = product.stock || 0

  // Mock data for market prices and other details
  const marketPrices = {
    tcgplayer: Number.parseFloat(product.price.toString() || "0") * 1.05,
    lowest: Number.parseFloat(product.price.toString() || "0") * 0.95,
    highest: Number.parseFloat(product.price.toString() || "0") * 1.15,
  }

  // Extract product details from custom fields
  const additionalInfo = product.additionalInfo || {}
  const productDetails = {
    set: additionalInfo.set || "Unknown Set",
    releaseDate: additionalInfo.releaseDate || "Unknown",
    packsPerBox: additionalInfo.packsPerBox || "Unknown",
    cardsPerPack: additionalInfo.cardsPerPack || "Unknown",
    productType: additionalInfo.productType || "Sealed Product",
    manufacturer: additionalInfo.manufacturer || "The Pokémon Company",
    ripOrShipEligible: additionalInfo.ripOrShipEligible === true || false,
  }

  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12" key={componentKey}>
      <div className="mb-6">
        <Link href="/products/sealed" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Sealed Products
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* Product Images */}
        <div className="space-y-3 sm:space-y-4">
          <div className="border rounded-lg overflow-hidden bg-white">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={productName}
              width={600}
              height={600}
              className="object-contain w-full aspect-square"
              priority
            />
          </div>
          {productImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productImages.slice(0, 4).map((image: string, index: number) => (
                <div key={index} className="border rounded-lg overflow-hidden bg-white cursor-pointer">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${productName} ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-contain w-full aspect-square"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm">
                {productDetails.set}
              </Badge>
              {productDetails.ripOrShipEligible && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm">Rip or Ship</Badge>
              )}
              {!inStock && (
                <Badge variant="outline" className="text-xs sm:text-sm">
                  Out of Stock
                </Badge>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{productName}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-lg sm:text-xl font-bold">{productPrice}</div>
              <MarketPriceInfo
                tcgplayerPrice={marketPrices.tcgplayer}
                lowestPrice={marketPrices.lowest}
                highestPrice={marketPrices.highest}
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-full max-w-[80px] sm:max-w-[100px]">
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                  <SelectTrigger className="h-9 sm:h-10">
                    <SelectValue placeholder="Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="flex-1 h-9 sm:h-10 text-sm sm:text-base"
                onClick={handleAddToCart}
                disabled={!inStock || stockQuantity === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            {productDetails.ripOrShipEligible && <RipOrShipOption productId={product.id} />}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm sm:text-base">Product Details</h3>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              {productDetails.packsPerBox !== "Unknown" && <li>{productDetails.packsPerBox} booster packs per box</li>}
              {productDetails.cardsPerPack !== "Unknown" && <li>{productDetails.cardsPerPack} cards per pack</li>}
              <li>{productDetails.set}</li>
              <li>Official Pokemon TCG product</li>
              {productDetails.releaseDate !== "Unknown" && <li>Release Date: {productDetails.releaseDate}</li>}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm sm:text-base">Description</h3>
            <div
              className="text-xs sm:text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: productDescription }}
            />
          </div>

          <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <div className="text-xs sm:text-sm">
              Earn <span className="font-medium">300</span> loyalty points with this purchase!
              {productDetails.ripOrShipEligible && (
                <span className="text-xs block text-muted-foreground">Double points when you choose Rip or Ship</span>
              )}
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
                <PriceChart productType="sealed" productId={product.id} />
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
