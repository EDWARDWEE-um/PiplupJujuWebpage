"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"

export default function WixCart() {
  const { cart, isCartLoading, updateCartItem, removeCartItem, clearCart, createCheckout } = useWixEcommerce()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleUpdateQuantity = async (itemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity < 1) return
    await updateCartItem(itemId, newQuantity)
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeCartItem(itemId)
  }

  const handleClearCart = async () => {
    await clearCart()
  }

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true)
      const checkoutId = await createCheckout()
      // Redirect to checkout page
      window.location.href = `/checkout?id=${checkoutId}`
    } catch (error) {
      console.error("Error creating checkout:", error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (isCartLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-4 pb-4 border-b">
              <Skeleton className="h-20 w-20 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!cart || cart.items.length === 0) {
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
          <span>Your Cart ({cart.itemCount} items)</span>
          <Button variant="ghost" size="sm" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
            <div className="flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg?height=80&width=80"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{item.name}</h3>
              {item.options && Object.entries(item.options).length > 0 && (
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
                  onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
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
              <div className="font-medium">{item.formattedPrice}</div>
            </div>
          </div>
        ))}

        <div className="space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{cart.formattedSubtotal}</span>
          </div>
          {cart.formattedTax && (
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>{cart.formattedTax}</span>
            </div>
          )}
          {cart.formattedShipping && (
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{cart.formattedShipping}</span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{cart.formattedTotal}</span>
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
