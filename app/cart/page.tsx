"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Award, Flame, Minus, Package, ShoppingCart, Trash2, Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function CartPage() {
  const { isAuthenticated } = useAuth()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Scarlet & Violet Booster Box",
      price: 149.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      type: "sealed",
      ripOrShipEligible: true,
      ripOrShip: "rip",
    },
    {
      id: 2,
      name: "Charizard VMAX (PSA 10)",
      price: 299.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      type: "slab",
      ripOrShipEligible: false,
    },
    {
      id: 3,
      name: "Pikachu V Full Art",
      price: 24.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 2,
      type: "single",
      ripOrShipEligible: false,
    },
  ])
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const updateRipOrShip = (id: number, option: string) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, ripOrShip: option } : item)))
  }

  const handleApplyPromo = () => {
    setIsApplyingPromo(true)
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "pokemon10") {
        setPromoApplied(true)
        toast({
          title: "Promo code applied",
          description: "10% discount has been applied to your order.",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateDiscount = () => {
    return promoApplied ? calculateSubtotal() * 0.1 : 0
  }

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * 0.07 // 7% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax()
  }

  const calculateLoyaltyPoints = () => {
    let points = Math.floor(calculateSubtotal())

    // Double points for rip or ship items
    cartItems.forEach((item) => {
      if (item.ripOrShipEligible) {
        points += Math.floor(item.price * item.quantity)
      }
    })

    return points
  }

  return (
    <div className="container py-6 sm:py-8 md:py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Your Cart</h1>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-[1fr_350px]">
            <div>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    Cart Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 sm:space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover w-20 h-20"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                            <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                          </div>
                          <div className="font-medium text-sm sm:text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <div className="h-8 px-3 flex items-center justify-center border-y text-sm">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>

                          {item.ripOrShipEligible && (
                            <div className="flex-1">
                              <RadioGroup
                                defaultValue={item.ripOrShip}
                                onValueChange={(value) => updateRipOrShip(item.id, value)}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="rip" id={`rip-${item.id}`} />
                                  <Label
                                    htmlFor={`rip-${item.id}`}
                                    className="text-xs sm:text-sm font-normal cursor-pointer flex items-center"
                                  >
                                    <Flame className="h-3 w-3 mr-1 text-red-500" />
                                    Rip
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="ship" id={`ship-${item.id}`} />
                                  <Label
                                    htmlFor={`ship-${item.id}`}
                                    className="text-xs sm:text-sm font-normal cursor-pointer flex items-center"
                                  >
                                    <Package className="h-3 w-3 mr-1 text-blue-500" />
                                    Ship
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          )}

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between p-4 sm:p-6">
                  <Button variant="outline" asChild className="text-xs sm:text-sm h-9">
                    <Link href="/products/sealed">Continue Shopping</Link>
                  </Button>
                  <Button variant="ghost" onClick={() => setCartItems([])} className="text-xs sm:text-sm h-9">
                    Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-xs sm:text-sm text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${calculateDiscount().toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Estimated Tax</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium text-sm sm:text-base">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                    <Label htmlFor="promo-code" className="text-xs sm:text-sm">
                      Promo Code
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="promo-code"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="h-9 text-sm"
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={!promoCode || isApplyingPromo || promoApplied}
                        className="h-9 text-xs sm:text-sm"
                      >
                        {isApplyingPromo ? "Applying..." : promoApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-green-600">Promo code "POKEMON10" applied successfully!</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-muted p-3 rounded-md mt-3 sm:mt-4">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                    <div className="text-xs sm:text-sm">
                      You'll earn <span className="font-medium">{calculateLoyaltyPoints()}</span> loyalty points with
                      this purchase!
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 sm:p-6">
                  <Button className="w-full h-9 sm:h-10 text-sm sm:text-base" size="lg" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardFooter>
              </Card>

              <div className="text-center text-xs sm:text-sm text-muted-foreground">
                Need help?{" "}
                <Link href="/contact" className="underline">
                  Contact our support team
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Card className="text-center p-6 sm:p-8">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
              <h2 className="text-lg sm:text-xl font-semibold">Your cart is empty</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild className="mt-3 sm:mt-4 text-sm h-9 sm:h-10">
                <Link href="/products/sealed">Start Shopping</Link>
              </Button>
            </div>
          </Card>
        )}

        {!isAuthenticated && cartItems.length > 0 && (
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 border rounded-lg bg-muted/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div>
                <h3 className="font-medium text-sm sm:text-base">Already have an account?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Sign in to earn loyalty points with your purchase!
                </p>
              </div>
              <Button variant="outline" asChild className="w-full sm:w-auto text-xs sm:text-sm h-9">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
