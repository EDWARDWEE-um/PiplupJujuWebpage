"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, CreditCard } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useWixEcommerce } from "@/contexts/wix-ecommerce-context"
import { useShipping } from "@/contexts/shipping-context"
import ShippingRateSelector from "@/components/shipping-rate-selector"
import type { Address, Parcel, ShippingRate } from "@/lib/shipengine-service"
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { cart, isCartLoading, createCheckout } = useWixEcommerce()
  const { validateAddress } = useShipping()

  const [isLoading, setIsLoading] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [selectedShippingRate, setSelectedShippingRate] = useState<ShippingRate | null>(null)

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("US")

  // Initialize form with user data if available
  useEffect(() => {
    if (user) {
      setEmail(user.email || "")
      const nameParts = user.name?.split(" ") || []
      if (nameParts.length > 0) {
        setFirstName(nameParts[0])
        if (nameParts.length > 1) {
          setLastName(nameParts.slice(1).join(" "))
        }
      }
    }
  }, [user])

  // Shipping address for rate calculation
  const shippingAddress: Address = {
    name: `${firstName} ${lastName}`.trim(),
    street1: address1,
    street2: address2 || undefined,
    city,
    state,
    postalCode: zip,
    country,
    phone: phone || undefined,
    email: email || undefined,
  }

  // Store address for rate calculation
  const storeAddress: Address = {
    name: "PokéCollect Store",
    street1: "123 Trading Card Lane",
    city: "San Francisco",
    state: "CA",
    postalCode: "94103",
    country: "US",
  }

  // Package details for rate calculation
  const packageDetails: Parcel = {
    weight: {
      value: 1,
      unit: "pound",
    },
    dimensions: {
      length: 12,
      width: 8,
      height: 2,
      unit: "inch",
    },
  }

  const handleShippingRateSelect = (rate: ShippingRate) => {
    setSelectedShippingRate(rate)
  }

  const handleSubmitOrder = async () => {
    if (!cart) return

    // Validate form
    if (!firstName || !lastName || !email || !address1 || !city || !state || !zip) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      })
      return
    }

    // Validate shipping rate selection
    if (!selectedShippingRate) {
      toast({
        title: "Shipping method required",
        description: "Please select a shipping method",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Validate address
      const validatedAddress = await validateAddress(shippingAddress)

      // Create checkout in Wix
      const checkoutId = await createCheckout()

      // In a real implementation, you would:
      // 1. Save the shipping rate selection
      // 2. Update the checkout with shipping details
      // 3. Redirect to payment processing

      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You've earned loyalty points!",
      })

      setIsLoading(false)
      router.push("/checkout/confirmation")
    } catch (error) {
      console.error("Error processing order:", error)
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  if (isCartLoading) {
    return (
      <div className="container py-8 text-center">
        <p>Loading checkout...</p>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some items to your cart before proceeding to checkout.</p>
        <Button asChild>
          <Link href="/products/sealed">Shop Now</Link>
        </Button>
      </div>
    )
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
                <CardTitle className="text-base sm:text-lg">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="first-name" className="text-xs sm:text-sm">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="last-name" className="text-xs sm:text-sm">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="address1" className="text-xs sm:text-sm">
                    Address Line 1
                  </Label>
                  <Input
                    id="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="h-9 sm:h-10 text-sm"
                    required
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="address2" className="text-xs sm:text-sm">
                    Address Line 2 (Optional)
                  </Label>
                  <Input
                    id="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="h-9 sm:h-10 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="city" className="text-xs sm:text-sm">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="state" className="text-xs sm:text-sm">
                      State
                    </Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger id="state" className="h-9 sm:h-10 text-sm">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="AR">Arkansas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="DE">Delaware</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="HI">Hawaii</SelectItem>
                        <SelectItem value="ID">Idaho</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="IN">Indiana</SelectItem>
                        <SelectItem value="IA">Iowa</SelectItem>
                        <SelectItem value="KS">Kansas</SelectItem>
                        <SelectItem value="KY">Kentucky</SelectItem>
                        <SelectItem value="LA">Louisiana</SelectItem>
                        <SelectItem value="ME">Maine</SelectItem>
                        <SelectItem value="MD">Maryland</SelectItem>
                        <SelectItem value="MA">Massachusetts</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                        <SelectItem value="MN">Minnesota</SelectItem>
                        <SelectItem value="MS">Mississippi</SelectItem>
                        <SelectItem value="MO">Missouri</SelectItem>
                        <SelectItem value="MT">Montana</SelectItem>
                        <SelectItem value="NE">Nebraska</SelectItem>
                        <SelectItem value="NV">Nevada</SelectItem>
                        <SelectItem value="NH">New Hampshire</SelectItem>
                        <SelectItem value="NJ">New Jersey</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="ND">North Dakota</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="OK">Oklahoma</SelectItem>
                        <SelectItem value="OR">Oregon</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="RI">Rhode Island</SelectItem>
                        <SelectItem value="SC">South Carolina</SelectItem>
                        <SelectItem value="SD">South Dakota</SelectItem>
                        <SelectItem value="TN">Tennessee</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="UT">Utah</SelectItem>
                        <SelectItem value="VT">Vermont</SelectItem>
                        <SelectItem value="VA">Virginia</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                        <SelectItem value="WV">West Virginia</SelectItem>
                        <SelectItem value="WI">Wisconsin</SelectItem>
                        <SelectItem value="WY">Wyoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="zip" className="text-xs sm:text-sm">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="country" className="text-xs sm:text-sm">
                      Country
                    </Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger id="country" className="h-9 sm:h-10 text-sm">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
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
                {firstName && lastName && address1 && city && state && zip ? (
                  <ShippingRateSelector
                    fromAddress={storeAddress}
                    toAddress={shippingAddress}
                    parcel={packageDetails}
                    onRateSelect={handleShippingRateSelect}
                    selectedRateId={selectedShippingRate?.rateId}
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Please fill out your shipping address to see available shipping options.
                  </div>
                )}
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
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4">
                    <Image
                      src={item.image || "/placeholder.svg?height=80&width=80"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover w-16 h-16 sm:w-20 sm:h-20"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-xs sm:text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Quantity: {item.quantity}</div>
                      <div className="text-xs sm:text-sm font-medium">{item.formattedPrice}</div>
                    </div>
                  </div>
                ))}

                <Separator className="my-3 sm:my-4" />

                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span>{cart.formattedSubtotal}</span>
                  </div>
                  {selectedShippingRate && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Shipping ({selectedShippingRate.serviceName})</span>
                      <span>{selectedShippingRate.formattedAmount}</span>
                    </div>
                  )}
                  {cart.formattedTax && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Tax</span>
                      <span>{cart.formattedTax}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-sm sm:text-base">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(cart.total + (selectedShippingRate ? selectedShippingRate.amount : 0))}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-muted p-3 rounded-md mt-3 sm:mt-4">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <div className="text-xs sm:text-sm">
                    You'll earn <span className="font-medium">{Math.floor(cart.total)}</span> loyalty points with this
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
