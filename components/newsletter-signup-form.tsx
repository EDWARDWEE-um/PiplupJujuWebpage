"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [frequency, setFrequency] = useState("weekly")
  const [interests, setInterests] = useState({
    marketUpdates: true,
    packOpenings: false,
    deckProfiles: false,
    vintage: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to the PIPLUPJUJUTCG newsletter.",
    })

    setIsLoading(false)
  }

  const handleInterestChange = (interest: keyof typeof interests) => {
    setInterests((prev) => ({
      ...prev,
      [interest]: !prev[interest],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Frequency</Label>
        <RadioGroup defaultValue={frequency} onValueChange={setFrequency}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly" className="cursor-pointer">
              Weekly
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="biweekly" id="biweekly" />
            <Label htmlFor="biweekly" className="cursor-pointer">
              Bi-weekly
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="cursor-pointer">
              Monthly
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Interests (Optional)</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="market-updates"
              checked={interests.marketUpdates}
              onCheckedChange={() => handleInterestChange("marketUpdates")}
            />
            <Label htmlFor="market-updates" className="cursor-pointer text-sm">
              Market Updates
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pack-openings"
              checked={interests.packOpenings}
              onCheckedChange={() => handleInterestChange("packOpenings")}
            />
            <Label htmlFor="pack-openings" className="cursor-pointer text-sm">
              Pack Openings
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="deck-profiles"
              checked={interests.deckProfiles}
              onCheckedChange={() => handleInterestChange("deckProfiles")}
            />
            <Label htmlFor="deck-profiles" className="cursor-pointer text-sm">
              Deck Profiles
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vintage"
              checked={interests.vintage}
              onCheckedChange={() => handleInterestChange("vintage")}
            />
            <Label htmlFor="vintage" className="cursor-pointer text-sm">
              Vintage Cards
            </Label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
      </Button>
    </form>
  )
}
