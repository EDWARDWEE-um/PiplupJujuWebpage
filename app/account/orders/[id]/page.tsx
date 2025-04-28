"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, ChevronLeft, Flame, Package } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import ShipmentTracker from "@/components/shipment-tracker"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  // Mock order data based on ID
  const order = {
    id: params.id,
    date: "June 10, 2023",
    status: "processing",
    total: 149.99,
    subtotal: 149.99,
    tax: 10.5,
    shipping: 4.99,
    paymentMethod: "Credit Card (**** 1234)",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Scarlet & Violet Booster Box",
        price: 149.99,
        image: "/placeholder.svg?height=80&width=80",
        quantity: 1,
        ripOrShip: "rip",
        ripDate: "June 18, 2023 at 7:00 PM EST",
      },
    ],
    trackingNumber: `9400123456${params.id}`,
    carrier: "usps",
    shipDate: "June 12, 2023",
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-yellow-500 text-black">Processing</Badge>
      case "shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "completed":
        return <Badge className="bg-purple-500">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="container py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 md:mb-6">
          <Button variant="ghost" size="sm" className="mb-2 md:mb-4 px-0 md:px-2" asChild>
            <Link href="/account/orders">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Orders
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 md:gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Order #{order.id}</h1>
              <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
            </div>
            <div className="flex items-center gap-2">{getStatusBadge(order.status)}</div>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-3 md:gap-4 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                        {item.ripOrShip && (
                          <div className="text-sm flex items-center mt-1">
                            {item.ripOrShip === "rip" ? (
                              <>
                                <Flame className="h-3 w-3 mr-1 text-red-500" />
                                <span>Live Rip</span>
                              </>
                            ) : (
                              <>
                                <Package className="h-3 w-3 mr-1 text-blue-500" />
                                <span>Ship Sealed</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {order.items.some((item) => item.ripOrShip === "rip") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Calendar className="h-5 w-5 text-red-500" />
                    Live Rip Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items
                      .filter((item) => item.ripOrShip === "rip")
                      .map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">Scheduled for {item.ripDate}</div>
                          </div>
                          <Button size="sm">Add to Calendar</Button>
                        </div>
                      ))}
                    <div className="text-sm text-muted-foreground mt-2">
                      You'll receive an email with the livestream link before the event. Make sure to join on time to
                      watch your packs being opened!
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Integrated Tracking Information */}
            {order.trackingNumber && (
              <ShipmentTracker trackingNumber={order.trackingNumber} carrierCode={order.carrier} />
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-sm sm:text-base">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="font-medium text-sm">Payment Method</div>
                  <div className="text-sm">{order.paymentMethod}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {order.shippingAddress.name}
                  <br />
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  <br />
                  {order.shippingAddress.country}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              <Button variant="outline" asChild>
                <Link href="/contact">Need Help?</Link>
              </Button>
              {order.status === "delivered" && <Button>Write a Review</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
