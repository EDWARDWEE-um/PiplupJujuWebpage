/**
 * Wix Ecommerce Integration Service
 *
 * This service provides utilities for integrating with Wix Headless Ecommerce API
 * to fetch products, manage cart, and handle checkout.
 */

// Product types
export interface ProductItem {
  id: string
  name: string
  slug: string
  description: string
  price: number
  formattedPrice: string
  sku: string
  stock: number
  images: string[]
  options?: ProductOption[]
  variants?: ProductVariant[]
  categoryIds?: string[]
  collectionIds?: string[]
  additionalInfo?: Record<string, any>
}

export interface ProductOption {
  id: string
  name: string
  choices: {
    id: string
    value: string
    description?: string
  }[]
}

export interface ProductVariant {
  id: string
  sku: string
  price: number
  formattedPrice: string
  stock: number
  options: Record<string, string>
}

// Cart types
export interface CartItem {
  id: string
  productId: string
  name: string
  quantity: number
  price: number
  formattedPrice: string
  image?: string
  options?: Record<string, string>
  variantId?: string
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  formattedSubtotal: string
  tax?: number
  formattedTax?: string
  shipping?: number
  formattedShipping?: string
  total: number
  formattedTotal: string
  itemCount: number
}

// Mock data for development
const mockProducts: ProductItem[] = [
  // Sealed Products
  {
    id: "prod1",
    name: "Scarlet & Violet Booster Box",
    slug: "scarlet-violet-booster-box",
    description: "Sealed Scarlet & Violet booster box containing 36 packs",
    price: 149.99,
    formattedPrice: "$149.99",
    sku: "SV-BB-001",
    stock: 25,
    images: ["/colorful-trading-card-packs.png"],
    categoryIds: ["sealed-products"],
    additionalInfo: {
      Set: "Scarlet & Violet",
      "Release Date": "March 31, 2023",
      Contents: "36 booster packs",
    },
  },
  {
    id: "prod5",
    name: "Paldean Fates Elite Trainer Box",
    slug: "paldean-fates-etb",
    description: "Paldean Fates Elite Trainer Box with 10 booster packs and accessories",
    price: 89.99,
    formattedPrice: "$89.99",
    sku: "PF-ETB-001",
    stock: 20,
    images: ["/paldean-fates-box.png"],
    categoryIds: ["sealed-products"],
    additionalInfo: {
      Set: "Paldean Fates",
      "Release Date": "January 26, 2024",
      Contents: "10 booster packs, 65 card sleeves, 45 energy cards, player's guide",
    },
  },
  {
    id: "prod8",
    name: "Obsidian Flames Booster Box",
    slug: "obsidian-flames-booster-box",
    description: "Sealed Obsidian Flames booster box containing 36 packs",
    price: 159.99,
    formattedPrice: "$159.99",
    sku: "OF-BB-001",
    stock: 15,
    images: ["/obsidian-flames-box.png"],
    categoryIds: ["sealed-products"],
    additionalInfo: {
      Set: "Obsidian Flames",
      "Release Date": "August 11, 2023",
      Contents: "36 booster packs",
    },
  },
  {
    id: "prod9",
    name: "Paradox Rift Elite Trainer Box",
    slug: "paradox-rift-etb",
    description: "Paradox Rift Elite Trainer Box with 9 booster packs and accessories",
    price: 59.99,
    formattedPrice: "$59.99",
    sku: "PR-ETB-001",
    stock: 30,
    images: ["/paradox-rift-box.png"],
    categoryIds: ["sealed-products"],
    additionalInfo: {
      Set: "Paradox Rift",
      "Release Date": "November 3, 2023",
      Contents: "9 booster packs, 65 card sleeves, 45 energy cards, player's guide",
    },
  },

  // Single Cards
  {
    id: "prod2",
    name: "Charizard VMAX",
    slug: "charizard-vmax",
    description: "Charizard VMAX card from Darkness Ablaze",
    price: 89.99,
    formattedPrice: "$89.99",
    sku: "DA-CH-001",
    stock: 10,
    images: ["/fiery-dragon-ascension.png"],
    categoryIds: ["single-cards"],
    additionalInfo: {
      Set: "Darkness Ablaze",
      "Card Number": "020/189",
      Rarity: "Ultra Rare",
    },
  },
  {
    id: "prod3",
    name: "Pikachu V Full Art",
    slug: "pikachu-v-full-art",
    description: "Pikachu V Full Art card from Vivid Voltage",
    price: 24.99,
    formattedPrice: "$24.99",
    sku: "VV-PK-001",
    stock: 15,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon pikachu v full art card"],
    categoryIds: ["single-cards"],
    additionalInfo: {
      Set: "Vivid Voltage",
      "Card Number": "061/185",
      Rarity: "Ultra Rare",
    },
  },
  {
    id: "prod6",
    name: "Mewtwo V Alt Art",
    slug: "mewtwo-v-alt-art",
    description: "Mewtwo V Alternate Art card from Paldean Fates",
    price: 129.99,
    formattedPrice: "$129.99",
    sku: "PF-MW-001",
    stock: 5,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon mewtwo v alt art card"],
    categoryIds: ["single-cards"],
    additionalInfo: {
      Set: "Paldean Fates",
      "Card Number": "072/091",
      Rarity: "Secret Rare",
    },
  },
  {
    id: "prod10",
    name: "Mew VMAX Rainbow",
    slug: "mew-vmax-rainbow",
    description: "Mew VMAX Rainbow Rare card from Fusion Strike",
    price: 49.99,
    formattedPrice: "$49.99",
    sku: "FS-MW-001",
    stock: 8,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon mew vmax rainbow card"],
    categoryIds: ["single-cards"],
    additionalInfo: {
      Set: "Fusion Strike",
      "Card Number": "269/264",
      Rarity: "Secret Rare",
    },
  },
  {
    id: "prod11",
    name: "Lugia V Alt Art",
    slug: "lugia-v-alt-art",
    description: "Lugia V Alternate Art card from Silver Tempest",
    price: 189.99,
    formattedPrice: "$189.99",
    sku: "ST-LG-001",
    stock: 3,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon lugia v alt art card"],
    categoryIds: ["single-cards"],
    additionalInfo: {
      Set: "Silver Tempest",
      "Card Number": "186/195",
      Rarity: "Secret Rare",
    },
  },

  // Slabs
  {
    id: "prod4",
    name: "Charizard VMAX (PSA 10)",
    slug: "charizard-vmax-psa10",
    description: "Charizard VMAX card from Darkness Ablaze, graded PSA 10 Gem Mint",
    price: 299.99,
    formattedPrice: "$299.99",
    sku: "SL-CH-001",
    stock: 3,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon charizard vmax psa 10 slab"],
    categoryIds: ["slabs"],
    additionalInfo: {
      Set: "Darkness Ablaze",
      "Card Number": "020/189",
      Grade: "PSA 10 Gem Mint",
    },
  },
  {
    id: "prod12",
    name: "Pikachu V Full Art (BGS 9.5)",
    slug: "pikachu-v-full-art-bgs95",
    description: "Pikachu V Full Art card from Vivid Voltage, graded BGS 9.5 Gem Mint",
    price: 149.99,
    formattedPrice: "$149.99",
    sku: "SL-PK-001",
    stock: 2,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon pikachu v full art bgs 9.5 slab"],
    categoryIds: ["slabs"],
    additionalInfo: {
      Set: "Vivid Voltage",
      "Card Number": "061/185",
      Grade: "BGS 9.5 Gem Mint",
    },
  },
  {
    id: "prod13",
    name: "Mewtwo V Alt Art (PSA 10)",
    slug: "mewtwo-v-alt-art-psa10",
    description: "Mewtwo V Alternate Art card from Paldean Fates, graded PSA 10 Gem Mint",
    price: 499.99,
    formattedPrice: "$499.99",
    sku: "SL-MW-001",
    stock: 1,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon mewtwo v alt art psa 10 slab"],
    categoryIds: ["slabs"],
    additionalInfo: {
      Set: "Paldean Fates",
      "Card Number": "072/091",
      Grade: "PSA 10 Gem Mint",
    },
  },
  {
    id: "prod14",
    name: "Charizard Base Set (PSA 7)",
    slug: "charizard-base-set-psa7",
    description: "Charizard card from Base Set, graded PSA 7 Near Mint",
    price: 1999.99,
    formattedPrice: "$1,999.99",
    sku: "SL-CH-002",
    stock: 1,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon charizard base set psa 7 slab"],
    categoryIds: ["slabs"],
    additionalInfo: {
      Set: "Base Set",
      "Card Number": "4/102",
      Grade: "PSA 7 Near Mint",
    },
  },
  {
    id: "prod15",
    name: "Lugia V Alt Art (CGC 9.5)",
    slug: "lugia-v-alt-art-cgc95",
    description: "Lugia V Alternate Art card from Silver Tempest, graded CGC 9.5 Gem Mint",
    price: 399.99,
    formattedPrice: "$399.99",
    sku: "SL-LG-001",
    stock: 2,
    images: ["/placeholder.svg?height=300&width=300&query=pokemon lugia v alt art cgc 9.5 slab"],
    categoryIds: ["slabs"],
    additionalInfo: {
      Set: "Silver Tempest",
      "Card Number": "186/195",
      Grade: "CGC 9.5 Gem Mint",
    },
  },
]

// Mock cart data
const mockCart: Cart = {
  id: "cart1",
  items: [],
  subtotal: 0,
  formattedSubtotal: "$0.00",
  tax: 0,
  formattedTax: "$0.00",
  shipping: 0,
  formattedShipping: "$0.00",
  total: 0,
  formattedTotal: "$0.00",
  itemCount: 0,
}

// Wix Ecommerce Service
export class WixEcommerceService {
  private cart: Cart
  private products: ProductItem[]

  constructor() {
    // Initialize with mock data
    this.products = [...mockProducts]
    this.cart = { ...mockCart }
  }

  // Products
  async getProducts(limit = 100, offset = 0, sort?: string, filter?: Record<string, any>): Promise<ProductItem[]> {
    try {
      // In a real implementation, this would call the Wix API
      // For now, return mock data
      let filteredProducts = [...this.products]

      // Apply category filter if provided
      if (filter && filter.categoryIds) {
        filteredProducts = filteredProducts.filter((product) =>
          product.categoryIds?.some((id) => filter.categoryIds.includes(id)),
        )
      }

      // Apply pagination
      return filteredProducts.slice(offset, offset + limit)
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

  async getProductById(productId: string): Promise<ProductItem | null> {
    try {
      const product = this.products.find((p) => p.id === productId)
      return product || null
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
      return null
    }
  }

  async getProductBySlug(slug: string): Promise<ProductItem | null> {
    try {
      const product = this.products.find((p) => p.slug === slug)
      return product || null
    } catch (error) {
      console.error(`Error fetching product with slug ${slug}:`, error)
      return null
    }
  }

  async getProductsByCategory(categoryId: string, limit = 100, offset = 0): Promise<ProductItem[]> {
    try {
      const products = this.products.filter((p) => p.categoryIds?.includes(categoryId))
      return products.slice(offset, offset + limit)
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error)
      return []
    }
  }

  async getProductsByCollection(collectionId: string, limit = 100, offset = 0): Promise<ProductItem[]> {
    try {
      const products = this.products.filter((p) => p.collectionIds?.includes(collectionId))
      return products.slice(offset, offset + limit)
    } catch (error) {
      console.error(`Error fetching products for collection ${collectionId}:`, error)
      return []
    }
  }

  // Cart
  async getCart(): Promise<Cart> {
    try {
      // In a real implementation, this would call the Wix API
      // For now, return mock data
      return this.cart
    } catch (error) {
      console.error("Error fetching cart:", error)
      return { ...mockCart }
    }
  }

  async addToCart(productId: string, quantity = 1, options?: Record<string, string>): Promise<Cart> {
    try {
      const product = await this.getProductById(productId)
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }

      // Check if the product is already in the cart
      const existingItemIndex = this.cart.items.findIndex((item) => item.productId === productId)

      if (existingItemIndex >= 0) {
        // Update quantity if the product is already in the cart
        this.cart.items[existingItemIndex].quantity += quantity
      } else {
        // Add new item to cart
        this.cart.items.push({
          id: `item-${Date.now()}`,
          productId,
          name: product.name,
          quantity,
          price: product.price,
          formattedPrice: product.formattedPrice,
          image: product.images[0],
          options,
        })
      }

      // Recalculate cart totals
      this.updateCartTotals()

      return this.cart
    } catch (error) {
      console.error(`Error adding product ${productId} to cart:`, error)
      return this.cart
    }
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    try {
      const itemIndex = this.cart.items.findIndex((item) => item.id === itemId)

      if (itemIndex >= 0) {
        this.cart.items[itemIndex].quantity = quantity
        this.updateCartTotals()
      }

      return this.cart
    } catch (error) {
      console.error(`Error updating cart item ${itemId}:`, error)
      return this.cart
    }
  }

  async removeCartItem(itemId: string): Promise<Cart> {
    try {
      this.cart.items = this.cart.items.filter((item) => item.id !== itemId)
      this.updateCartTotals()
      return this.cart
    } catch (error) {
      console.error(`Error removing cart item ${itemId}:`, error)
      return this.cart
    }
  }

  async clearCart(): Promise<void> {
    try {
      this.cart.items = []
      this.updateCartTotals()
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  // Checkout
  async createCheckout(): Promise<string> {
    try {
      // In a real implementation, this would call the Wix API
      // For now, return a mock checkout ID
      return `checkout-${Date.now()}`
    } catch (error) {
      console.error("Error creating checkout:", error)
      throw error
    }
  }

  // Helper methods
  private updateCartTotals(): void {
    // Calculate subtotal
    const subtotal = this.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

    // Calculate tax (7%)
    const tax = subtotal * 0.07

    // Calculate shipping (flat rate for now)
    const shipping = this.cart.items.length > 0 ? 4.99 : 0

    // Calculate total
    const total = subtotal + tax + shipping

    // Update cart
    this.cart.subtotal = subtotal
    this.cart.formattedSubtotal = this.formatPrice(subtotal)
    this.cart.tax = tax
    this.cart.formattedTax = this.formatPrice(tax)
    this.cart.shipping = shipping
    this.cart.formattedShipping = this.formatPrice(shipping)
    this.cart.total = total
    this.cart.formattedTotal = this.formatPrice(total)
    this.cart.itemCount = this.cart.items.reduce((count, item) => count + item.quantity, 0)
  }

  private formatPrice(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }
}

// Create a singleton instance
let wixEcommerceService: WixEcommerceService | null = null

export function getWixEcommerceService(): WixEcommerceService {
  if (!wixEcommerceService) {
    wixEcommerceService = new WixEcommerceService()
  }
  return wixEcommerceService
}
