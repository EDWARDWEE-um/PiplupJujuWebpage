"use client"

import { useState, useEffect } from "react"
import { useGamification } from "@/contexts/gamification-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Gift } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function DailyCheckIn() {
  const { state, checkIn } = useGamification()
  const [canCheckIn, setCanCheckIn] = useState(false)
  const [timeUntilReset, setTimeUntilReset] = useState("")

  useEffect(() => {
    const checkEligibility = () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (!state.lastCheckIn || state.lastCheckIn.getTime() !== today.getTime()) {
        setCanCheckIn(true)
      } else {
        setCanCheckIn(false)
      }

      // Calculate time until next reset
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const timeLeft = tomorrow.getTime() - Date.now()

      const hours = Math.floor(timeLeft / (1000 * 60 * 60))
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      setTimeUntilReset(`${hours}h ${minutes}m`)
    }

    checkEligibility()
    const interval = setInterval(checkEligibility, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [state.lastCheckIn])

  const handleCheckIn = () => {
    const success = checkIn()

    if (success) {
      toast({
        title: "Daily Check-in Complete!",
        description: `You've checked in for ${state.streakDays} days in a row!`,
      })
      setCanCheckIn(false)
    } else {
      toast({
        title: "Already Checked In",
        description: "You've already checked in today. Come back tomorrow!",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Daily Check-in</CardTitle>
        <CardDescription>Check in daily to earn rewards and maintain your streak</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {state.streakDays}
            </div>
          </div>

          <div>
            <h3 className="font-medium">{state.streakDays} Day Streak</h3>
            <p className="text-sm text-muted-foreground">
              {canCheckIn ? "Check in today to continue your streak!" : `Next check-in available in ${timeUntilReset}`}
            </p>
          </div>

          <Button onClick={handleCheckIn} disabled={!canCheckIn} className="w-full">
            <Gift className="h-4 w-4 mr-2" />
            {canCheckIn ? "Claim Daily Reward" : "Already Claimed"}
          </Button>

          <div className="flex justify-between w-full pt-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`h-2 w-2 rounded-full ${i < state.streakDays % 7 ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">7-day streak: 50 bonus points</p>
        </div>
      </CardContent>
    </Card>
  )
}
