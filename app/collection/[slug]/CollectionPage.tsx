"use client"

import { useState, useEffect } from "react"
import { createClient } from "@wix/sdk"
import { collections } from "@wix/stores"
import { OAuthStrategy } from "@wix/sdk"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import { Loader2, ChevronDown, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CollectionPageProps {
  slug: string
}

// Map of collection slugs to their IDs
const COLLECTION_IDS: Record<string, string> = {
  "single-cards": "79c98108-cad3-465f-8483-0e4297b81547",
  // Add more collection IDs as you discover them
  "sealed-products": "", // Add the ID when you have it
  slabs: "", // Add the ID when you have it
}

// Map of collection slugs to their display names
const COLLECTION_NAMES: Record<string, string> = {
  "single-cards": "Single Cards",
  "sealed-products": "Sealed Products",
  slabs: "Slabs",
}

export default function CollectionPage({ slug }: CollectionPageProps) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [collectionName, setCollectionName] = useState("")
  const { addToCart } = useWixEcommerce()
  const [addingToCart, setAddingToCart] = useState<Record<string, boolean>>({})
  const [sortOption, setSortOption] = useState<string>("recommended")
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollectionProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        setDebugInfo(null)

        // Set collection name from our map or format from slug
        setCollectionName(
          COLLECTION_NAMES[slug] ||
            slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
        )

        // Create Wix client with proper modules
        const wixClient = createClient({
          modules: { products, collections },
          auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
          }),
        })

        // Check if we have a hard-coded ID for this collection
        const selectedCollectionId = "fc0615c7-1710-09e1-4275-674620f1fc35"

        const productsInCollection = await wixClient.products
          .queryProducts()
          .hasSome("collectionIds", [selectedCollectionId])
          .find()
        setProducts(productsInCollection.items)
      } catch (err) {
        console.error("Error in collection page:", err)
        setError("An unexpected error occurred. Please try again later.")
        setDebugInfo(`Unexpected error: ${err}`)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchCollectionProducts()
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

    // Safety check for products
    if (!products || products.length === 0) {
      return
    }

    const sortedProducts = [...products]

    switch (option) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price?.amount - b.price?.amount)
        break
      case "price-high":
        sortedProducts.sort((a, b) => b.price?.amount - a.price?.amount)
        break
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      // Default is recommended (no sorting)
      default:
        break
    }

    setProducts(sortedProducts)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-4">Collections</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collection/single-cards"
                  className={`block p-2 rounded hover:bg-gray-100 ${
                    slug === "single-cards" ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  Single Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/collection/sealed-products"
                  className={`block p-2 rounded hover:bg-gray-100 ${
                    slug === "sealed-products" ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  Sealed Products
                </Link>
              </li>
              <li>
                <Link
                  href="/collection/slabs"
                  className={`block p-2 rounded hover:bg-gray-100 ${slug === "slabs" ? "bg-gray-100 font-medium" : ""}`}
                >
                  Slabs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/collection" className="hover:text-foreground">
              Collections
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{collectionName}</span>
          </div>

          {/* Collection title */}
          <h1 className="text-3xl font-bold mb-6">{collectionName}</h1>

          {/* Error message */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Debug info - only in development */}
          {process.env.NODE_ENV === "development" && debugInfo && (
            <div className="mb-6 p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">Debug Information:</h3>
              <pre className="whitespace-pre-wrap text-xs">{debugInfo}</pre>
            </div>
          )}

          {/* Sort and product count */}
          {products && products.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
                {products.length} {products.length === 1 ? "product" : "products"}
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
          )}

          {/* Products grid */}
          {(!products || products.length === 0) && !error ? (
            <div className="text-center py-10">
              <p>No products found in this collection.</p>
              <Button asChild className="mt-4">
                <Link href="/">Browse All Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products &&
                products.map((product) => (
                  <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/products/${product.slug}`} className="block">
                      <div className="aspect-square relative">
                        {product.media?.mainMedia ? (
                          <Image
                            src={
                              product.media.mainMedia.image.url ||
                              "/placeholder.svg?height=300&width=300&query=Pokemon%20Card" ||
                              "/placeholder.svg"
                            }
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement
                              target.src = `/placeholder.svg?height=300&width=300&query=Pokemon%20Card`
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <Image
                              src={`/placeholder.svg?height=300&width=300&query=Pokemon%20Card`}
                              alt={product.name}
                              width={300}
                              height={300}
                              className="object-contain p-4"
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/products/${product.slug}`} className="block">
                        <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xl font-bold mb-3">
                        {product.price?.formatted?.price || product.priceData?.formatted?.price || "$0.00"}
                      </p>
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
        </div>
      </div>
    </div>
  )
}
