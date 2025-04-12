import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Package, Flame } from "lucide-react"

export default function CheckoutConfirmationPage() {
  return (
    <div className="container py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-6 sm:mb-8">
          <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-3 sm:mb-4" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Order #12345</CardTitle>
            <CardDescription className="text-xs sm:text-sm">June 15, 2023</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <div className="font-medium text-sm sm:text-base">Order Summary</div>
              <div className="border rounded-md divide-y">
                <div className="p-3 sm:p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Scarlet & Violet Booster Box</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Flame className="h-3 w-3 mr-1 text-red-500" />
                      Live Rip
                    </div>
                  </div>
                  <div className="font-medium text-xs sm:text-sm">$149.99</div>
                </div>
                <div className="p-3 sm:p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Charizard VMAX (PSA 10)</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Package className="h-3 w-3 mr-1 text-blue-500" />
                      Ship
                    </div>
                  </div>
                  <div className="font-medium text-xs sm:text-sm">$299.99</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="space-y-1 sm:space-y-2">
                <div className="font-medium text-sm sm:text-base">Shipping Address</div>
                <div className="text-xs sm:text-sm">
                  John Doe
                  <br />
                  123 Main St
                  <br />
                  Apt 4B
                  <br />
                  San Francisco, CA 94103
                  <br />
                  United States
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="font-medium text-sm sm:text-base">Payment Information</div>
                <div className="text-xs sm:text-sm">
                  Credit Card
                  <br />
                  **** **** **** 1234
                  <br />
                  Exp: 12/25
                </div>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <div className="font-medium text-sm sm:text-base">Order Total</div>
              <div className="border rounded-md p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                  <div>Subtotal:</div>
                  <div className="text-right">$449.98</div>
                  <div>Shipping:</div>
                  <div className="text-right">$4.99</div>
                  <div>Tax:</div>
                  <div className="text-right">$31.50</div>
                  <div className="font-medium">Total:</div>
                  <div className="text-right font-medium">$486.47</div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-3 sm:p-4 rounded-md">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <div className="font-medium text-sm sm:text-base">Live Rip Schedule</div>
              </div>
              <p className="text-xs sm:text-sm">Your Scarlet & Violet Booster Box is scheduled for Live Rip on:</p>
              <p className="font-medium text-sm sm:text-base mt-1 sm:mt-2">June 18, 2023 at 7:00 PM EST</p>
              <p className="text-xs text-muted-foreground mt-1">
                You'll receive an email with the livestream link before the event.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="text-xs sm:text-sm text-muted-foreground">
              You've earned <span className="font-medium">900</span> loyalty points with this purchase!
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
              <Link href="/account/orders" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full text-xs sm:text-sm h-9 sm:h-10">
                  View Order
                </Button>
              </Link>
              <Link href="/livestreams" className="w-full sm:w-auto">
                <Button className="w-full text-xs sm:text-sm h-9 sm:h-10">View Livestream Schedule</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-center">What's Next?</h2>
          <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm sm:text-base mb-1">Track Your Shipment</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You'll receive tracking information via email once your order ships.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Flame className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-red-500" />
                <h3 className="font-medium text-sm sm:text-base mb-1">Prepare for Live Rip</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Add the livestream to your calendar and join us for the excitement!
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium text-sm sm:text-base mb-1">Check Your Email</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We've sent a confirmation email with all your order details.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <Link href="/">
            <Button variant="outline" className="text-xs sm:text-sm h-9 sm:h-10">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
