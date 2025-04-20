"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, Clock, MapPin, Package, Truck } from "lucide-react"
import { useShipping } from "@/contexts/shipping-context"
import type { TrackingInfo, TrackingEvent } from "@/lib/shipengine-service"

interface ShipmentTrackerProps {
  trackingNumber: string
  carrierCode?: string
}

export default function ShipmentTracker({ trackingNumber, carrierCode }: ShipmentTrackerProps) {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { trackShipment } = useShipping()

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      setIsLoading(true)
      try {
        const info = await trackShipment(trackingNumber, carrierCode)
        setTrackingInfo(info)
      } catch (error) {
        console.error("Error fetching tracking info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (trackingNumber) {
      fetchTrackingInfo()
    }
  }, [trackingNumber, carrierCode, trackShipment])

  const getStatusBadge = (statusCode: string) => {
    switch (statusCode) {
      case "PR":
        return <Badge className="bg-gray-500">Pre-Transit</Badge>
      case "IT":
        return <Badge className="bg-blue-500">In Transit</Badge>
      case "OD":
        return <Badge className="bg-yellow-500 text-black">Out for Delivery</Badge>
      case "DE":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "EX":
        return <Badge className="bg-purple-500">Exception</Badge>
      case "AT":
        return <Badge className="bg-orange-500">Attempted Delivery</Badge>
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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-6 pb-4">
                <Skeleton className="absolute top-0 left-0 h-5 w-5 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!trackingInfo) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No tracking information available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          Shipment Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2 p-3 bg-muted rounded-lg">
          <div>
            <p className="text-sm font-medium">Tracking Number</p>
            <p className="text-sm">{trackingInfo.trackingNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Carrier</p>
            <p className="text-sm">{trackingInfo.carrierName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Status</p>
            <div>{getStatusBadge(trackingInfo.statusCode)}</div>
          </div>
        </div>

        {/* Delivery Progress */}
        <div className="space-y-2">
          <div className="relative">
            <div className="flex justify-between mb-2">
              <div className="text-xs">Pre-Transit</div>
              <div className="text-xs">In Transit</div>
              <div className="text-xs">Out for Delivery</div>
              <div className="text-xs">Delivered</div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width:
                    trackingInfo.statusCode === "PR"
                      ? "10%"
                      : trackingInfo.statusCode === "IT"
                        ? "40%"
                        : trackingInfo.statusCode === "OD"
                          ? "75%"
                          : trackingInfo.statusCode === "DE"
                            ? "100%"
                            : "25%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        {trackingInfo.estimatedDelivery && trackingInfo.statusCode !== "DE" && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">{formatDate(trackingInfo.estimatedDelivery)}</p>
            </div>
          </div>
        )}

        {/* Tracking Events */}
        <div className="space-y-4 pt-2">
          <h3 className="font-medium">Tracking History</h3>
          {trackingInfo.events.map((event: TrackingEvent, index: number) => (
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
                  trackingInfo.statusCode === "DE" ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <Package className="h-3 w-3" />
                  )
                ) : (
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{event.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-muted-foreground">
                  {event.locationCity && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {event.locationCity}, {event.locationState} {event.locationCountry}
                      </span>
                    </div>
                  )}
                  <div>{formatDate(event.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
