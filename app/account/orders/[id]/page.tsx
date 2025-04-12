"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, ChevronLeft, Flame, Package, Truck, MapPin, Clock, CheckCircle, ExternalLink } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { type TrackingInfo, type TrackingStatus, getTrackingService } from "@/lib/delivery-tracking"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isTrackingLoading, setIsTrackingLoading] = useState(false)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // Fetch tracking info when component mounts
    const fetchTrackingInfo = async () => {
      setIsTrackingLoading(true)
      try {
        // In a real app, we would get the tracking number from the order data
        // For this demo, we'll use the order ID as a mock tracking number
        const trackingService = getTrackingService()
        const info = await trackingService.trackShipment({
          trackingNumber: `9400123456${params.id}`,
          carrier: "usps",
        })
        setTrackingInfo(info)
      } catch (error) {
        console.error("Error fetching tracking info:", error)
      } finally {
        setIsTrackingLoading(false)
      }
    }

    fetchTrackingInfo()
  }, [params.id])

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
    carrier: "USPS",
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

  const getTrackingStatusBadge = (status: TrackingStatus) => {
    switch (status) {
      case "pre_transit":
        return <Badge className="bg-gray-500">Label Created</Badge>
      case "in_transit":
        return <Badge className="bg-blue-500">In Transit</Badge>
      case "out_for_delivery":
        return <Badge className="bg-yellow-500 text-black">Out for Delivery</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "available_for_pickup":
        return <Badge className="bg-purple-500">Available for Pickup</Badge>
      case "return_to_sender":
        return <Badge className="bg-red-500">Return to Sender</Badge>
      case "failure":
        return <Badge className="bg-red-700">Delivery Failed</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }

    return new Date(dateString).toLocaleDateString("en-US", options)
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
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Truck className="h-5 w-5 text-blue-500" />
                      Shipment Tracking
                    </CardTitle>
                    {trackingInfo && getTrackingStatusBadge(trackingInfo.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-2 p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Tracking Number</p>
                      <p className="text-sm">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Carrier</p>
                      <p className="text-sm">{order.carrier}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ship Date</p>
                      <p className="text-sm">{order.shipDate}</p>
                    </div>
                  </div>

                  {isTrackingLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                        <div className="h-4 w-32 bg-muted rounded mb-2"></div>
                        <div className="h-3 w-24 bg-muted rounded"></div>
                      </div>
                    </div>
                  ) : trackingInfo ? (
                    <div className="space-y-4">
                      {/* Delivery Progress */}
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="flex justify-between mb-2">
                            <div className="text-xs">Label Created</div>
                            <div className="text-xs">In Transit</div>
                            <div className="text-xs">Out for Delivery</div>
                            <div className="text-xs">Delivered</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-primary rounded-full`}
                              style={{
                                width:
                                  trackingInfo.status === "pre_transit"
                                    ? "10%"
                                    : trackingInfo.status === "in_transit"
                                      ? "40%"
                                      : trackingInfo.status === "out_for_delivery"
                                        ? "75%"
                                        : trackingInfo.status === "delivered"
                                          ? "100%"
                                          : "25%",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Estimated Delivery */}
                      {trackingInfo.estimatedDelivery && trackingInfo.status !== "delivered" && (
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Estimated Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(trackingInfo.estimatedDelivery).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Tracking Events Accordion */}
                      <Accordion type="single" collapsible defaultValue="tracking-history">
                        <AccordionItem value="tracking-history">
                          <AccordionTrigger className="text-sm font-medium">Tracking History</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              {trackingInfo.events.map((event, index) => (
                                <div key={index} className="relative pl-6 pb-4">
                                  {index !== trackingInfo.events.length - 1 && (
                                    <div className="absolute top-2 left-[9px] bottom-0 w-[2px] bg-muted"></div>
                                  )}
                                  <div
                                    className={`absolute top-2 left-0 h-5 w-5 rounded-full flex items-center justify-center ${
                                      index === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                                    }`}
                                  >
                                    {index === 0 ? (
                                      trackingInfo.status === "delivered" ? (
                                        <CheckCircle className="h-3 w-3" />
                                      ) : (
                                        <Package className="h-3 w-3" />
                                      )
                                    ) : (
                                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{event.status}</p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{event.location}</span>
                                      </div>
                                      <div>{formatDate(event.timestamp)}</div>
                                    </div>
                                    <p className="text-xs mt-1">{event.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <div>Last updated: {formatDate(trackingInfo.lastUpdated)}</div>
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View on {trackingInfo.carrier.toUpperCase()}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      Tracking information is not available at this time. Please check back later.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="font-medium text-sm">Payment Method</div>
                    <div className="text-sm">{order.paymentMethod}</div>
                  </div>
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
