"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getWixEcommerceService } from "@/lib/wix-ecommerce"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface CollectionSidebarProps {
  currentSlug?: string
}

export default function CollectionSidebar({ currentSlug }: CollectionSidebarProps) {
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        const ecommerceService = getWixEcommerceService()
        const collectionsData = await ecommerceService.getCollections()

        // Sort collections alphabetically
        const sortedCollections = collectionsData.sort((a: any, b: any) => a.name.localeCompare(b.name))

        setCollections(sortedCollections)
      } catch (err) {
        console.error("Error fetching collections:", err)
        setError("Failed to load collections")

        // Fallback to predefined categories
        setCollections([
          { _id: "singles", name: "Single Cards", slug: "single-cards" },
          { _id: "sealed", name: "Sealed Products", slug: "sealed" },
          { _id: "slabs", name: "Slabs", slug: "slabs" },
          { _id: "accessories", name: "Accessories", slug: "accessories" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Browse by</h2>
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error && collections.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Browse by</h2>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Browse by</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/products"
            className={cn("block py-1 hover:text-primary transition-colors", !currentSlug && "font-semibold")}
          >
            All Products
          </Link>
        </li>
        {collections.map((collection: any) => (
          <li key={collection._id}>
            <Link
              href={`/collection/${collection.slug || collection._id}`}
              className={cn(
                "block py-1 hover:text-primary transition-colors",
                currentSlug === collection.slug && "font-semibold",
              )}
            >
              {collection.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
