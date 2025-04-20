"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import type { ProductItem } from "@/lib/wix-ecommerce"
import { Skeleton } from "@/components/ui/skeleton"

interface WixProductGridProps {
  categoryId?: string
  collectionId?: string
  limit?: number
  showAddToCart?: boolean
}

export default function WixProductGrid({
  categoryId,
  collectionId,
  limit = 12,
  showAddToCart = true,
}: WixProductGridProps) {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { fetchProducts, fetchProductsByCategory, fetchProductsByCollection, addToCart } = useWixEcommerce()

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        let productData: ProductItem[]

        if (categoryId) {
          productData = await fetchProductsByCategory(categoryId, limit)
        } else if (collectionId) {
          productData = await fetchProductsByCollection(collectionId, limit)
        } else {
          productData = await fetchProducts(limit)
        }

        setProducts(productData)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [categoryId, collectionId, limit, fetchProducts, fetchProductsByCategory, fetchProductsByCollection])

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    e.stopPropagation()
    await addToCart(productId, 1)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, index) => (
          <Card key={index} className="overflow-hidden h-full">
            <Skeleton className="w-full aspect-square" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-9 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.slug}`}>
          <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
            <div className="relative">
              <Image
                src={product.images[0] || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full aspect-square"
              />
              {product.stock <= 0 && (
                <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">Out of Stock</Badge>
              )}
              {product.stock > 0 && product.stock < 10 && (
                <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-black">Low Stock</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <p className="text-muted-foreground text-sm">{product.additionalInfo?.["Set"] || "Pokemon TCG"}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <p className="font-bold">{product.formattedPrice}</p>
              {showAddToCart && product.stock > 0 && (
                <Button size="sm" onClick={(e) => handleAddToCart(e, product.id)}>
                  Add to Cart
                </Button>
              )}
              {showAddToCart && product.stock <= 0 && (
                <Button size="sm" disabled>
                  Out of Stock
                </Button>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
