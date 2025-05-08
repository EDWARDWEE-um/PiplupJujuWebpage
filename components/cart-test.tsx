"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createWixClient } from "@/lib/wix-ecommerce"

// Constants
const WIX_STORES_APP_ID = "1380b703-ce81-ff05-f115-39571d94dfcd" // Required for Wix Stores

export default function CartTest() {
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debug: Check available methods on currentCart
  const checkCurrentCart = async () => {
    try {
      setLoading(true)
      setError(null)

      // Create a fresh client for this check
      const freshClient = createWixClient()

      // Log available methods
      const methods = Object.keys(freshClient.currentCart || {})
      console.log("Available methods on currentCart:", methods)

      setResult({
        currentCartAvailable: !!freshClient.currentCart,
        methods: methods,
      })
    } catch (err) {
      console.error("Error checking currentCart:", err)
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  // Add to cart using the correct method name
  const handleAddToCart = async () => {
    if (!productId) {
      setError("Please enter a product ID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("Adding to cart with:", {
        productId,
        quantity,
        appId: WIX_STORES_APP_ID,
      })

      // Create a fresh client for this operation
      const freshClient = createWixClient()

      // Use addToCurrentCart instead of addToCart
      const result = await freshClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              catalogItemId: productId,
              appId: WIX_STORES_APP_ID,
            },
            quantity,
          },
        ],
      })

      console.log("Cart updated:", result)
      setResult(result)
    } catch (err) {
      console.error("Add to cart failed:", err)
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGetCart = async () => {
    setLoading(true)
    setError(null)

    try {
      // Create a fresh client for this operation
      const freshClient = createWixClient()

      const cart = await freshClient.currentCart.getCurrentCart()
      setResult(cart)
      console.log("Current cart:", cart)
    } catch (err) {
      console.error("Error getting cart:", err)
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cart Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product ID</label>
          <Input value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Enter product ID" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Quantity</label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            min={1}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleAddToCart} disabled={loading}>
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
          <Button onClick={handleGetCart} disabled={loading} variant="outline">
            Get Cart
          </Button>
          <Button onClick={checkCurrentCart} disabled={loading} variant="secondary">
            Check currentCart Methods
          </Button>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

        {result && (
          <div className="p-3 bg-gray-50 rounded-md">
            <pre className="text-xs overflow-auto max-h-60">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
