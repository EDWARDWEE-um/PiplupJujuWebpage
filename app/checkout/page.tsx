"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Award, CreditCard, Flame, Package, Truck } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [consolidatedShipping, setConsolidatedShipping] = useState(true)
  const [ripOrShipOptions, setRipOrShipOptions] = useState({
    1: "rip",
    2: "ship",
  })

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Scarlet & Violet Booster Box",
      price: 149.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      type: "sealed",
      ripOrShipEligible: true,
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
  ]

  const handleRipOrShipChange = (id: number, value: string) => {
    setRipOrShipOptions((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateShipping = () => {
    if (consolidatedShipping) {
      // One shipping fee for all items
      switch (shippingMethod) {
        case "express":
          return 14.99
        case "priority":
          return 9.99
        default: // standard
          return 4.99
      }
    } else {
      // Separate shipping fee for each item
      let total = 0
      cartItems.forEach((item) => {
        // Skip shipping calculation for items that will be ripped
        if (item.ripOrShipEligible && ripOrShipOptions[item.id] === "rip") {
          return
        }

        switch (shippingMethod) {
          case "express":
            total += 14.99
            break
          case "priority":
            total += 9.99
            break
          default: // standard
            total += 4.99
            break
        }
      })
      return total
    }
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.07 // 7% tax rate
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax()
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

  const handleSubmitOrder = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You've earned " + calculateLoyaltyPoints() + " loyalty points!",
    })

    setIsLoading(false)
    router.push("/checkout/confirmation")
  }

  return (
    <div className="container py-6 sm:py-8 md:py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Checkout</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Complete your purchase</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="first-name" className="text-xs sm:text-sm">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      defaultValue={user?.name?.split(" ")[0] || ""}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="last-name" className="text-xs sm:text-sm">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      defaultValue={user?.name?.split(" ")[1] || ""}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="address" className="text-xs sm:text-sm">
                    Address
                  </Label>
                  <Input id="address" className="h-9 sm:h-10 text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="city" className="text-xs sm:text-sm">
                      City
                    </Label>
                    <Input id="city" className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="state" className="text-xs sm:text-sm">
                      State
                    </Label>
                    <Select defaultValue="ca">
                      <SelectTrigger id="state" className="h-9 sm:h-10 text-sm">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                        <SelectItem value="il">Illinois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="zip" className="text-xs sm:text-sm">
                      ZIP Code
                    </Label>
                    <Input id="zip" className="h-9 sm:h-10 text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">
                      Phone
                    </Label>
                    <Input id="phone" type="tel" className="h-9 sm:h-10 text-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Shipping Method</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
                <RadioGroup defaultValue="standard" onValueChange={setShippingMethod}>
                  <div className="flex items-center justify-between space-x-2 border p-3 sm:p-4 rounded-md">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-normal cursor-pointer text-xs sm:text-sm">
                        Standard Shipping (3-5 business days)
                      </Label>
                    </div>
                    <div className="font-medium text-xs sm:text-sm">$4.99</div>
                  </div>
                  <div className="flex items-center justify-between space-x-2 border p-3 sm:p-4 rounded-md">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="priority" id="priority" />
                      <Label htmlFor="priority" className="font-normal cursor-pointer text-xs sm:text-sm">
                        Priority Shipping (2-3 business days)
                      </Label>
                    </div>
                    <div className="font-medium text-xs sm:text-sm">$9.99</div>
                  </div>
                  <div className="flex items-center justify-between space-x-2 border p-3 sm:p-4 rounded-md">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-normal cursor-pointer text-xs sm:text-sm">
                        Express Shipping (1-2 business days)
                      </Label>
                    </div>
                    <div className="font-medium text-xs sm:text-sm">$14.99</div>
                  </div>
                </RadioGroup>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="consolidated"
                    checked={consolidatedShipping}
                    onCheckedChange={(checked) => setConsolidatedShipping(checked as boolean)}
                  />
                  <Label htmlFor="consolidated" className="text-xs sm:text-sm font-normal cursor-pointer">
                    Use consolidated shipping (ship all items together in one package)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <Tabs defaultValue="credit-card">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="credit-card" className="text-xs sm:text-sm">
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="text-xs sm:text-sm">
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="text-xs sm:text-sm">
                      Crypto
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="credit-card" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="card-number" className="text-xs sm:text-sm">
                        Card Number
                      </Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="h-9 sm:h-10 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="expiry" className="text-xs sm:text-sm">
                          Expiry Date
                        </Label>
                        <Input id="expiry" placeholder="MM/YY" className="h-9 sm:h-10 text-sm" />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="cvc" className="text-xs sm:text-sm">
                          CVC
                        </Label>
                        <Input id="cvc" placeholder="123" className="h-9 sm:h-10 text-sm" />
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="name-on-card" className="text-xs sm:text-sm">
                        Name on Card
                      </Label>
                      <Input id="name-on-card" placeholder="John Doe" className="h-9 sm:h-10 text-sm" />
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="mt-3 sm:mt-4">
                    <div className="text-center py-6 sm:py-8">
                      <p className="mb-3 sm:mb-4 text-xs sm:text-sm">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                      <Button variant="outline" className="text-xs sm:text-sm h-9 sm:h-10">
                        Continue with PayPal
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="crypto" className="mt-3 sm:mt-4">
                    <div className="text-center py-6 sm:py-8">
                      <p className="mb-3 sm:mb-4 text-xs sm:text-sm">
                        We accept Bitcoin, Ethereum, and other major cryptocurrencies.
                      </p>
                      <Button variant="outline" className="text-xs sm:text-sm h-9 sm:h-10">
                        Pay with Crypto
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover w-16 h-16 sm:w-20 sm:h-20"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-xs sm:text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Quantity: {item.quantity}</div>
                      <div className="text-xs sm:text-sm font-medium">${item.price.toFixed(2)}</div>

                      {item.ripOrShipEligible && (
                        <div className="pt-1 sm:pt-2">
                          <RadioGroup
                            defaultValue={ripOrShipOptions[item.id]}
                            onValueChange={(value) => handleRipOrShipChange(item.id, value)}
                            className="flex gap-3 sm:gap-4"
                          >
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="rip" id={`rip-${item.id}`} />
                              <Label
                                htmlFor={`rip-${item.id}`}
                                className="text-xs font-normal cursor-pointer flex items-center"
                              >
                                <Flame className="h-3 w-3 mr-1 text-red-500" />
                                Rip
                              </Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="ship" id={`ship-${item.id}`} />
                              <Label
                                htmlFor={`ship-${item.id}`}
                                className="text-xs font-normal cursor-pointer flex items-center"
                              >
                                <Package className="h-3 w-3 mr-1 text-blue-500" />
                                Ship
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <Separator className="my-3 sm:my-4" />

                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Shipping</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-sm sm:text-base">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-muted p-3 rounded-md mt-3 sm:mt-4">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <div className="text-xs sm:text-sm">
                    You'll earn <span className="font-medium">{calculateLoyaltyPoints()}</span> loyalty points with this
                    purchase!
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-6">
                <Button
                  className="w-full h-9 sm:h-10 text-sm sm:text-base"
                  size="lg"
                  onClick={handleSubmitOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>

            <div className="text-center text-xs sm:text-sm text-muted-foreground">
              By placing your order, you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
