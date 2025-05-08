"use client"

import { useState, useEffect } from "react"
import { createClient } from "@wix/sdk"
import { products } from "@wix/stores"
import { OAuthStrategy } from "@wix/sdk"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CategorySidebar from "@/components/category-sidebar"

interface CategoryClientPageProps {
  slug: string
}

export default function CategoryClientPage({ slug }: CategoryClientPageProps) {
  const [categoryProducts, setCategoryProducts] = useState<any[]>([])
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useWixEcommerce()
  const [addingToCart, setAddingToCart] = useState<Record<string, boolean>>({})
  const [sortOption, setSortOption] = useState("recommended")
  const [debug, setDebug] = useState<any>(null)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true)

        // Create Wix client
        const wixClient = createClient({
          modules: { products },
          auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
          }),
        })

        // First, get all categories to find the one matching our slug
        const categoriesResponse = await wixClient.products.queryProductCategories().find()

        // Format the category name from the slug for comparison
        const formattedSlug = slug.replace(/-/g, " ")

        // Find the category that matches our slug
        const category = categoriesResponse.items.find(
          (cat) => cat.name.toLowerCase() === formattedSlug.toLowerCase() || cat.slug === slug,
        )

        if (!category) {
          throw new Error(`Category not found: ${slug}`)
        }

        setCategoryName(category.name)

        // Now fetch products for this category
        const productsResponse = await wixClient.products
          .queryProducts({
            filter: {
              categoryIds: {
                $hasSome: [category._id],
              },
            },
            limit: 100,
          })
          .find()

        // Save the first product for debugging
        if (productsResponse.items.length > 0) {
          setDebug(productsResponse.items[0])
        }

        setCategoryProducts(productsResponse.items)
      } catch (err) {
        console.error("Error fetching category data:", err)
        setError(`Failed to load category: ${err instanceof Error ? err.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [slug])

  const handleAddToCart = async (productId: string) => {
    try {
      setAddingToCart((prev) => ({ ...prev, [productId]: true }))
      await addToCart(productId, 1)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setAddingToCart((prev) => ({ ...prev, [productId]: false }))
    }
  }

  const sortProducts = (option: string) => {
    setSortOption(option)

    const sortedProducts = [...categoryProducts]

    switch (option) {
      case "price-low":
        sortedProducts.sort((a, b) => {
          const priceA = a.price?.amount || 0
          const priceB = b.price?.amount || 0
          return priceA - priceB
        })
        break
      case "price-high":
        sortedProducts.sort((a, b) => {
          const priceA = a.price?.amount || 0
          const priceB = b.price?.amount || 0
          return priceB - priceA
        })
        break
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      // Default is recommended (no sorting)
    }

    setCategoryProducts(sortedProducts)
  }

  // Helper function to format price if not already formatted
  const formatPrice = (price: any) => {
    if (!price) return "$0.00"

    if (price.formatted) return price.formatted

    if (typeof price.amount === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.amount)
    }

    return "$0.00"
  }

  // Helper function to get product image URL
  const getProductImageUrl = (product: any) => {
    // Check for mainMedia first
    if (product.media?.mainMedia?.image?.url) {
      return product.media.mainMedia.image.url
    }

    // Check for media items array
    if (product.media?.items && product.media.items.length > 0) {
      const firstImage = product.media.items.find((item: any) => item.image?.url)
      if (firstImage?.image?.url) {
        return firstImage.image.url
      }
    }

    // Check for coverPhoto
    if (product.coverPhoto?.url) {
      return product.coverPhoto.url
    }

    // Fallback
    return "/placeholder.svg"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <CategorySidebar currentSlug={slug} />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{categoryName}</span>
          </div>

          {/* Category title */}
          <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

          {/* Sort and product count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
              {categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Sort by:{" "}
                  {sortOption === "recommended"
                    ? "Recommended"
                    : sortOption === "price-low"
                      ? "Price: Low to High"
                      : sortOption === "price-high"
                        ? "Price: High to Low"
                        : sortOption === "name-asc"
                          ? "Name: A to Z"
                          : "Name: Z to A"}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => sortProducts("recommended")}>Recommended</DropdownMenuItem>
                <DropdownMenuItem onClick={() => sortProducts("price-low")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => sortProducts("price-high")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => sortProducts("name-asc")}>Name: A to Z</DropdownMenuItem>
                <DropdownMenuItem onClick={() => sortProducts("name-desc")}>Name: Z to A</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Products grid */}
          {categoryProducts.length === 0 ? (
            <div className="text-center py-10">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="aspect-square relative">
                      <Image
                        src={getProductImageUrl(product) || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/products/${product.slug}`} className="block">
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xl font-bold mb-3">{formatPrice(product.price)}</p>
                    <Button
                      onClick={() => handleAddToCart(product._id)}
                      disabled={addingToCart[product._id]}
                      className="w-full bg-black hover:bg-gray-800 text-white"
                    >
                      {addingToCart[product._id] ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Debug section - only visible during development */}
          {process.env.NODE_ENV === "development" && debug && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md">
              <h3 className="font-bold mb-2">Debug - First Product Structure:</h3>
              <pre className="text-xs overflow-auto max-h-96">{JSON.stringify(debug, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
