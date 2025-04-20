"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useShipping } from "@/contexts/shipping-context"
import type { Address, Parcel, ShippingRate } from "@/lib/shipengine-service"

interface ShippingRateSelectorProps {
  fromAddress: Address
  toAddress: Address
  parcel: Parcel
  onRateSelect: (rate: ShippingRate) => void
  selectedRateId?: string
}

export default function ShippingRateSelector({
  fromAddress,
  toAddress,
  parcel,
  onRateSelect,
  selectedRateId,
}: ShippingRateSelectorProps) {
  const [rates, setRates] = useState<ShippingRate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { getShippingRates } = useShipping()

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true)
      try {
        const shippingRates = await getShippingRates(fromAddress, toAddress, parcel)
        setRates(shippingRates)

        // Auto-select the first rate if none is selected
        if (shippingRates.length > 0 && !selectedRateId) {
          onRateSelect(shippingRates[0])
        }
      } catch (error) {
        console.error("Error fetching shipping rates:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (fromAddress && toAddress && parcel) {
      fetchRates()
    }
  }, [fromAddress, toAddress, parcel, getShippingRates, onRateSelect, selectedRateId])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (rates.length === 0) {
    return <div className="text-sm text-muted-foreground">No shipping rates available.</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Shipping Options</h3>
      <RadioGroup
        value={selectedRateId}
        onValueChange={(value) => {
          const selectedRate = rates.find((rate) => rate.rateId === value)
          if (selectedRate) {
            onRateSelect(selectedRate)
          }
        }}
      >
        <div className="space-y-2">
          {rates.map((rate) => (
            <div key={rate.rateId} className="flex items-start space-x-2">
              <RadioGroupItem value={rate.rateId} id={rate.rateId} className="mt-1" />
              <div className="flex-1 border rounded-md p-2">
                <Label htmlFor={rate.rateId} className="flex justify-between cursor-pointer">
                  <div>
                    <div className="font-medium">{rate.serviceName}</div>
                    <div className="text-sm text-muted-foreground">
                      {rate.carrierFriendlyName} - Estimated delivery in {rate.deliveryDays} day
                      {rate.deliveryDays !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="font-medium">{rate.formattedAmount}</div>
                </Label>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
