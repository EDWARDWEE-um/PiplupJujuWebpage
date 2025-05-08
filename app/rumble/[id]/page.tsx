import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Trophy, Users, ArrowLeft } from "lucide-react"

type Props = {
  params: { id: string }
}

export function generateMetadata({ params }: Props): Metadata {
  // This would normally fetch the rumble data and use it for the metadata
  return {
    title: `Rumble Details | PokéCollect`,
    description: "View detailed information about this Pokemon TCG Rumble event.",
  }
}

export default function RumbleDetailPage({ params }: Props) {
  // In a real app, you would fetch the rumble data based on the ID
  // For now, we'll use mock data
  const rumbleId = params.id

  // Mock data for a specific rumble
  const rumbleData = {
    id: rumbleId,
    name: "May Mega Rumble",
    startDate: "May 8, 2023",
    endDate: "May 15, 2023",
    status: "active",
    description: "Our biggest rumble event of the month featuring rare Pokemon cards and exclusive bounties!",
    totalSlots: 24,
    filledSlots: 18,
    entryFee: 25,
    prizePool: 1200,
    image: "/placeholder.svg?key=02hio",
    participants: [
      { id: 1, name: "TrainerRed", avatar: "/athletic-trainer.png" },
      { id: 2, name: "AshKetchum", avatar: "/athletic-trainer.png" },
      { id: 3, name: "MistyWater", avatar: "/athletic-trainer.png" },
      // More participants...
    ],
    bounties: [
      { id: 1, name: "Charizard VMAX", value: 250, image: "/powerful-fire-dragon.png" },
      { id: 2, name: "Pikachu Gold Star", value: 500, image: "/electric-mouse-character.png" },
      { id: 3, name: "Mewtwo EX", value: 300, image: "/psychic-pokemon.png" },
    ],
    rules: [
      "Each participant will receive 6 random Pokemon cards.",
      "Cards will be revealed one by one during the live stream.",
      "HP values of each card will be added to your total score.",
      "Special bounties are awarded for specific Pokemon pulls.",
      "The participant with the highest total HP wins the main prize.",
    ],
    schedule: [
      { time: "7:00 PM", event: "Check-in and welcome" },
      { time: "7:15 PM", event: "Rules explanation" },
      { time: "7:30 PM", event: "Card distribution begins" },
      { time: "9:00 PM", event: "Final scoring and winners announcement" },
    ],
  }

  // If no rumble data is found, return 404
  if (!rumbleData) {
    notFound()
  }

  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      <Link href="/rumble" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Rumbles
      </Link>

      <div className="relative rounded-lg overflow-hidden mb-6">
        <div className="aspect-[21/9] relative">
          <Image
            src={rumbleData.image || "/placeholder.svg"}
            alt={rumbleData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className={rumbleData.status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}>
              {rumbleData.status === "active" ? "Active" : "Completed"}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 bg-black/50 text-white border-white/20">
              <Users className="h-3 w-3" />
              <span>
                {rumbleData.filledSlots}/{rumbleData.totalSlots} Slots Filled
              </span>
            </Badge>
            <Badge variant="outline" className="bg-black/50 text-white border-white/20">
              ${rumbleData.entryFee} Entry
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{rumbleData.name}</h1>
          <p className="text-white/80 text-xs sm:text-sm flex items-center mt-1">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            {rumbleData.startDate} - {rumbleData.endDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>{rumbleData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Rules</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {rumbleData.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Schedule</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rumbleData.schedule.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.time}</TableCell>
                          <TableCell>{item.event}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" /> Bounties
              </CardTitle>
              <CardDescription>Special rewards for pulling these cards during the rumble</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {rumbleData.bounties.map((bounty) => (
                  <Card key={bounty.id} className="overflow-hidden border-2 border-yellow-200 dark:border-yellow-900">
                    <div className="aspect-square relative">
                      <Image src={bounty.image || "/placeholder.svg"} alt={bounty.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm">{bounty.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Bounty: ${bounty.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Join This Rumble</CardTitle>
              <CardDescription>Secure your spot in the {rumbleData.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Entry Fee:</span>
                  <span className="font-medium">${rumbleData.entryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Prize Pool:</span>
                  <span className="font-medium">${rumbleData.prizePool}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Available Slots:</span>
                  <span className="font-medium">
                    {rumbleData.totalSlots - rumbleData.filledSlots} of {rumbleData.totalSlots}
                  </span>
                </div>
              </div>
              <Button className="w-full">Reserve Your Slot</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
              <CardDescription>{rumbleData.filledSlots} trainers have joined this rumble</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {rumbleData.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-2 bg-muted rounded-full p-1 pr-3">
                    <div className="h-6 w-6 rounded-full overflow-hidden relative">
                      <Image
                        src={participant.avatar || "/placeholder.svg"}
                        alt={participant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium">{participant.name}</span>
                  </div>
                ))}
                {rumbleData.totalSlots - rumbleData.filledSlots > 0 && (
                  <div className="flex items-center gap-2 bg-muted/50 border border-dashed border-muted-foreground/20 rounded-full p-1 pr-3">
                    <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center">
                      <Users className="h-3 w-3" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      +{rumbleData.totalSlots - rumbleData.filledSlots} slots available
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about this rumble event? Contact our support team for assistance.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
