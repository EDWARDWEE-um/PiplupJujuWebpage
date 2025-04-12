"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">Stay Updated</CardTitle>
        <CardDescription>
          Subscribe to our newsletter for the latest Pokemon TCG news, price alerts, and exclusive offers.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9 sm:h-10"
            />
          </div>
          <Button type="submit" className="w-full h-9 sm:h-10" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
          <p>Latest Newsletter Topics:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Top 10 Cards to Invest in 2023</li>
            <li>Scarlet & Violet Set Analysis</li>
            <li>Upcoming TCG Releases</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
