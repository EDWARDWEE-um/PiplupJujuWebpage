"use client"

import { myWixClient } from "./wix-ecommerce"

export interface WixCollection {
  _id: string
  name: string
  slug?: string
  description?: string
  image?: {
    url: string
  }
}

export async function getAllCollections(): Promise<WixCollection[]> {
  try {
    // Query all collections
    const response = await myWixClient.collections.queryCollections()

    // Log for debugging
    console.log("Collections response:", response)

    return response.items || []
  } catch (error) {
    console.error("Error fetching collections:", error)
    return []
  }
}

export async function getProductsByCollectionName(collectionName: string) {
  try {
    // Step 1: Get all collections
    const collections = await getAllCollections()
    console.log(`Found ${collections.length} collections`)

    // Step 2: Find the collection by name (case insensitive)
    const collection = collections.find((c) => c.name.toLowerCase() === collectionName.toLowerCase())

    if (!collection) {
      console.log(`Collection "${collectionName}" not found`)
      return []
    }

    console.log(`Found collection: ${collection.name} with ID: ${collection._id}`)

    // Step 3: Query products by collection ID
    const response = await myWixClient.products.queryProducts({
      filter: {
        collectionIds: {
          $hasSome: [collection._id],
        },
      },
      // You can add pagination here
      limit: 100,
    })

    console.log(`Found ${response.items.length} products in collection "${collectionName}"`)
    return response.items
  } catch (error) {
    console.error(`Error fetching products for collection "${collectionName}":`, error)
    return []
  }
}

export async function getProductsByCollectionSlug(slug: string) {
  try {
    // Step 1: Get all collections
    const collections = await getAllCollections()

    // Format the slug for comparison
    const formattedSlug = slug.toLowerCase().replace(/-/g, " ")

    // Step 2: Find the collection by slug or name
    const collection = collections.find(
      (c) => (c.slug && c.slug.toLowerCase() === slug.toLowerCase()) || c.name.toLowerCase() === formattedSlug,
    )

    if (!collection) {
      console.log(`Collection with slug "${slug}" not found`)

      // Try to find a collection that contains the slug words
      const slugWords = formattedSlug.split(" ")
      const partialMatch = collections.find((c) =>
        slugWords.some((word) => c.name.toLowerCase().includes(word) && word.length > 3),
      )

      if (partialMatch) {
        console.log(`Found partial match: ${partialMatch.name}`)

        // Query products by collection ID
        const response = await myWixClient.products.queryProducts({
          filter: {
            collectionIds: {
              $hasSome: [partialMatch._id],
            },
          },
          limit: 100,
        })

        return response.items
      }

      return []
    }

    console.log(`Found collection: ${collection.name} with ID: ${collection._id}`)

    // Step 3: Query products by collection ID
    const response = await myWixClient.products.queryProducts({
      filter: {
        collectionIds: {
          $hasSome: [collection._id],
        },
      },
      limit: 100,
    })

    return response.items
  } catch (error) {
    console.error(`Error fetching products for collection slug "${slug}":`, error)
    return []
  }
}

// Function to get products by direct collection ID
export async function getProductsByCollectionId(collectionId: string) {
  try {
    const response = await myWixClient.products.queryProducts({
      filter: {
        collectionIds: {
          $hasSome: [collectionId],
        },
      },
      limit: 100,
    })

    return response.items
  } catch (error) {
    console.error(`Error fetching products for collection ID "${collectionId}":`, error)
    return []
  }
}
