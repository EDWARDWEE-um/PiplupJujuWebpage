"use client"
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart, checkout } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import Cookies from "js-cookie";

// Initialize Wix client
export const myWixClient = createClient({
    modules: { products, currentCart, checkout, redirects },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
      tokens: JSON.parse(
        Cookies.get("session") || '{"accessToken": {}, "refreshToken": {}}',
      ),
    }),
  });
 


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

// Wix Ecommerce Service
export class WixEcommerceService {
  private client

  constructor() {
    this.client = createWixClient()
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
      return response.items.map((item) => this.mapWixProductToProductItem(item))
    } catch (error) {
      console.error("Error fetching products from Wix:", error)
      throw error
    }
  }

  async getProductById(productId: string): Promise<ProductItem> {
    try {
      const product = await this.client.products.getProduct(productId)
      return this.mapWixProductToProductItem(product)
    } catch (error) {
      console.error(`Error fetching product ${productId} from Wix:`, error)
      throw error
    }
  }

  async getProductBySlug(slug: string): Promise<ProductItem> {
    try {
      const response = await this.client.products.queryProducts({
        filter: { slug: { $eq: slug } },
        limit: 1,
      })

      if (response.items.length === 0) {
        throw new Error(`Product with slug ${slug} not found`)
      }

      return this.mapWixProductToProductItem(response.items[0])
    } catch (error) {
      console.error(`Error fetching product with slug ${slug} from Wix:`, error)
      throw error
    }
  }

  // Cart
  async getCart(): Promise<Cart> {
    try {
      const cart = await this.client.currentCart.getCurrentCart()
      return {
        id: cart.id,
        items: cart.lineItems.map((item) => ({
          id: item.id,
          productId: item.productId,
          name: item.productName.original,
          quantity: item.quantity,
          price: item.price.amount,
          formattedPrice: this.formatPrice(item.price.amount),
          image: item.image?.url,
          options: item.options?.reduce(
            (acc, option) => {
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
        itemCount: cart.lineItems.reduce((count, item) => count + item.quantity, 0),
      }
    } catch (error) {
      console.error("Error fetching cart from Wix:", error)
      throw error
    }
  }

  async addToCart(productId: string, quantity = 1, options?: Record<string, string>): Promise<Cart> {
    try {
      await this.client.currentCart.addToCart({
        productId,
        quantity,
        options: options ? Object.entries(options).map(([name, selection]) => ({ name, selection })) : undefined,
      })
      return this.getCart()
    } catch (error) {
      console.error(`Error adding product ${productId} to cart:`, error)
      throw error
    }
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    try {
      await this.client.currentCart.updateLineItemQuantity({
        lineItemId: itemId,
        quantity,
      })
      return this.getCart()
    } catch (error) {
      console.error(`Error updating cart item ${itemId}:`, error)
      throw error
    }
  }

  async removeCartItem(itemId: string): Promise<Cart> {
    try {
      await this.client.currentCart.removeLineItems({
        lineItemIds: [itemId],
      })
      return this.getCart()
    } catch (error) {
      console.error(`Error removing cart item ${itemId}:`, error)
      throw error
    }
  }

  async clearCart(): Promise<void> {
    try {
      await this.client.currentCart.deleteCurrentCart()
    } catch (error) {
      console.error("Error clearing cart:", error)
      throw error
    }
  }

  async createCheckout(): Promise<string> {
    try {
      const { checkoutId } = await this.client.currentCart.createCheckoutFromCurrentCart({
        channelType: currentCart.ChannelType.WEB,
      })
      const redirect = await this.client.redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
        callbacks: { postFlowUrl: window.location.href },
      })
      return redirect.redirectSession.fullUrl
    } catch (error) {
      console.error("Error creating checkout:", error)
      throw error
    }
  }

  private mapWixProductToProductItem(wixProduct: any): ProductItem {
    return {
      id: wixProduct._id,
      name: wixProduct.name,
      slug: wixProduct.slug,
      description: wixProduct.description,
      price: wixProduct.price.amount,
      formattedPrice: this.formatPrice(wixProduct.price.amount),
      sku: wixProduct.sku,
      stock: wixProduct.stock?.quantity || 0,
      images: wixProduct.media?.items.map((item: any) => item.image?.url) || [],
      options: wixProduct.productOptions?.map((option: any) => ({
        id: option._id,
        name: option.name,
        choices: option.choices.map((choice: any) => ({
          id: choice._id,
          value: choice.value,
          description: choice.description,
        })),
      })),
      variants: wixProduct.variants?.map((variant: any) => ({
        id: variant._id,
        sku: variant.sku,
        price: variant.price.amount,
        formattedPrice: this.formatPrice(variant.price.amount),
        stock: variant.stock?.quantity || 0,
        options: variant.choices.reduce(
          (acc: Record<string, string>, choice: any) => {
            acc[choice.optionName] = choice.value
            return acc
          },
          {},
        ),
      })),
      categoryIds: wixProduct.categoryIds,
      collectionIds: wixProduct.collectionIds,
      additionalInfo: wixProduct.additionalInfo,
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