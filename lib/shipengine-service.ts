/**
 * ShipEngine Integration Service
 *
 * This service provides utilities for integrating with ShipEngine API
 * to handle shipping rates, labels, tracking, and delivery estimates.
 */

// ShipEngine API types
export interface Address {
  name: string
  company?: string
  street1: string
  street2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  email?: string
}

export interface Parcel {
  weight: {
    value: number
    unit: "pound" | "ounce" | "gram" | "kilogram"
  }
  dimensions?: {
    length: number
    width: number
    height: number
    unit: "inch" | "centimeter"
  }
}

export interface ShippingRate {
  rateId: string
  carrierId: string
  serviceCode: string
  serviceName: string
  carrierCode: string
  carrierNickname: string
  carrierFriendlyName: string
  amount: number
  formattedAmount: string
  currency: string
  deliveryDays: number
  estimatedDeliveryDate: string
  guaranteedDelivery: boolean
  shipDate: string
  validUntil: string
}

export interface TrackingInfo {
  trackingNumber: string
  statusCode: string
  statusDescription: string
  carrierCode: string
  carrierName: string
  estimatedDelivery?: string
  actualDelivery?: string
  events: TrackingEvent[]
}

export interface TrackingEvent {
  timestamp: string
  description: string
  locationCity?: string
  locationState?: string
  locationCountry?: string
  statusCode: string
}

export interface ShippingLabel {
  labelId: string
  trackingNumber: string
  shipmentId: string
  carrierId: string
  serviceCode: string
  shipDate: string
  createdAt: string
  shipmentCost: number
  insuranceCost: number
  trackingStatus: string
  labelDownloadUrl: string
  formUrl: string
}

// ShipEngine Service
export class ShipEngineService {
  private apiKey: string
  private baseUrl = "https://api.shipengine.com/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private getHeaders() {
    return {
      "API-Key": this.apiKey,
      "Content-Type": "application/json",
    }
  }

  // Get shipping rates
  async getShippingRates(
    fromAddress: Address,
    toAddress: Address,
    parcel: Parcel,
    options?: {
      carrierIds?: string[]
      serviceCodes?: string[]
    },
  ): Promise<ShippingRate[]> {
    try {
      const response = await fetch(`${this.baseUrl}/rates`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          rate_options: {
            carrier_ids: options?.carrierIds,
            service_codes: options?.serviceCodes,
            packaging_type: "package",
            ship_date: new Date().toISOString().split("T")[0],
          },
          shipment: {
            validate_address: "no_validation",
            ship_to: toAddress,
            ship_from: fromAddress,
            packages: [
              {
                weight: parcel.weight,
                dimensions: parcel.dimensions,
              },
            ],
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`ShipEngine API error: ${errorData.message || response.statusText}`)
      }

      const data = await response.json()
      return data.rate_response.rates.map((rate: any) => ({
        rateId: rate.rate_id,
        carrierId: rate.carrier_id,
        serviceCode: rate.service_code,
        serviceName: rate.service_type,
        carrierCode: rate.carrier_code,
        carrierNickname: rate.carrier_nickname,
        carrierFriendlyName: rate.carrier_friendly_name,
        amount: rate.shipping_amount.amount,
        formattedAmount: this.formatPrice(rate.shipping_amount.amount),
        currency: rate.shipping_amount.currency,
        deliveryDays: rate.delivery_days,
        estimatedDeliveryDate: rate.estimated_delivery_date,
        guaranteedDelivery: rate.guaranteed_service,
        shipDate: rate.ship_date,
        validUntil: rate.negotiated_rate ? rate.negotiated_rate.valid_until : undefined,
      }))
    } catch (error) {
      console.error("Error fetching shipping rates:", error)
      // For demo purposes, return mock data
      return this.getMockShippingRates()
    }
  }

  // Track a shipment
  async trackShipment(trackingNumber: string, carrierCode?: string): Promise<TrackingInfo> {
    try {
      const queryParams = new URLSearchParams()
      if (carrierCode) {
        queryParams.append("carrier_code", carrierCode)
      }

      const response = await fetch(
        `${this.baseUrl}/tracking?tracking_number=${trackingNumber}&${queryParams.toString()}`,
        {
          method: "GET",
          headers: this.getHeaders(),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`ShipEngine API error: ${errorData.message || response.statusText}`)
      }

      const data = await response.json()
      return {
        trackingNumber: data.tracking_number,
        statusCode: data.status_code,
        statusDescription: data.status_description,
        carrierCode: data.carrier_code,
        carrierName: data.carrier_description,
        estimatedDelivery: data.estimated_delivery_date,
        actualDelivery: data.actual_delivery_date,
        events: data.events.map((event: any) => ({
          timestamp: event.occurred_at,
          description: event.description,
          locationCity: event.city_locality,
          locationState: event.state_province,
          locationCountry: event.country_code,
          statusCode: event.status_code,
        })),
      }
    } catch (error) {
      console.error("Error tracking shipment:", error)
      // For demo purposes, return mock data
      return this.getMockTrackingInfo(trackingNumber)
    }
  }

  // Create a shipping label
  async createShippingLabel(
    fromAddress: Address,
    toAddress: Address,
    parcel: Parcel,
    serviceCode: string,
    carrierCode: string,
  ): Promise<ShippingLabel> {
    try {
      const response = await fetch(`${this.baseUrl}/labels`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          shipment: {
            carrier_id: carrierCode,
            service_code: serviceCode,
            ship_to: toAddress,
            ship_from: fromAddress,
            packages: [
              {
                weight: parcel.weight,
                dimensions: parcel.dimensions,
              },
            ],
          },
          label_format: "pdf",
          label_download_type: "url",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`ShipEngine API error: ${errorData.message || response.statusText}`)
      }

      const data = await response.json()
      return {
        labelId: data.label_id,
        trackingNumber: data.tracking_number,
        shipmentId: data.shipment_id,
        carrierId: data.carrier_id,
        serviceCode: data.service_code,
        shipDate: data.ship_date,
        createdAt: data.created_at,
        shipmentCost: data.shipment_cost.amount,
        insuranceCost: data.insurance_cost.amount,
        trackingStatus: data.tracking_status,
        labelDownloadUrl: data.label_download.pdf,
        formUrl: data.form_download?.href || "",
      }
    } catch (error) {
      console.error("Error creating shipping label:", error)
      // For demo purposes, return mock data
      return this.getMockShippingLabel()
    }
  }

  // Validate an address
  async validateAddress(address: Address): Promise<Address> {
    try {
      const response = await fetch(`${this.baseUrl}/addresses/validate`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          address: {
            name: address.name,
            company_name: address.company,
            address_line1: address.street1,
            address_line2: address.street2,
            city_locality: address.city,
            state_province: address.state,
            postal_code: address.postalCode,
            country_code: address.country,
            phone: address.phone,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`ShipEngine API error: ${errorData.message || response.statusText}`)
      }

      const data = await response.json()
      const validatedAddress = data.address
      return {
        name: address.name,
        company: address.company,
        street1: validatedAddress.address_line1,
        street2: validatedAddress.address_line2,
        city: validatedAddress.city_locality,
        state: validatedAddress.state_province,
        postalCode: validatedAddress.postal_code,
        country: validatedAddress.country_code,
        phone: address.phone,
        email: address.email,
      }
    } catch (error) {
      console.error("Error validating address:", error)
      // Return the original address if validation fails
      return address
    }
  }

  // Helper methods
  private formatPrice(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Mock data for demo purposes
  private getMockShippingRates(): ShippingRate[] {
    const today = new Date()
    const shipDate = today.toISOString().split("T")[0]

    const deliveryDate1 = new Date(today)
    deliveryDate1.setDate(today.getDate() + 3)

    const deliveryDate2 = new Date(today)
    deliveryDate2.setDate(today.getDate() + 2)

    const deliveryDate3 = new Date(today)
    deliveryDate3.setDate(today.getDate() + 1)

    return [
      {
        rateId: "se-1234567",
        carrierId: "se-123456",
        serviceCode: "usps_priority",
        serviceName: "Priority Mail",
        carrierCode: "usps",
        carrierNickname: "USPS",
        carrierFriendlyName: "USPS",
        amount: 7.99,
        formattedAmount: "$7.99",
        currency: "USD",
        deliveryDays: 3,
        estimatedDeliveryDate: deliveryDate1.toISOString(),
        guaranteedDelivery: false,
        shipDate,
        validUntil: "",
      },
      {
        rateId: "se-2345678",
        carrierId: "se-234567",
        serviceCode: "usps_priority_express",
        serviceName: "Priority Mail Express",
        carrierCode: "usps",
        carrierNickname: "USPS",
        carrierFriendlyName: "USPS",
        amount: 24.99,
        formattedAmount: "$24.99",
        currency: "USD",
        deliveryDays: 1,
        estimatedDeliveryDate: deliveryDate3.toISOString(),
        guaranteedDelivery: true,
        shipDate,
        validUntil: "",
      },
      {
        rateId: "se-3456789",
        carrierId: "se-345678",
        serviceCode: "ups_ground",
        serviceName: "UPS Ground",
        carrierCode: "ups",
        carrierNickname: "UPS",
        carrierFriendlyName: "UPS",
        amount: 9.99,
        formattedAmount: "$9.99",
        currency: "USD",
        deliveryDays: 2,
        estimatedDeliveryDate: deliveryDate2.toISOString(),
        guaranteedDelivery: false,
        shipDate,
        validUntil: "",
      },
    ]
  }

  private getMockTrackingInfo(trackingNumber: string): TrackingInfo {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    const threeDaysAgo = new Date(today)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    const estimatedDelivery = new Date(today)
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 1)

    // Generate different statuses based on the tracking number
    const lastDigit = trackingNumber.slice(-1)
    let statusCode: string
    let statusDescription: string
    let events: TrackingEvent[] = []

    switch (lastDigit) {
      case "1":
        statusCode = "PR"
        statusDescription = "Pre-Transit"
        events = [
          {
            timestamp: threeDaysAgo.toISOString(),
            description: "Shipping Label Created",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "PR",
          },
        ]
        break
      case "2":
        statusCode = "IT"
        statusDescription = "In Transit"
        events = [
          {
            timestamp: threeDaysAgo.toISOString(),
            description: "Shipping Label Created",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "PR",
          },
          {
            timestamp: twoDaysAgo.toISOString(),
            description: "Package Picked Up",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "AC",
          },
          {
            timestamp: yesterday.toISOString(),
            description: "In Transit",
            locationCity: "Oakland",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "IT",
          },
        ]
        break
      case "3":
        statusCode = "OD"
        statusDescription = "Out for Delivery"
        events = [
          {
            timestamp: threeDaysAgo.toISOString(),
            description: "Shipping Label Created",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "PR",
          },
          {
            timestamp: twoDaysAgo.toISOString(),
            description: "Package Picked Up",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "AC",
          },
          {
            timestamp: yesterday.toISOString(),
            description: "In Transit",
            locationCity: "Oakland",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "IT",
          },
          {
            timestamp: today.toISOString(),
            description: "Out for Delivery",
            locationCity: "Customer City",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "OD",
          },
        ]
        break
      case "4":
        statusCode = "DE"
        statusDescription = "Delivered"
        events = [
          {
            timestamp: threeDaysAgo.toISOString(),
            description: "Shipping Label Created",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "PR",
          },
          {
            timestamp: twoDaysAgo.toISOString(),
            description: "Package Picked Up",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "AC",
          },
          {
            timestamp: yesterday.toISOString(),
            description: "In Transit",
            locationCity: "Oakland",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "IT",
          },
          {
            timestamp: today.toISOString().split("T")[0] + "T08:00:00Z",
            description: "Out for Delivery",
            locationCity: "Customer City",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "OD",
          },
          {
            timestamp: today.toISOString(),
            description: "Delivered",
            locationCity: "Customer City",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "DE",
          },
        ]
        break
      default:
        statusCode = "IT"
        statusDescription = "In Transit"
        events = [
          {
            timestamp: twoDaysAgo.toISOString(),
            description: "Shipping Label Created",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "PR",
          },
          {
            timestamp: yesterday.toISOString(),
            description: "Package Picked Up",
            locationCity: "San Francisco",
            locationState: "CA",
            locationCountry: "US",
            statusCode: "AC",
          },
        ]
    }

    return {
      trackingNumber,
      statusCode,
      statusDescription,
      carrierCode: "usps",
      carrierName: "USPS",
      estimatedDelivery: estimatedDelivery.toISOString(),
      events,
    }
  }

  private getMockShippingLabel(): ShippingLabel {
    const today = new Date()
    const shipDate = today.toISOString().split("T")[0]

    return {
      labelId: "se-label-1234567",
      trackingNumber: "9400123456789012345678",
      shipmentId: "se-shipment-1234567",
      carrierId: "se-carrier-1234567",
      serviceCode: "usps_priority",
      shipDate,
      createdAt: today.toISOString(),
      shipmentCost: 7.99,
      insuranceCost: 0,
      trackingStatus: "in_transit",
      labelDownloadUrl: "https://example.com/label.pdf",
      formUrl: "",
    }
  }
}

// Create a singleton instance
let shipEngineService: ShipEngineService | null = null

// Update the getShipEngineService function to remove the environment variable dependency
export function getShipEngineService(): ShipEngineService {
  if (!shipEngineService) {
    // Use a hardcoded demo key instead of environment variable
    const apiKey = "demo_key"
    shipEngineService = new ShipEngineService(apiKey)
  }

  return shipEngineService
}
