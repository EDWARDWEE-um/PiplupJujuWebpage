"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  type Address,
  type Parcel,
  type ShippingRate,
  type TrackingInfo,
  type ShippingLabel,
  getShipEngineService,
} from "@/lib/shipengine-service"
import { toast } from "@/hooks/use-toast"

interface ShippingContextType {
  isLoading: boolean
  getShippingRates: (fromAddress: Address, toAddress: Address, parcel: Parcel) => Promise<ShippingRate[]>
  trackShipment: (trackingNumber: string, carrierCode?: string) => Promise<TrackingInfo>
  createShippingLabel: (
    fromAddress: Address,
    toAddress: Address,
    parcel: Parcel,
    serviceCode: string,
    carrierCode: string,
  ) => Promise<ShippingLabel>
  validateAddress: (address: Address) => Promise<Address>
}

const ShippingContext = createContext<ShippingContextType | undefined>(undefined)

export function ShippingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const shipEngineService = getShipEngineService()

  const getShippingRates = async (fromAddress: Address, toAddress: Address, parcel: Parcel) => {
    try {
      setIsLoading(true)
      return await shipEngineService.getShippingRates(fromAddress, toAddress, parcel)
    } catch (error) {
      console.error("Error getting shipping rates:", error)
      toast({
        title: "Error",
        description: "Failed to get shipping rates",
        variant: "destructive",
      })
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const trackShipment = async (trackingNumber: string, carrierCode?: string) => {
    try {
      setIsLoading(true)
      return await shipEngineService.trackShipment(trackingNumber, carrierCode)
    } catch (error) {
      console.error("Error tracking shipment:", error)
      toast({
        title: "Error",
        description: "Failed to track shipment",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createShippingLabel = async (
    fromAddress: Address,
    toAddress: Address,
    parcel: Parcel,
    serviceCode: string,
    carrierCode: string,
  ) => {
    try {
      setIsLoading(true)
      return await shipEngineService.createShippingLabel(fromAddress, toAddress, parcel, serviceCode, carrierCode)
    } catch (error) {
      console.error("Error creating shipping label:", error)
      toast({
        title: "Error",
        description: "Failed to create shipping label",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const validateAddress = async (address: Address) => {
    try {
      setIsLoading(true)
      return await shipEngineService.validateAddress(address)
    } catch (error) {
      console.error("Error validating address:", error)
      toast({
        title: "Warning",
        description: "Address validation failed, using original address",
        variant: "destructive",
      })
      return address
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ShippingContext.Provider
      value={{
        isLoading,
        getShippingRates,
        trackShipment,
        createShippingLabel,
        validateAddress,
      }}
    >
      {children}
    </ShippingContext.Provider>
  )
}

export function useShipping() {
  const context = useContext(ShippingContext)
  if (context === undefined) {
    throw new Error("useShipping must be used within a ShippingProvider")
  }
  return context
}
