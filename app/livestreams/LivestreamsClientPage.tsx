"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, BellOff, CalendarDays, Flame, Package, TrendingUp } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface StreamEvent {
  id: number
  title: string
  date: Date
  time: string
  description: string
  type: "opening" | "auction" | "reveal" | "other"
  notified: boolean
}

export default function LivestreamsClientPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [notifications, setNotifications] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: true,
    4: false,
    5: false,
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

  // Sample stream events
  const streamEvents: StreamEvent[] = [
    {
      id: 1,
      title: "Scarlet & Violet Box Opening",
      date: new Date(),
      time: "7:00 PM",
      description: "Join us as we open a full booster box of the latest Scarlet & Violet set!",
      type: "opening",
      notified: false,
    },
    {
      id: 2,
      title: "Vintage Pack Auction",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: "6:00 PM",
      description: "Bid on rare vintage packs from Base Set, Jungle, and Fossil.",
      type: "auction",
      notified: false,
    },
    {
      id: 3,
      title: "PSA Returns Reveal",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "3:00 PM",
      description: "Watch live as we reveal our latest PSA graded returns!",
      type: "reveal",
      notified: true,
    },
    {
      id: 4,
      title: "Paradox Rift Pre-Release",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: "5:00 PM",
      description: "First look at the upcoming Paradox Rift expansion!",
      type: "opening",
      notified: false,
    },
    {
      id: 5,
      title: "Charizard Collection Showcase",
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      time: "8:00 PM",
      description: "Showcasing our rare Charizard collection spanning all generations.",
      type: "other",
      notified: false,
    },
  ]

  // Filter events for the selected date
  const filteredEvents = date
    ? streamEvents.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      )
    : []

  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "opening":
        return <Package className="h-5 w-5" />
      case "auction":
        return <TrendingUp className="h-5 w-5" />
      case "reveal":
        return <Flame className="h-5 w-5" />
      default:
        return <CalendarDays className="h-5 w-5" />
    }
  }

  // Get badge color based on event type
  const getEventBadgeClass = (type: string) => {
    switch (type) {
      case "opening":
        return "bg-blue-500 hover:bg-blue-600"
      case "auction":
        return "bg-green-500 hover:bg-green-600"
      case "reveal":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-purple-500 hover:bg-purple-600"
    }
  }

  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Livestream Calendar</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          View upcoming livestreams and set notifications to never miss an event.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] mt-6 sm:mt-8">
        <Card>
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="text-base sm:text-lg">Select Date</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Choose a date to see scheduled streams</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                <div className="font-medium">Sun</div>
                <div className="font-medium">Mon</div>
                <div className="font-medium">Tue</div>
                <div className="font-medium">Wed</div>
                <div className="font-medium">Thu</div>
                <div className="font-medium">Fri</div>
                <div className="font-medium">Sat</div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const d = new Date()
                  d.setDate(d.getDate() - d.getDay() + i)
                  const isCurrentMonth = d.getMonth() === new Date().getMonth()
                  const isSelected =
                    date &&
                    d.getDate() === date.getDate() &&
                    d.getMonth() === date.getMonth() &&
                    d.getFullYear() === date.getFullYear()

                  return (
                    <Button
                      key={i}
                      variant={isSelected ? "default" : "ghost"}
                      className={`h-8 w-8 p-0 ${!isCurrentMonth ? "text-muted-foreground opacity-50" : ""}`}
                      onClick={() => setDate(new Date(d))}
                    >
                      {d.getDate()}
                    </Button>
                  )
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-3 sm:p-4 pt-0">
            <Button variant="outline" className="w-full text-xs sm:text-sm h-9" onClick={() => setDate(new Date())}>
              Today
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold">
              {date
                ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                : "All Events"}
            </h2>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
              Subscribe to Calendar
            </Button>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <Badge className={getEventBadgeClass(event.type) + " text-xs sm:text-sm"}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          <span className="text-xs sm:text-sm font-medium">{event.time}</span>
                        </div>
                        <h3 className="text-sm sm:text-lg font-semibold flex items-center gap-2">
                          {getEventIcon(event.type)}
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <div className="flex gap-2 self-end sm:self-auto">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleNotification(event.id)}
                          className={notifications[event.id] ? "text-primary" : ""}
                        >
                          {notifications[event.id] ? (
                            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <BellOff className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                          <span className="sr-only">
                            {notifications[event.id] ? "Disable notification" : "Enable notification"}
                          </span>
                        </Button>
                        <Button className="text-xs sm:text-sm h-8 sm:h-9">Watch</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">No streams scheduled for this date.</p>
                <Button variant="outline" className="mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9">
                  View All Upcoming Streams
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Upcoming Streams</h2>
            <div className="space-y-3 sm:space-y-4">
              {streamEvents.slice(0, 3).map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <Badge className={getEventBadgeClass(event.type) + " text-xs sm:text-sm"}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          <span className="text-xs sm:text-sm font-medium">
                            {event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at {event.time}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-lg font-semibold flex items-center gap-2">
                          {getEventIcon(event.type)}
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <div className="flex gap-2 self-end sm:self-auto">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleNotification(event.id)}
                          className={notifications[event.id] ? "text-primary" : ""}
                        >
                          {notifications[event.id] ? (
                            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <BellOff className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                          <span className="sr-only">
                            {notifications[event.id] ? "Disable notification" : "Enable notification"}
                          </span>
                        </Button>
                        <Button className="text-xs sm:text-sm h-8 sm:h-9">Watch</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
