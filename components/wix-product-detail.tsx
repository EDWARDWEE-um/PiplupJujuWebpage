"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart } from "lucide-react"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import { toast } from "@/hooks/use-toast"

interface WixProductDetailProps {
  product: any
}

export default function WixProductDetail({ product }: WixProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useWixEcommerce()

  // Set default selected options
  useState(() => {
    if (product?.productOptions && product.productOptions.length > 0) {
      const defaultOptions: Record<string, string> = {}
      product.productOptions.forEach((option: any) => {
        if (option.choices && option.choices.length > 0) {
          defaultOptions[option.name] = option.choices[0]._id
        }
      })
      setSelectedOptions(defaultOptions)
    }

    // Set default selected image
    if (product?.media?.mainMedia?.image?.url) {
      setSelectedImage(product.media.mainMedia.image.url)
    } else if (product?.media?.items && product.media.items.length > 0) {
      setSelectedImage(product.media.items[0].image.url)
    }
  })

  const handleOptionChange = (optionName: string, choiceId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: choiceId,
    }))
  }

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true)
      console.log("Adding to cart:", {
        productId: product._id,
        quantity,
        options: selectedOptions,
      })

      await addToCart(product._id, quantity, selectedOptions)

      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (!product) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  const mainImage = selectedImage || product.media?.mainMedia?.image?.url || "/placeholder.svg"
  const inStock = product.stock?.quantity > 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold mt-2">{product.price?.formatted?.price || "$0.00"}</p>
      </div>

      <div className="aspect-square relative rounded-lg overflow-hidden border">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {product.media?.items && product.media.items.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {product.media.items.map((item: any, index: number) => (
            <div
              key={index}
              className={`aspect-square relative rounded-lg overflow-hidden border cursor-pointer ${selectedImage === item.image.url ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedImage(item.image.url)}
            >
              <Image
                src={item.image.url || "/placeholder.svg"}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 20vw, 10vw"
              />
            </div>
          ))}
        </div>
      )}

      {product.description && (
        <Card>
          <CardContent className="p-4">
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
          </CardContent>
        </Card>
      )}

      {product.productOptions && product.productOptions.length > 0 && (
        <div className="space-y-4">
          {product.productOptions.map((option: any) => (
            <div key={option._id}>
              <label className="block text-sm font-medium mb-2">{option.name}</label>
              <Select
                value={selectedOptions[option.name] || ""}
                onValueChange={(value) => handleOptionChange(option.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${option.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {option.choices.map((choice: any) => (
                    <SelectItem key={choice._id} value={choice._id}>
                      {choice.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Qty" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="flex-1" onClick={handleAddToCart} disabled={!inStock || isAddingToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAddingToCart ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>

      {product.additionalInfo && Object.keys(product.additionalInfo).length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(product.additionalInfo).map(([key, value]) => (
                <div key={key}>
                  <p className="font-medium text-muted-foreground">{key}</p>
                  <p>{String(value)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
