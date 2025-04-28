"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Cart, type ProductItem, getWixEcommerceService } from "@/lib/wix-ecommerce"
import { toast } from "@/hooks/use-toast"

interface WixEcommerceContextType {
  cart: Cart | null
  isCartLoading: boolean
  addToCart: (productId: string, quantity?: number, options?: Record<string, string>) => Promise<void>
  updateCartItem: (itemId: string, quantity: number) => Promise<void>
  removeCartItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  createCheckout: () => Promise<string>
  fetchProduct: (idOrSlug: string, isSlug?: boolean) => Promise<ProductItem | null>
  fetchProducts: (limit?: number, offset?: number) => Promise<ProductItem[]>
  fetchProductsByCategory: (categoryId: string, limit?: number, offset?: number) => Promise<ProductItem[]>
  fetchProductsByCollection: (collectionId: string, limit?: number, offset?: number) => Promise<ProductItem[]>
}

const WixEcommerceContext = createContext<WixEcommerceContextType | undefined>(undefined)

export function WixEcommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isCartLoading, setIsCartLoading] = useState(true)
  const wixService = getWixEcommerceService()

  // Fetch cart on initial load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsCartLoading(true)
        const cartData = await wixService.getCart()
        setCart(cartData)
      } catch (error) {
        console.error("Error fetching cart:", error)
        toast({
          title: "Error",
          description: "Failed to load your shopping cart",
          variant: "destructive",
        })
      } finally {
        setIsCartLoading(false)
      }
    }

    fetchCart()
  }, [])

  const addToCart = async (productId: string, quantity = 1, options?: Record<string, string>) => {
    try {
      setIsCartLoading(true)
      const updatedCart = await wixService.addToCart(productId, quantity, options)
      setCart(updatedCart)
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    } finally {
      setIsCartLoading(false)
    }
  }

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setIsCartLoading(true)
      const updatedCart = await wixService.updateCartItem(itemId, quantity)
      setCart(updatedCart)
    } catch (error) {
      console.error("Error updating cart item:", error)
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      })
    } finally {
      setIsCartLoading(false)
    }
  }

  const removeCartItem = async (itemId: string) => {
    try {
      setIsCartLoading(true)
      const updatedCart = await wixService.removeCartItem(itemId)
      setCart(updatedCart)
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      })
    } catch (error) {
      console.error("Error removing cart item:", error)
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      })
    } finally {
      setIsCartLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setIsCartLoading(true)
      await wixService.clearCart()
      setCart(await wixService.getCart())
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      })
    } catch (error) {
      console.error("Error clearing cart:", error)
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      })
    } finally {
      setIsCartLoading(false)
    }
  }

  const createCheckout = async () => {
    try {
      return await wixService.createCheckout()
    } catch (error) {
      console.error("Error creating checkout:", error)
      toast({
        title: "Error",
        description: "Failed to create checkout",
        variant: "destructive",
      })
      throw error
    }
  }

  const fetchProduct = async (idOrSlug: string, isSlug = false) => {
    try {
      if (isSlug) {
        return await wixService.getProductBySlug(idOrSlug)
      } else {
        return await wixService.getProductById(idOrSlug)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      toast({
        title: "Error",
        description: "Failed to load product",
        variant: "destructive",
      })
      return null
    }
  }

  const fetchProducts = async (limit = 100, offset = 0) => {
    try {
      return await wixService.getProducts(limit, offset)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
      return []
    }
  }

  const fetchProductsByCategory = async (categoryId: string, limit = 100, offset = 0) => {
    try {
      return await wixService.getProductsByCategory(categoryId, limit, offset)
    } catch (error) {
      console.error("Error fetching products by category:", error)
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
      return []
    }
  }

  const fetchProductsByCollection = async (collectionId: string, limit = 100, offset = 0) => {
    try {
      return await wixService.getProductsByCollection(collectionId, limit, offset)
    } catch (error) {
      console.error("Error fetching products by collection:", error)
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
      return []
    }
  }

  return (
    <WixEcommerceContext.Provider
      value={{
        cart,
        isCartLoading,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        createCheckout,
        fetchProduct,
        fetchProducts,
        fetchProductsByCategory,
        fetchProductsByCollection,
      }}
    >
      {children}
    </WixEcommerceContext.Provider>
  )
}

export function useWixEcommerce() {
  const context = useContext(WixEcommerceContext)
  if (context === undefined) {
    throw new Error("useWixEcommerce must be used within a WixEcommerceProvider")
  }
  return context
}
