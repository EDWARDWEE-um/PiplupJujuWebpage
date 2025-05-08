"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import type { ProductItem } from "@/lib/wix-ecommerce"

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
  const { addToCart, fetchProducts, fetchProductsByCategory, fetchProductsByCollection } = useWixEcommerce()

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        let productData: ProductItem[] = []

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

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Skeleton className="h-4 w-1/4" />
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
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden flex flex-col h-full">
          <Link href={`/products/${product.slug}`} className="relative h-48 overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </Link>
          <CardContent className="p-4 flex-grow">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              <h3 className="font-medium line-clamp-2">{product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="font-medium">{product.formattedPrice}</div>
            {showAddToCart && (
              <Button size="sm" onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
