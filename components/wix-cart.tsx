"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useState } from "react"

// Dummy cart data
const DUMMY_CART_ITEMS = [
  {
    id: "item1",
    name: "Charizard V (Cherry Holo)",
    quantity: 2,
    price: 89.99,
    formattedPrice: "$89.99",
    image: "/placeholder.svg?key=l4j1u",
    options: { condition: "Near Mint", language: "English" },
  },
  {
    id: "item2",
    name: "Pikachu VMax Rainbow Rare",
    quantity: 1,
    price: 129.99,
    formattedPrice: "$129.99",
    image: "/placeholder.svg?key=4kk4w",
    options: { condition: "Mint", language: "Japanese" },
  },
  {
    id: "item3",
    name: "Scarlet & Violet Booster Box",
    quantity: 1,
    price: 149.99,
    formattedPrice: "$149.99",
    image: "/placeholder.svg?key=rpxhl",
    options: {},
  },
]

export default function WixCart() {
  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + tax

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Handle update quantity
  const handleUpdateQuantity = (itemId: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  // Handle remove item
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  // Handle clear cart
  const handleClearCart = () => {
    setCartItems([])
  }

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout delay
    setTimeout(() => {
      setIsCheckingOut(false)
      alert("This is a dummy checkout. In a real implementation, you would be redirected to a checkout page.")
    }, 1500)
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="text-center p-6">
          <div className="flex flex-col items-center gap-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="mt-4">
              <Link href="/products/sealed">Start Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Cart ({cartItems.length} items)</span>
          <Button variant="ghost" size="sm" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
            <div className="flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{item.name}</h3>
              {Object.entries(item.options).length > 0 && (
                <div className="text-xs text-muted-foreground">
                  {Object.entries(item.options).map(([key, value]) => (
                    <div key={key}>
                      {key}: {value}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground ml-2"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
            </div>
          </div>
        ))}

        <div className="space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
          {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </CardFooter>
    </Card>
  )
}
