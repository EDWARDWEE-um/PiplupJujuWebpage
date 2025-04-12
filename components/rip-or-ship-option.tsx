"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Flame, Package } from "lucide-react"

interface RipOrShipOptionProps {
  productId: string
}

export default function RipOrShipOption({ productId }: RipOrShipOptionProps) {
  const [option, setOption] = useState<"ship" | "rip">("ship")

  return (
    <div className="border rounded-lg p-3 sm:p-4">
      <h3 className="font-medium text-sm sm:text-base mb-3">Choose Your Adventure:</h3>
      <RadioGroup defaultValue="ship" onValueChange={(value) => setOption(value as "ship" | "rip")}>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <RadioGroupItem value="ship" id="ship" className="mt-1" />
            <div className="grid gap-1 leading-none">
              <Label htmlFor="ship" className="flex items-center gap-1.5 text-sm sm:text-base font-medium">
                <Package className="h-4 w-4 text-blue-500" />
                Ship Sealed
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">We'll ship the sealed product directly to you.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <RadioGroupItem value="rip" id="rip" className="mt-1" />
            <div className="grid gap-1 leading-none">
              <Label htmlFor="rip" className="flex items-center gap-1.5 text-sm sm:text-base font-medium">
                <Flame className="h-4 w-4 text-red-500" />
                Live Rip
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We'll open it live on our TikTok stream and ship the cards to you.
              </p>
              <p className="text-xs text-green-600 font-medium">+300 bonus loyalty points!</p>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
