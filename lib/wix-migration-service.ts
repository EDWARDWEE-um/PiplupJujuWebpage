/**
 * Wix Migration Service
 *
 * This service provides utilities for migrating data from a Wix store to our application.
 * It handles products, categories, customers, orders, and other related data.
 */

// Types for Wix data structures
export interface WixProduct {
  id: string
  name: string
  description: string
  price: number
  sku: string
  stock: number
  images: string[]
  options: WixProductOption[]
  variants: WixProductVariant[]
  categoryIds: string[]
  slug: string
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  customFields: Record<string, string>
  createdDate: string
  updatedDate: string
}

export interface WixProductOption {
  id: string
  name: string
  choices: {
    id: string
    value: string
    description?: string
  }[]
}

export interface WixProductVariant {
  id: string
  sku: string
  price: number
  stock: number
  options: Record<string, string>
}

export interface WixCategory {
  id: string
  name: string
  description: string
  slug: string
  parentId?: string
  image?: string
}

export interface WixCustomer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses: WixAddress[]
  createdDate: string
}

export interface WixAddress {
  id: string
  name?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  country: string
  postalCode: string
  isDefault: boolean
}

export interface WixOrder {
  id: string
  customerId: string
  status: string
  paymentStatus: string
  fulfillmentStatus: string
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  items: WixOrderItem[]
  billingAddress: WixAddress
  shippingAddress: WixAddress
  createdDate: string
  updatedDate: string
}

export interface WixOrderItem {
  id: string
  productId: string
  variantId?: string
  name: string
  sku: string
  quantity: number
  price: number
  total: number
  options?: Record<string, string>
}

// Wix API client
export class WixApiClient {
  private apiKey: string
  private secretKey: string
  private baseUrl = "https://www.wixapis.com/stores/v1"

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey
    this.secretKey = secretKey
  }

  // Authentication headers for Wix API requests
  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "wix-site-id": this.secretKey,
      "Content-Type": "application/json",
    }
  }

  // Fetch products from Wix store
  async getProducts(): Promise<WixProduct[]> {
    try {
      // In a real implementation, this would make an API call to Wix
      // For demo purposes, we'll return mock data
      return mockProducts
    } catch (error) {
      console.error("Error fetching products from Wix:", error)
      throw error
    }
  }

  // Fetch categories from Wix store
  async getCategories(): Promise<WixCategory[]> {
    try {
      // In a real implementation, this would make an API call to Wix
      return mockCategories
    } catch (error) {
      console.error("Error fetching categories from Wix:", error)
      throw error
    }
  }

  // Fetch customers from Wix store
  async getCustomers(): Promise<WixCustomer[]> {
    try {
      // In a real implementation, this would make an API call to Wix
      return mockCustomers
    } catch (error) {
      console.error("Error fetching customers from Wix:", error)
      throw error
    }
  }

  // Fetch orders from Wix store
  async getOrders(): Promise<WixOrder[]> {
    try {
      // In a real implementation, this would make an API call to Wix
      return mockOrders
    } catch (error) {
      console.error("Error fetching orders from Wix:", error)
      throw error
    }
  }
}

// Migration service to handle the data transfer
export class WixMigrationService {
  private wixClient: WixApiClient

  constructor(apiKey: string, secretKey: string) {
    this.wixClient = new WixApiClient(apiKey, secretKey)
  }

  // Migrate all data from Wix to our application
  async migrateAll(progressCallback?: (progress: number, stage: string) => void): Promise<MigrationResult> {
    try {
      // Migrate categories first (they're needed for products)
      progressCallback?.(0, "categories")
      const categoriesResult = await this.migrateCategories()
      progressCallback?.(25, "products")

      // Migrate products
      const productsResult = await this.migrateProducts()
      progressCallback?.(50, "customers")

      // Migrate customers
      const customersResult = await this.migrateCustomers()
      progressCallback?.(75, "orders")

      // Migrate orders
      const ordersResult = await this.migrateOrders()
      progressCallback?.(100, "completed")

      return {
        success: true,
        categories: categoriesResult,
        products: productsResult,
        customers: customersResult,
        orders: ordersResult,
      }
    } catch (error) {
      console.error("Migration failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Migrate categories from Wix to our application
  async migrateCategories(): Promise<CategoryMigrationResult> {
    try {
      const wixCategories = await this.wixClient.getCategories()

      // In a real implementation, this would create categories in our database
      // For demo purposes, we'll just return the count

      return {
        success: true,
        total: wixCategories.length,
        migrated: wixCategories.length,
      }
    } catch (error) {
      console.error("Category migration failed:", error)
      return {
        success: false,
        total: 0,
        migrated: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Migrate products from Wix to our application
  async migrateProducts(): Promise<ProductMigrationResult> {
    try {
      const wixProducts = await this.wixClient.getProducts()

      // In a real implementation, this would create products in our database
      // For demo purposes, we'll just return the count

      return {
        success: true,
        total: wixProducts.length,
        migrated: wixProducts.length,
      }
    } catch (error) {
      console.error("Product migration failed:", error)
      return {
        success: false,
        total: 0,
        migrated: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Migrate customers from Wix to our application
  async migrateCustomers(): Promise<CustomerMigrationResult> {
    try {
      const wixCustomers = await this.wixClient.getCustomers()

      // In a real implementation, this would create customers in our database
      // For demo purposes, we'll just return the count

      return {
        success: true,
        total: wixCustomers.length,
        migrated: wixCustomers.length,
      }
    } catch (error) {
      console.error("Customer migration failed:", error)
      return {
        success: false,
        total: 0,
        migrated: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Migrate orders from Wix to our application
  async migrateOrders(): Promise<OrderMigrationResult> {
    try {
      const wixOrders = await this.wixClient.getOrders()

      // In a real implementation, this would create orders in our database
      // For demo purposes, we'll just return the count

      return {
        success: true,
        total: wixOrders.length,
        migrated: wixOrders.length,
      }
    } catch (error) {
      console.error("Order migration failed:", error)
      return {
        success: false,
        total: 0,
        migrated: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Generate URL redirects map for SEO
  async generateRedirectMap(): Promise<Record<string, string>> {
    try {
      const wixProducts = await this.wixClient.getProducts()
      const wixCategories = await this.wixClient.getCategories()

      const redirectMap: Record<string, string> = {}

      // Map product URLs
      wixProducts.forEach((product) => {
        redirectMap[`/product/${product.slug}`] = `/products/singles/${product.slug}`
      })

      // Map category URLs
      wixCategories.forEach((category) => {
        redirectMap[`/category/${category.slug}`] = `/products/${category.slug}`
      })

      return redirectMap
    } catch (error) {
      console.error("Failed to generate redirect map:", error)
      throw error
    }
  }
}

// Result types
export interface MigrationResult {
  success: boolean
  categories?: CategoryMigrationResult
  products?: ProductMigrationResult
  customers?: CustomerMigrationResult
  orders?: OrderMigrationResult
  error?: string
}

export interface CategoryMigrationResult {
  success: boolean
  total: number
  migrated: number
  error?: string
}

export interface ProductMigrationResult {
  success: boolean
  total: number
  migrated: number
  error?: string
}

export interface CustomerMigrationResult {
  success: boolean
  total: number
  migrated: number
  error?: string
}

export interface OrderMigrationResult {
  success: boolean
  total: number
  migrated: number
  error?: string
}

// Mock data for demo purposes
const mockCategories: WixCategory[] = [
  {
    id: "cat1",
    name: "Sealed Products",
    description: "Sealed Pokemon TCG products",
    slug: "sealed-products",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cat2",
    name: "Single Cards",
    description: "Individual Pokemon cards",
    slug: "single-cards",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cat3",
    name: "Slabs",
    description: "Graded Pokemon cards",
    slug: "slabs",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const mockProducts: WixProduct[] = [
  {
    id: "prod1",
    name: "Scarlet & Violet Booster Box",
    description: "Sealed Scarlet & Violet booster box containing 36 packs",
    price: 149.99,
    sku: "SV-BB-001",
    stock: 25,
    images: ["/placeholder.svg?height=300&width=300"],
    options: [],
    variants: [],
    categoryIds: ["cat1"],
    slug: "scarlet-violet-booster-box",
    weight: 500,
    dimensions: {
      length: 20,
      width: 10,
      height: 5,
    },
    customFields: {},
    createdDate: "2023-01-01T00:00:00Z",
    updatedDate: "2023-01-01T00:00:00Z",
  },
  {
    id: "prod2",
    name: "Charizard VMAX",
    description: "Charizard VMAX card from Darkness Ablaze",
    price: 89.99,
    sku: "DA-CH-001",
    stock: 10,
    images: ["/placeholder.svg?height=300&width=300"],
    options: [],
    variants: [],
    categoryIds: ["cat2"],
    slug: "charizard-vmax",
    weight: 10,
    dimensions: {
      length: 6,
      width: 4,
      height: 0.1,
    },
    customFields: {},
    createdDate: "2023-01-02T00:00:00Z",
    updatedDate: "2023-01-02T00:00:00Z",
  },
]

const mockCustomers: WixCustomer[] = [
  {
    id: "cust1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    addresses: [
      {
        id: "addr1",
        addressLine1: "123 Main St",
        city: "Anytown",
        state: "CA",
        country: "US",
        postalCode: "12345",
        isDefault: true,
      },
    ],
    createdDate: "2023-01-01T00:00:00Z",
  },
]

const mockOrders: WixOrder[] = [
  {
    id: "order1",
    customerId: "cust1",
    status: "COMPLETED",
    paymentStatus: "PAID",
    fulfillmentStatus: "FULFILLED",
    total: 149.99,
    subtotal: 139.99,
    tax: 10.0,
    shipping: 0,
    discount: 0,
    items: [
      {
        id: "item1",
        productId: "prod1",
        name: "Scarlet & Violet Booster Box",
        sku: "SV-BB-001",
        quantity: 1,
        price: 139.99,
        total: 139.99,
      },
    ],
    billingAddress: {
      id: "addr1",
      addressLine1: "123 Main St",
      city: "Anytown",
      state: "CA",
      country: "US",
      postalCode: "12345",
      isDefault: true,
    },
    shippingAddress: {
      id: "addr1",
      addressLine1: "123 Main St",
      city: "Anytown",
      state: "CA",
      country: "US",
      postalCode: "12345",
      isDefault: true,
    },
    createdDate: "2023-01-10T00:00:00Z",
    updatedDate: "2023-01-11T00:00:00Z",
  },
]
