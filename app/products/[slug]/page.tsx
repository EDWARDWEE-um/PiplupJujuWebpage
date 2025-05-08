"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import { myWixClient } from "@/lib/wix-ecommerce"
import { toast } from "@/hooks/use-toast"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [selectedImage, setSelectedImage] = useState<string>("")
  const { addToCart } = useWixEcommerce()

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true)
        setError(null)

        // Check if we have a valid slug
        if (!params.slug) {
          throw new Error("Product slug is missing")
        }

        // Try to fetch the product
        const response = await myWixClient.products
          .queryProducts({
            filter: { slug: { $eq: params.slug } },
            limit: 1,
          })
          .find()
          .catch((err) => {
            console.error("Wix API error:", err)
            throw new Error(`Failed to fetch product: ${err.message || "Unknown error"}`)
          })

        if (!response || !response.items || response.items.length === 0) {
          throw new Error(`Product with slug "${params.slug}" not found`)
        }

        const productData = response.items[0]
        setProduct(productData)

        // Set default selected image
        if (productData.media?.items && productData.media.items.length > 0) {
          setSelectedImage(productData.media.items[0].image.url)
        }

        // Set default selected options
        if (productData.productOptions && productData.productOptions.length > 0) {
          const defaultOptions: Record<string, string> = {}
          productData.productOptions.forEach((option: any) => {
            if (option.choices && option.choices.length > 0) {
              defaultOptions[option._id] = option.choices[0]._id
            }
          })
          setSelectedOptions(defaultOptions)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        console.error("Error loading product:", errorMessage)
        setError(errorMessage)
        toast({
          title: "Error",
          description: `Failed to load product: ${errorMessage}`,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  const handleOptionChange = (optionId: string, choiceId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: choiceId,
    }))
  }

  const handleAddToCart = async () => {
    if (!product) return
    try {
      await addToCart(product._id, quantity, selectedOptions)
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

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-6">
          <Link href="/products/sealed" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2 mb-4" />
              <Skeleton className="h-8 w-1/3" />
            </div>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-6">
          <Link href="/products/sealed" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error || "Product not found."}</p>
          <Button asChild>
            <Link href="/products/sealed">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <Link href="/products/sealed" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={
                selectedImage ||
                product.media?.mainMedia?.image?.url ||
                "/placeholder.svg?height=600&width=600&query=pokemon card"
              }
              alt={product.name}
              width={600}
              height={600}
              className="object-contain w-full aspect-square"
            />
          </div>
          {product.media?.items && product.media.items.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.media.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`border rounded-lg overflow-hidden cursor-pointer ${selectedImage === item.image.url ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedImage(item.image.url)}
                >
                  <Image
                    src={item.image.url || "/placeholder.svg?height=150&width=150&query=pokemon card thumbnail"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full aspect-square"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            {product.stock?.quantity === 0 ? (
              <Badge className="bg-red-500 mb-2">Out of Stock</Badge>
            ) : product.stock?.quantity < 10 ? (
              <Badge className="bg-yellow-500 text-black mb-2">Low Stock</Badge>
            ) : (
              <Badge className="bg-green-500 mb-2">In Stock</Badge>
            )}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.additionalInfo?.["Set"] || "Pokemon TCG"}</p>
            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold text-primary">{product.price?.formatted?.price || "$0.00"}</span>
            </div>
          </div>

          {product.description && (
            <div className="p-4 border rounded-lg">
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>
          )}

          {product.productOptions && product.productOptions.length > 0 && (
            <div className="space-y-4">
              {product.productOptions.map((option: any) => (
                <div key={option._id} className="space-y-2">
                  <Label>{option.name}</Label>
                  <RadioGroup
                    value={selectedOptions[option._id] || ""}
                    onValueChange={(value) => handleOptionChange(option._id, value)}
                    className="flex flex-wrap gap-2"
                  >
                    {option.choices.map((choice: any) => (
                      <div key={choice._id} className="flex items-center space-x-2">
                        <RadioGroupItem value={choice._id} id={choice._id} />
                        <Label htmlFor={choice._id}>{choice.value}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-24">
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.min(10, product.stock?.quantity || 10) }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock?.quantity === 0}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock?.quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          {product.additionalInfo && Object.keys(product.additionalInfo).length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="font-semibold">Product Details</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(product.additionalInfo).map(([key, value]) => (
                    <div key={key}>
                      <p className="font-medium text-gray-500">{key}</p>
                      <p>{String(value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
