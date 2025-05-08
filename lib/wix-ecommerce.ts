"use client"
import { createClient, OAuthStrategy } from "@wix/sdk"
import { products, collections } from "@wix/stores"
import { currentCart } from "@wix/ecom" // Import currentCart from @wix/ecom
import { redirects } from "@wix/redirects"
import Cookies from "js-cookie"

// Constants
const WIX_STORES_APP_ID = process.env.NEXT_PUBLIC_WIX_APP_ID || "1380b703-ce81-ff05-f115-39571d94dfcd" // Required for Wix Stores

// Initialize Wix client
export const createWixClient = () => {
  try {
    // Get tokens from cookies or use empty objects if not available
    let tokens = { accessToken: {}, refreshToken: {} }
    try {
      const sessionCookie = Cookies.get("session")
      if (sessionCookie) {
        tokens = JSON.parse(sessionCookie)
      }
    } catch (e) {
      console.error("Error parsing session cookie:", e)
    }

    // Create client with explicit modules
    const client = createClient({
      modules: {
        products,
        collections,
        currentCart, // Include currentCart module
        redirects,
      },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3",
        tokens,
      }),
    })

    // Debug: Log available methods on currentCart
    if (client.currentCart) {
      console.log("Available currentCart methods:", Object.keys(client.currentCart))
    } else {
      console.error("currentCart module is not available")
    }

    return client
  } catch (error) {
    console.error("Error creating Wix client:", error)
    throw new Error(`Failed to initialize Wix client: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Create a singleton instance
export const myWixClient = createWixClient()

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
  tags?: string[]
  additionalInfo?: {
    isPreOrder?: boolean
    isNewArrival?: boolean
    originalPrice?: number
    [key: string]: any
  }
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

// Wix Ecommerce Service
export class WixEcommerceService {
  private client

  constructor() {
    this.client = myWixClient
  }

  // Products
  async getProducts(limit = 100, offset = 0, sort?: string, filter?: Record<string, any>): Promise<ProductItem[]> {
    try {
      const queryOptions: any = {
        limit,
        offset,
      }

      if (sort) {
        queryOptions.sort = sort
      }

      if (filter) {
        queryOptions.filter = filter
      }

      const response = await this.client.products.queryProducts(queryOptions)
      return response.items.map((item: any) => this.mapWixProductToProductItem(item))
    } catch (error) {
      console.error("Error fetching products from Wix:", error)
      throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async getProductsByCategory(categoryId: string, limit = 100, offset = 0): Promise<ProductItem[]> {
    try {
      // Using the proper filter syntax for categoryIds
      const response = await this.client.products.queryProducts({
        filter: {
          categoryIds: {
            $hasSome: [categoryId],
          },
        },
        limit,
        offset,
      })

      return response.items.map((item: any) => this.mapWixProductToProductItem(item))
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error)
      throw new Error(
        `Failed to fetch products by category: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  }

  async getProductsByCollection(collectionId: string, limit = 100, offset = 0): Promise<ProductItem[]> {
    try {
      const response = await this.client.products.queryProducts({
        filter: { collectionIds: { $hasSome: [collectionId] } },
        limit,
        offset,
      })
      return response.items.map((item: any) => this.mapWixProductToProductItem(item))
    } catch (error) {
      console.error(`Error fetching products for collection ${collectionId}:`, error)
      throw new Error(
        `Failed to fetch products by collection: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  }

  async getProductById(productId: string): Promise<ProductItem> {
    try {
      const product = await this.client.products.getProduct(productId)
      return this.mapWixProductToProductItem(product)
    } catch (error) {
      console.error(`Error fetching product ${productId} from Wix:`, error)
      throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async getProductBySlug(slug: string): Promise<ProductItem> {
    try {
      console.log(`WixEcommerceService: Fetching product with slug: ${slug}`)

      // Create a fresh client for this request
      const freshClient = createWixClient()

      // Use the eq method as suggested
      const response = await freshClient.products.queryProducts().eq("slug", slug).find()

      console.log(`WixEcommerceService: Query response received, items count: ${response?.items?.length || 0}`)

      if (!response || !response.items || response.items.length === 0) {
        throw new Error(`Product with slug ${slug} not found`)
      }

      const product = response.items[0]
      console.log(`WixEcommerceService: Found product:`, {
        id: product._id,
        name: product.name,
        slug: product.slug,
      })

      return this.mapWixProductToProductItem(product)
    } catch (error) {
      console.error(`Error fetching product with slug ${slug} from Wix:`, error)
      throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  // Categories and Collections
  async getCategories() {
    try {
      // Use the products module to query categories
      const response = await this.client.products.queryProductCategories()
      return response.items
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async getCollections() {
    try {
      const response = await this.client.collections.queryCollections()
      return response.items
    } catch (error) {
      console.error("Error fetching collections:", error)
      throw new Error(`Failed to fetch collections: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  // Cart
  async getCart(): Promise<Cart> {
    try {
      console.log("Fetching current cart...")

      // Create a fresh client for this operation
      const freshClient = createWixClient()

      try {
        const cart = await freshClient.currentCart.getCurrentCart()
        console.log("Cart fetched successfully:", cart.id)

        return {
          id: cart.id,
          items: cart.lineItems.map((item: any) => ({
            id: item.id,
            productId: item.catalogReference?.catalogItemId || item.productId,
            name: item.productName.original,
            quantity: item.quantity,
            price: item.price.amount,
            formattedPrice: this.formatPrice(item.price.amount),
            image: item.image?.url,
            options: item.options?.reduce(
              (acc: Record<string, string>, option: any) => {
                acc[option.name] = option.selection
                return acc
              },
              {} as Record<string, string>,
            ),
            variantId: item.variantId,
          })),
          subtotal: cart.subtotal.amount,
          formattedSubtotal: this.formatPrice(cart.subtotal.amount),
          tax: cart.tax?.amount,
          formattedTax: cart.tax ? this.formatPrice(cart.tax.amount) : undefined,
          shipping: cart.shippingInfo?.cost?.amount,
          formattedShipping: cart.shippingInfo?.cost ? this.formatPrice(cart.shippingInfo.cost.amount) : undefined,
          total: cart.totals.total.amount,
          formattedTotal: this.formatPrice(cart.totals.total.amount),
          itemCount: cart.lineItems.reduce((count: number, item: any) => count + item.quantity, 0),
        }
      } catch (error: any) {
        // Check if the error is "Cart not found"
        if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
          console.log("Cart not found, creating a new one...")
          // Create an empty cart
          return {
            id: "",
            items: [],
            subtotal: 0,
            formattedSubtotal: this.formatPrice(0),
            total: 0,
            formattedTotal: this.formatPrice(0),
            itemCount: 0,
          }
        }
        throw error
      }
    } catch (error) {
      console.error("Error fetching cart from Wix:", error)
      throw new Error(`Failed to fetch cart: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  // Fixed addToCart method using the correct API
  async addToCart(productId: string, quantity = 1, options?: Record<string, string>): Promise<Cart> {
    try {
      console.log(`Adding product ${productId} to cart with quantity ${quantity}`)

      // Create a fresh client for this operation to avoid stale references
      const freshClient = createWixClient()

      try {
        // First, try to get the current cart to see if it exists
        await freshClient.currentCart.getCurrentCart()

        // If we get here, the cart exists, so add to it
        console.log("Cart exists, adding item to existing cart")
        await freshClient.currentCart.addToCurrentCart({
          lineItems: [
            {
              catalogReference: {
                catalogItemId: productId,
                appId: WIX_STORES_APP_ID,
              },
              quantity,
            },
          ],
        })
      } catch (error: any) {
        // If the error is "Cart not found", create a new cart
        if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
          console.log("Cart not found, creating a new cart with the item")

          // Create a new cart with the item
          await freshClient.currentCart.createCart({
            lineItems: [
              {
                catalogReference: {
                  catalogItemId: productId,
                  appId: WIX_STORES_APP_ID,
                },
                quantity,
              },
            ],
          })
        } else {
          // If it's some other error, rethrow it
          console.error("Unexpected error when adding to cart:", error)
          throw error
        }
      }

      console.log("Product added to cart successfully")
      return this.getCart()
    } catch (error) {
      console.error(`Error adding product ${productId} to cart:`, error)
      throw new Error(`Failed to add to cart: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    try {
      console.log(`Updating cart item ${itemId} to quantity ${quantity}`)

      // Create a fresh client for this operation
      const freshClient = createWixClient()

      try {
        await freshClient.currentCart.updateLineItemQuantity({
          lineItemId: itemId,
          quantity,
        })
      } catch (error: any) {
        // If the error is "Cart not found", return an empty cart
        if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
          console.log("Cart not found when updating item")
          return {
            id: "",
            items: [],
            subtotal: 0,
            formattedSubtotal: this.formatPrice(0),
            total: 0,
            formattedTotal: this.formatPrice(0),
            itemCount: 0,
          }
        }
        throw error
      }

      console.log("Cart item updated successfully")
      return this.getCart()
    } catch (error) {
      console.error(`Error updating cart item ${itemId}:`, error)
      throw new Error(`Failed to update cart item: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async removeCartItem(itemId: string): Promise<Cart> {
    try {
      console.log(`Removing item ${itemId} from cart`)

      // Create a fresh client for this operation
      const freshClient = createWixClient()

      try {
        await freshClient.currentCart.removeLineItems({
          lineItemIds: [itemId],
        })
      } catch (error: any) {
        // If the error is "Cart not found", return an empty cart
        if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
          console.log("Cart not found when removing item")
          return {
            id: "",
            items: [],
            subtotal: 0,
            formattedSubtotal: this.formatPrice(0),
            total: 0,
            formattedTotal: this.formatPrice(0),
            itemCount: 0,
          }
        }
        throw error
      }

      console.log("Cart item removed successfully")
      return this.getCart()
    } catch (error) {
      console.error(`Error removing cart item ${itemId}:`, error)
      throw new Error(`Failed to remove cart item: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async clearCart(): Promise<void> {
    try {
      console.log("Clearing cart")

      // Create a fresh client for this operation
      const freshClient = createWixClient()

      try {
        await freshClient.currentCart.deleteCurrentCart()
      } catch (error: any) {
        // If the error is "Cart not found", just ignore it
        if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
          console.log("No cart to clear")
          return
        }
        throw error
      }

      console.log("Cart cleared successfully")
    } catch (error) {
      console.error("Error clearing cart:", error)
      throw new Error(`Failed to clear cart: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async createCheckout(): Promise<string> {
    try {
      console.log("Creating checkout from current cart")

      // Create a fresh client for this operation
      const freshClient = createWixClient()

      try {
        const { checkoutId } = await freshClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        })
        console.log(`Checkout created with ID: ${checkoutId}`)

        console.log("Creating redirect session for checkout")
        const redirect = await freshClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId },
          callbacks: { postFlowUrl: window.location.href },
        })
        console.log(`Redirect URL: ${redirect.redirectSession.fullUrl}`)

        return redirect.redirectSession.fullUrl
      } catch (error: any) {
        // If the error is "Cart not found", create a new cart first
        if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
          console.log("Cart not found, cannot create checkout")
          throw new Error("No cart available to create checkout. Please add items to your cart first.")
        }
        throw error
      }
    } catch (error) {
      console.error("Error creating checkout:", error)
      throw new Error(`Failed to create checkout: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  public mapWixProductToProductItem(wixProduct: any): ProductItem {
    try {
      // Extract images from the product
      const images: string[] = []

      // Try to get image from mainMedia
      if (wixProduct.media?.mainMedia?.image?.url) {
        images.push(wixProduct.media.mainMedia.image.url)
      }

      // Also add images from media items if they exist
      if (wixProduct.media?.items && Array.isArray(wixProduct.media.items)) {
        wixProduct.media.items.forEach((item: any) => {
          if (item.image?.url && !images.includes(item.image.url)) {
            images.push(item.image.url)
          }
        })
      }

      // Extract price information with fallbacks
      let price = 0
      let formattedPrice = "$0.00"

      // Try different paths to find the price
      if (wixProduct.price?.price) {
        price = wixProduct.price.price
      } else if (wixProduct.priceData?.price) {
        price = wixProduct.priceData.price
      } else if (wixProduct.convertedPriceData?.price) {
        price = wixProduct.convertedPriceData.price
      }

      // Try different paths to find the formatted price
      if (wixProduct.price?.formatted?.price) {
        formattedPrice = wixProduct.price.formatted.price
      } else if (wixProduct.priceData?.formatted?.price) {
        formattedPrice = wixProduct.priceData.formatted.price
      } else if (wixProduct.convertedPriceData?.formatted?.price) {
        formattedPrice = wixProduct.convertedPriceData.formatted.price
      } else {
        formattedPrice = this.formatPrice(price)
      }

      // Extract tags from ribbons
      const tags: string[] = []
      if (wixProduct.ribbon) {
        tags.push(wixProduct.ribbon)
      }
      if (wixProduct.ribbons && Array.isArray(wixProduct.ribbons)) {
        wixProduct.ribbons.forEach((ribbon: any) => {
          if (ribbon.text && !tags.includes(ribbon.text)) {
            tags.push(ribbon.text)
          }
        })
      }

      // Extract custom fields
      const customFields = wixProduct.customFields || {}
      const isPreOrder = customFields.isPreOrder === "true"
      const isNewArrival = customFields.isNewArrival === "true" || tags.includes("New Arrival")
      const originalPrice = customFields.originalPrice ? Number.parseFloat(customFields.originalPrice) : null

      // Map variants safely
      const variants: ProductVariant[] = []
      if (wixProduct.variants && Array.isArray(wixProduct.variants)) {
        for (const variantItem of wixProduct.variants) {
          try {
            // Handle the different variant structures we've seen
            const variant: ProductVariant = {
              id: variantItem._id || "default",
              sku: "",
              price: 0,
              formattedPrice: "$0.00",
              stock: 0,
              options: {},
            }

            // Get variant ID
            if (variantItem._id) {
              variant.id = variantItem._id
            }

            // Get variant SKU
            if (variantItem.variant?.sku) {
              variant.sku = variantItem.variant.sku
            } else if (variantItem.sku) {
              variant.sku = variantItem.sku
            }

            // Get variant price
            if (variantItem.variant?.priceData?.price) {
              variant.price = variantItem.variant.priceData.price
            } else if (variantItem.price?.price) {
              variant.price = variantItem.price.price
            } else {
              variant.price = price
            }

            // Get variant formatted price
            if (variantItem.variant?.priceData?.formatted?.price) {
              variant.formattedPrice = variantItem.variant.priceData.formatted.price
            } else if (variantItem.price?.formatted?.price) {
              variant.formattedPrice = variantItem.price.formatted.price
            } else {
              variant.formattedPrice = this.formatPrice(variant.price)
            }

            // Get variant stock
            if (variantItem.stock?.quantity !== undefined) {
              variant.stock = variantItem.stock.quantity
            } else if (variantItem.stock?.inStock) {
              variant.stock = 999 // Default high stock if inStock is true but no quantity
            }

            // Handle choices/options based on the structure
            if (variantItem.choices) {
              // If choices is an object (not an array), handle it differently
              if (typeof variantItem.choices === "object" && !Array.isArray(variantItem.choices)) {
                variant.options = { ...variantItem.choices }
              } else if (Array.isArray(variantItem.choices)) {
                // Original array handling
                variantItem.choices.forEach((choice: any) => {
                  if (choice.optionName && choice.value) {
                    variant.options[choice.optionName] = choice.value
                  }
                })
              }
            }

            variants.push(variant)
          } catch (variantError) {
            console.error("Error mapping variant:", variantError)
            // Skip this variant but continue with others
          }
        }
      }

      return {
        id: wixProduct._id,
        name: wixProduct.name || "Unnamed Product",
        slug: wixProduct.slug || `product-${wixProduct._id}`,
        description: wixProduct.description || "",
        price: price,
        formattedPrice: formattedPrice,
        sku: wixProduct.sku || "",
        stock: wixProduct.stock?.quantity || (wixProduct.stock?.inStock ? 999 : 0),
        images: images.length > 0 ? images : [],
        options:
          wixProduct.productOptions?.map((option: any) => ({
            id: option._id,
            name: option.name,
            choices:
              option.choices?.map((choice: any) => ({
                id: choice._id,
                value: choice.value,
                description: choice.description,
              })) || [],
          })) || [],
        variants: variants,
        categoryIds: wixProduct.categoryIds || [],
        collectionIds: wixProduct.collectionIds || [],
        tags: tags,
        additionalInfo: {
          ...(wixProduct.additionalInfo || {}),
          isPreOrder,
          isNewArrival,
          originalPrice,
        },
      }
    } catch (error) {
      console.error("Error mapping Wix product:", error)
      // Return a minimal valid product to avoid breaking the UI
      return {
        id: wixProduct._id || "unknown",
        name: wixProduct.name || "Unknown Product",
        slug: wixProduct.slug || "unknown-product",
        description: wixProduct.description || "",
        price: 0,
        formattedPrice: "$0.00",
        sku: "",
        stock: 0,
        images: [],
      }
    }
  }

  private formatPrice(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }
}

export function getWixEcommerceService(): WixEcommerceService {
  return new WixEcommerceService()
}
