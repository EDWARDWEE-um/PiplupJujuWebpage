"use client"

import { useState } from "react"
import { Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function UpcomingStreams() {
  const [notifications, setNotifications] = useState({
    1: false,
    2: false,
    3: false,
  })

  const toggleNotification = (id: number) => {
    setNotifications((prev) => {
      const newState = { ...prev, [id]: !prev[id] }

      if (newState[id]) {
        toast({
          title: "Notification Enabled",
          description: "You'll be notified before this stream starts.",
        })
      } else {
        toast({
          title: "Notification Disabled",
          description: "You won't be notified about this stream.",
        })
      }

      return newState
    })
  }

  const streams = [
    {
      id: 1,
      title: "Scarlet & Violet Box Opening",
      date: "Today at 7:00 PM",
      description: "Join us as we open a full booster box of the latest Scarlet & Violet set!",
    },
    {
      id: 2,
      title: "Vintage Pack Auction",
      date: "Tomorrow at 6:00 PM",
      description: "Bid on rare vintage packs from Base Set, Jungle, and Fossil.",
    },
    {
      id: 3,
      title: "PSA Returns Reveal",
      date: "Saturday at 3:00 PM",
      description: "Watch live as we reveal our latest PSA graded returns!",
    },
  ]

  return (
    <div className="space-y-3 sm:space-y-4 mt-4">
      {streams.map((stream) => (
        <Card key={stream.id}>
          <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="space-y-1">
              <h3 className="font-medium text-sm sm:text-base">{stream.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{stream.date}</p>
              <p className="text-xs sm:text-sm">{stream.description}</p>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleNotification(stream.id)}
                className={notifications[stream.id] ? "text-primary" : ""}
              >
                {notifications[stream.id] ? (
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <BellOff className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                <span className="sr-only">
                  {notifications[stream.id] ? "Disable notification" : "Enable notification"}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
