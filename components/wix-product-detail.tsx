"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart } from "lucide-react"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import type { ProductItem, ProductOption } from "@/lib/wix-ecommerce"

interface WixProductDetailProps {
  productId?: string
  productSlug?: string
}

export default function WixProductDetail({ productId, productSlug }: WixProductDetailProps) {
  const [product, setProduct] = useState<ProductItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [selectedImage, setSelectedImage] = useState<string>("")
  const { fetchProduct, addToCart } = useWixEcommerce()

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      try {
        let productData: ProductItem

        if (productSlug) {
          productData = await fetchProduct(productSlug, true)
        } else if (productId) {
          productData = await fetchProduct(productId)
        } else {
          throw new Error("Either productId or productSlug must be provided")
        }

        setProduct(productData)

        // Set default selected image
        if (productData.images.length > 0) {
          setSelectedImage(productData.images[0])
        }

        // Set default selected options
        if (productData.options && productData.options.length > 0) {
          const defaultOptions: Record<string, string> = {}
          productData.options.forEach((option) => {
            if (option.choices.length > 0) {
              defaultOptions[option.id] = option.choices[0].id
            }
          })
          setSelectedOptions(defaultOptions)
        }
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [productId, productSlug, fetchProduct])

  const handleOptionChange = (optionId: string, choiceId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: choiceId,
    }))
  }

  const handleAddToCart = async () => {
    if (!product) return
    await addToCart(product.id, quantity, selectedOptions)
  }

  if (isLoading) {
    return (
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
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <Image
            src={selectedImage || product.images[0] || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            width={600}
            height={600}
            className="object-contain w-full aspect-square"
          />
        </div>
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden cursor-pointer ${selectedImage === image ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
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
          {product.stock <= 0 ? (
            <Badge className="bg-red-500 mb-2">Out of Stock</Badge>
          ) : product.stock < 10 ? (
            <Badge className="bg-yellow-500 text-black mb-2">Low Stock</Badge>
          ) : (
            <Badge className="bg-green-500 mb-2">In Stock</Badge>
          )}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.additionalInfo?.["Set"] || "Pokemon TCG"}</p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-bold text-primary">{product.formattedPrice}</span>
          </div>
        </div>

        {product.description && (
          <div className="p-4 border rounded-lg">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
        )}

        {product.options && product.options.length > 0 && (
          <div className="space-y-4">
            {product.options.map((option: ProductOption) => (
              <div key={option.id} className="space-y-2">
                <Label>{option.name}</Label>
                <RadioGroup
                  value={selectedOptions[option.id] || ""}
                  onValueChange={(value) => handleOptionChange(option.id, value)}
                  className="flex flex-wrap gap-2"
                >
                  {option.choices.map((choice) => (
                    <div key={choice.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={choice.id} id={choice.id} />
                      <Label htmlFor={choice.id}>{choice.value}</Label>
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
                {Array.from({ length: Math.min(10, product.stock || 10) }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock <= 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
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
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
