"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

// Define simple types for our dummy implementation
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
  options?: any[]
  variants?: any[]
  categoryIds?: string[]
  collectionIds?: string[]
  tags?: string[]
  additionalInfo?: Record<string, any>
}

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

// Dummy cart data
const DUMMY_CART: Cart = {
  id: "dummy-cart-id",
  items: [
    {
      id: "item1",
      productId: "prod1",
      name: "Charizard V (Cherry Holo)",
      quantity: 2,
      price: 89.99,
      formattedPrice: "$89.99",
      image: "/placeholder.svg?key=w6xfi",
      options: { condition: "Near Mint", language: "English" },
    },
    {
      id: "item2",
      productId: "prod2",
      name: "Pikachu VMax Rainbow Rare",
      quantity: 1,
      price: 129.99,
      formattedPrice: "$129.99",
      image: "/placeholder.svg?key=59eni",
      options: { condition: "Mint", language: "Japanese" },
    },
  ],
  subtotal: 309.97,
  formattedSubtotal: "$309.97",
  tax: 24.8,
  formattedTax: "$24.80",
  total: 334.77,
  formattedTotal: "$334.77",
  itemCount: 3,
}

// Dummy products
const DUMMY_PRODUCTS: ProductItem[] = [
  {
    id: "prod1",
    name: "Charizard V (Cherry Holo)",
    slug: "charizard-v-cherry-holo",
    description: "A powerful fire-type Pokémon card with a stunning cherry holo pattern.",
    price: 89.99,
    formattedPrice: "$89.99",
    sku: "CHZ-001",
    stock: 15,
    images: ["/placeholder.svg?key=rg8e4"],
    tags: ["Fire", "Rare", "V Card"],
  },
  {
    id: "prod2",
    name: "Pikachu VMax Rainbow Rare",
    slug: "pikachu-vmax-rainbow-rare",
    description: "The iconic electric Pokémon in its stunning rainbow rare VMax form.",
    price: 129.99,
    formattedPrice: "$129.99",
    sku: "PKC-002",
    stock: 8,
    images: ["/placeholder.svg?key=qqh6y"],
    tags: ["Electric", "Rainbow Rare", "VMax"],
  },
  {
    id: "prod3",
    name: "Scarlet & Violet Booster Box",
    slug: "scarlet-violet-booster-box",
    description: "A sealed booster box containing 36 packs of the latest Scarlet & Violet expansion.",
    price: 149.99,
    formattedPrice: "$149.99",
    sku: "SV-BB-001",
    stock: 25,
    images: ["/placeholder.svg?key=rrell"],
    tags: ["Sealed", "Booster Box", "Scarlet & Violet"],
  },
]

const WixEcommerceContext = createContext<WixEcommerceContextType | undefined>(undefined)

export function WixEcommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(DUMMY_CART)
  const [isCartLoading, setIsCartLoading] = useState(false)
  // const wixService = getWixEcommerceService()
  // const { isAuthenticated } = useAuth()

  // // Fetch cart on initial load and when authentication changes
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       setIsCartLoading(true)
  //       // If not authenticated, set an empty cart
  //       if (!isAuthenticated) {
  //         setCart({
  //           id: "",
  //           items: [],
  //           subtotal: 0,
  //           formattedSubtotal: "$0.00",
  //           total: 0,
  //           formattedTotal: "$0.00",
  //           itemCount: 0,
  //         })
  //         return
  //       }

  //       const cartData = await wixService.getCart()
  //       setCart(cartData)
  //     } catch (error) {
  //       console.error("Error fetching cart:", error)
  //       // Set an empty cart on error
  //       setCart({
  //         id: "",
  //         items: [],
  //         subtotal: 0,
  //         formattedSubtotal: "$0.00",
  //         total: 0,
  //         formattedTotal: "$0.00",
  //         itemCount: 0,
  //       })

  //       toast({
  //         title: "Error",
  //         description: "Failed to load your shopping cart",
  //         variant: "destructive",
  //       })
  //     } finally {
  //       setIsCartLoading(false)
  //     }
  //   }

  //   fetchCart()
  // }, [isAuthenticated])

  // Add to cart
  const addToCart = async (productId: string, quantity = 1, options?: Record<string, string>) => {
    setIsCartLoading(true)

    // Find the product
    const product = DUMMY_PRODUCTS.find((p) => p.id === productId)

    if (!product) {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      })
      setIsCartLoading(false)
      return
    }

    // Add the product to the cart
    const newItem: CartItem = {
      id: `item-${Date.now()}`,
      productId,
      name: product.name,
      quantity,
      price: product.price,
      formattedPrice: product.formattedPrice,
      image: product.images[0],
      options,
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Update cart
    const updatedCart: Cart = { ...cart! }
    updatedCart.items.push(newItem)
    updatedCart.itemCount += quantity
    updatedCart.subtotal += product.price * quantity
    updatedCart.formattedSubtotal = `$${updatedCart.subtotal.toFixed(2)}`
    updatedCart.tax = updatedCart.subtotal * 0.08
    updatedCart.formattedTax = `$${updatedCart.tax.toFixed(2)}`
    updatedCart.total = updatedCart.subtotal + updatedCart.tax
    updatedCart.formattedTotal = `$${updatedCart.total.toFixed(2)}`

    setCart(updatedCart)
    setIsCartLoading(false)

    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    })
  }

  // Update cart item
  const updateCartItem = async (itemId: string, quantity: number) => {
    setIsCartLoading(true)

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Find the item
    const updatedCart: Cart = { ...cart! }
    const itemIndex = updatedCart.items.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) {
      toast({
        title: "Error",
        description: "Item not found in cart",
        variant: "destructive",
      })
      setIsCartLoading(false)
      return
    }

    // Calculate difference
    const oldQuantity = updatedCart.items[itemIndex].quantity
    const quantityDiff = quantity - oldQuantity
    const priceDiff = updatedCart.items[itemIndex].price * quantityDiff

    // Update item quantity
    updatedCart.items[itemIndex].quantity = quantity

    // Update cart totals
    updatedCart.itemCount += quantityDiff
    updatedCart.subtotal += priceDiff
    updatedCart.formattedSubtotal = `$${updatedCart.subtotal.toFixed(2)}`
    updatedCart.tax = updatedCart.subtotal * 0.08
    updatedCart.formattedTax = `$${updatedCart.tax.toFixed(2)}`
    updatedCart.total = updatedCart.subtotal + updatedCart.tax
    updatedCart.formattedTotal = `$${updatedCart.total.toFixed(2)}`

    setCart(updatedCart)
    setIsCartLoading(false)
  }

  // Remove cart item
  const removeCartItem = async (itemId: string) => {
    setIsCartLoading(true)

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Find the item
    const updatedCart: Cart = { ...cart! }
    const itemIndex = updatedCart.items.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) {
      toast({
        title: "Error",
        description: "Item not found in cart",
        variant: "destructive",
      })
      setIsCartLoading(false)
      return
    }

    // Calculate amount to subtract
    const item = updatedCart.items[itemIndex]
    const subtractAmount = item.price * item.quantity
    const subtractQuantity = item.quantity

    // Remove the item
    updatedCart.items.splice(itemIndex, 1)

    // Update cart totals
    updatedCart.itemCount -= subtractQuantity
    updatedCart.subtotal -= subtractAmount
    updatedCart.formattedSubtotal = `$${updatedCart.subtotal.toFixed(2)}`
    updatedCart.tax = updatedCart.subtotal * 0.08
    updatedCart.formattedTax = `$${updatedCart.tax.toFixed(2)}`
    updatedCart.total = updatedCart.subtotal + updatedCart.tax
    updatedCart.formattedTotal = `$${updatedCart.total.toFixed(2)}`

    setCart(updatedCart)
    setIsCartLoading(false)

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    })
  }

  // Clear cart
  const clearCart = async () => {
    setIsCartLoading(true)

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Create empty cart
    const emptyCart: Cart = {
      id: cart?.id || "dummy-cart-id",
      items: [],
      subtotal: 0,
      formattedSubtotal: "$0.00",
      tax: 0,
      formattedTax: "$0.00",
      total: 0,
      formattedTotal: "$0.00",
      itemCount: 0,
    }

    setCart(emptyCart)
    setIsCartLoading(false)

    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  // Create checkout
  const createCheckout = async () => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Create a dummy checkout ID
    const checkoutId = `checkout-${Date.now()}`

    toast({
      title: "Checkout created",
      description: "Redirecting to checkout page",
    })

    return checkoutId
  }

  // Fetch product
  const fetchProduct = async (idOrSlug: string, isSlug = false) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find product by ID or slug
    if (isSlug) {
      return DUMMY_PRODUCTS.find((p) => p.slug === idOrSlug) || null
    } else {
      return DUMMY_PRODUCTS.find((p) => p.id === idOrSlug) || null
    }
  }

  // Fetch products
  const fetchProducts = async (limit = 100, offset = 0) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return slice of dummy products
    return DUMMY_PRODUCTS.slice(offset, offset + limit)
  }

  // Fetch products by category
  const fetchProductsByCategory = async (categoryId: string, limit = 100, offset = 0) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter by category (in a real app, this would filter by categoryIds)
    const filtered = DUMMY_PRODUCTS.filter((p) => p.categoryIds?.includes(categoryId) || true)

    // Return slice
    return filtered.slice(offset, offset + limit)
  }

  // Fetch products by collection
  const fetchProductsByCollection = async (collectionId: string, limit = 100, offset = 0) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter by collection (in a real app, this would filter by collectionIds)
    const filtered = DUMMY_PRODUCTS.filter((p) => p.collectionIds?.includes(collectionId) || true)

    // Return slice
    return filtered.slice(offset, offset + limit)
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
