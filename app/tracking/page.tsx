"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import ShipmentTracker from "@/components/shipment-tracker"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [carrierCode, setCarrierCode] = useState<string | undefined>(undefined)
  const [searchedTracking, setSearchedTracking] = useState<string | null>(null)
  const [searchedCarrier, setSearchedCarrier] = useState<string | undefined>(undefined)

  const handleSearch = () => {
    if (trackingNumber) {
      setSearchedTracking(trackingNumber)
      setSearchedCarrier(carrierCode)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your tracking number to see the status of your shipment</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shipment Tracking</CardTitle>
            <CardDescription>Enter your tracking number and select a carrier (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Select value={carrierCode} onValueChange={setCarrierCode}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usps">USPS</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSearch} className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Track Shipment
            </Button>
          </CardFooter>
        </Card>

        {searchedTracking && <ShipmentTracker trackingNumber={searchedTracking} carrierCode={searchedCarrier} />}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">How long does shipping take?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Standard shipping typically takes 3-5 business days. Express shipping takes 1-2 business days.
              </p>
            </div>
            <div>
              <h3 className="font-medium">What carriers do you use?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We primarily ship with USPS, UPS, and FedEx, depending on the destination and shipping method selected.
              </p>
            </div>
            <div>
              <h3 className="font-medium">My tracking number isn't working. What should I do?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tracking information may take 24-48 hours to appear in the carrier's system after your order ships. If
                it's been longer than that, please contact our support team.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Do you ship internationally?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Yes, we ship worldwide! International shipping rates apply and will be calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
