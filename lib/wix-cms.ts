/**
 * Wix Headless CMS Integration
 *
 * This service provides utilities for fetching content from Wix Headless CMS
 * and integrating it with our Next.js application.
 */

// Types for Wix CMS data structures
export interface WixCmsItem {
  id: string
  title: string
  slug: string
  content: any
  createdDate: string
  updatedDate: string
  publishDate: string
  status: "published" | "draft"
  [key: string]: any
}

export interface WixCmsCollection {
  id: string
  name: string
  slug: string
  items: WixCmsItem[]
}

export interface WixCmsQueryOptions {
  limit?: number
  offset?: number
  sort?: {
    field: string
    order: "asc" | "desc"
  }
  filter?: Record<string, any>
}

// Wix CMS client
export class WixCmsClient {
  private apiKey: string
  private siteId: string
  private baseUrl = "https://www.wixapis.com/cms/v3"

  constructor(apiKey: string, siteId: string) {
    this.apiKey = apiKey
    this.siteId = siteId
  }

  // Authentication headers for Wix API requests
  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "wix-site-id": this.siteId,
      "Content-Type": "application/json",
    }
  }

  // Fetch a collection by ID or slug
  async getCollection(idOrSlug: string): Promise<WixCmsCollection> {
    try {
      const isId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug)
      const endpoint = isId ? `${this.baseUrl}/collections/${idOrSlug}` : `${this.baseUrl}/collections?slug=${idOrSlug}`

      const response = await fetch(endpoint, {
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch collection: ${response.statusText}`)
      }

      const data = await response.json()
      return isId ? data : data.collections[0]
    } catch (error) {
      console.error("Error fetching collection from Wix CMS:", error)
      throw error
    }
  }

  // Fetch items from a collection
  async getItems(collectionIdOrSlug: string, options: WixCmsQueryOptions = {}): Promise<WixCmsItem[]> {
    try {
      // First get the collection to ensure we have the ID
      const collection = await this.getCollection(collectionIdOrSlug)

      // Build query parameters
      const queryParams = new URLSearchParams()
      if (options.limit) queryParams.append("limit", options.limit.toString())
      if (options.offset) queryParams.append("offset", options.offset.toString())
      if (options.sort) {
        queryParams.append("sort", options.sort.field)
        queryParams.append("order", options.sort.order)
      }

      // Add filters if provided
      let filterParam = ""
      if (options.filter) {
        filterParam = JSON.stringify(options.filter)
        queryParams.append("filter", filterParam)
      }

      const endpoint = `${this.baseUrl}/collections/${collection.id}/items?${queryParams.toString()}`

      const response = await fetch(endpoint, {
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.statusText}`)
      }

      const data = await response.json()
      return data.items
    } catch (error) {
      console.error("Error fetching items from Wix CMS:", error)
      throw error
    }
  }

  // Fetch a single item by ID or slug
  async getItem(collectionIdOrSlug: string, itemIdOrSlug: string): Promise<WixCmsItem> {
    try {
      // First get the collection to ensure we have the ID
      const collection = await this.getCollection(collectionIdOrSlug)

      const isId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(itemIdOrSlug)
      const endpoint = isId
        ? `${this.baseUrl}/collections/${collection.id}/items/${itemIdOrSlug}`
        : `${this.baseUrl}/collections/${collection.id}/items?slug=${itemIdOrSlug}`

      const response = await fetch(endpoint, {
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch item: ${response.statusText}`)
      }

      const data = await response.json()
      return isId ? data : data.items[0]
    } catch (error) {
      console.error("Error fetching item from Wix CMS:", error)
      throw error
    }
  }
}

// Create a singleton instance with environment variables
let wixCmsClient: WixCmsClient | null = null

export function getWixCmsClient(): WixCmsClient {
  if (!wixCmsClient) {
    // Use hardcoded demo values instead of environment variables
    const apiKey = "demo_api_key"
    const siteId = "demo_site_id"

    wixCmsClient = new WixCmsClient(apiKey, siteId)
  }

  return wixCmsClient
}

// Helper hooks for React components
export async function fetchBlogPosts(limit = 10, offset = 0) {
  const client = getWixCmsClient()
  return client.getItems("blog", {
    limit,
    offset,
    sort: { field: "publishDate", order: "desc" },
    filter: { status: "published" },
  })
}

export async function fetchNewsletters(limit = 10, offset = 0) {
  const client = getWixCmsClient()
  return client.getItems("newsletters", {
    limit,
    offset,
    sort: { field: "publishDate", order: "desc" },
    filter: { status: "published" },
  })
}

export async function fetchProductUpdates(limit = 10, offset = 0) {
  const client = getWixCmsClient()
  return client.getItems("product-updates", {
    limit,
    offset,
    sort: { field: "publishDate", order: "desc" },
    filter: { status: "published" },
  })
}
