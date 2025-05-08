"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Zap, Shield, X, Clock, CalendarDays, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

export default function RumbleDashboard() {
  const [activeTab, setActiveTab] = useState("current")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for current rumble with variable slot count
  const currentRumble = {
    id: "rumble-2023-05",
    name: "May Mega Rumble",
    startDate: "May 8, 2023",
    endDate: "May 15, 2023",
    totalSlots: 144, // Variable slot count (can be between 50-216)
    filledSlots: 87,
    bounties: [
      { id: 1, name: "Charizard VMAX", value: 250, image: "/powerful-fire-dragon.png" },
      { id: 2, name: "Pikachu Gold Star", value: 500, image: "/electric-mouse-character.png" },
      { id: 3, name: "Mewtwo EX", value: 300, image: "/psychic-pokemon.png" },
    ],
    leaderboard: {
      hp: [
        { rank: 1, name: "TrainerRed", value: 1250, avatar: "/athletic-trainer.png" },
        { rank: 2, name: "AshKetchum", value: 1100, avatar: "/athletic-trainer.png" },
        { rank: 3, name: "MistyWater", value: 950, avatar: "/athletic-trainer.png" },
      ],
      hits: [
        { rank: 1, name: "GaryOak", value: 15, avatar: "/athletic-trainer.png" },
        { rank: 2, name: "BrockRock", value: 12, avatar: "/athletic-trainer.png" },
        { rank: 3, name: "TrainerRed", value: 10, avatar: "/athletic-trainer.png" },
      ],
      kumpau: [
        { rank: 1, name: "MistyWater", value: 8, avatar: "/athletic-trainer.png" },
        { rank: 2, name: "AshKetchum", value: 6, avatar: "/athletic-trainer.png" },
        { rank: 3, name: "LanceElite", value: 5, avatar: "/athletic-trainer.png" },
      ],
    },
  }

  // Mock data for past rumbles
  const pastRumbles = [
    {
      id: "rumble-2023-04",
      name: "April Showers Rumble",
      date: "April 10-17, 2023",
      winner: "GaryOak",
      participants: 216,
      topBounty: "Lugia GX",
      image: "/placeholder.svg?key=1r56y",
    },
    {
      id: "rumble-2023-03",
      name: "March Madness Rumble",
      date: "March 15-22, 2023",
      winner: "TrainerRed",
      participants: 144,
      topBounty: "Blastoise EX",
      image: "/placeholder.svg?key=u8hd9",
    },
    {
      id: "rumble-2023-02",
      name: "February Frost Rumble",
      date: "February 12-19, 2023",
      winner: "MistyWater",
      participants: 72,
      topBounty: "Venusaur VMAX",
      image: "/placeholder.svg?key=fiedf",
    },
  ]

  // Mock data for all player stats
  const playerStats = [
    {
      id: 1,
      name: "TrainerRed",
      avatar: "/athletic-trainer.png",
      level: 42,
      totalRumbles: 24,
      wins: 8,
      totalHP: 12450,
      totalHits: 156,
      totalKumpau: 43,
      bestPull: "Charizard VMAX Alt Art",
      badges: ["Rumble Champion", "HP Master", "Card Collector"],
    },
    {
      id: 2,
      name: "AshKetchum",
      avatar: "/athletic-trainer.png",
      level: 38,
      totalRumbles: 20,
      wins: 5,
      totalHP: 10200,
      totalHits: 132,
      totalKumpau: 51,
      bestPull: "Pikachu Gold Star",
      badges: ["Kumpau Expert", "Consistent Player"],
    },
    {
      id: 3,
      name: "MistyWater",
      avatar: "/athletic-trainer.png",
      level: 35,
      totalRumbles: 18,
      wins: 6,
      totalHP: 9800,
      totalHits: 118,
      totalKumpau: 62,
      bestPull: "Blastoise EX",
      badges: ["Kumpau Master", "Water Specialist"],
    },
    {
      id: 4,
      name: "GaryOak",
      avatar: "/athletic-trainer.png",
      level: 40,
      totalRumbles: 22,
      wins: 7,
      totalHP: 11300,
      totalHits: 168,
      totalKumpau: 38,
      bestPull: "Lugia GX",
      badges: ["Hit Master", "Rare Hunter"],
    },
    {
      id: 5,
      name: "BrockRock",
      avatar: "/athletic-trainer.png",
      level: 33,
      totalRumbles: 16,
      wins: 4,
      totalHP: 8900,
      totalHits: 142,
      totalKumpau: 35,
      bestPull: "Tyranitar V Alt Art",
      badges: ["Rock Specialist", "Consistent Player"],
    },
    {
      id: 6,
      name: "LanceElite",
      avatar: "/athletic-trainer.png",
      level: 37,
      totalRumbles: 19,
      wins: 5,
      totalHP: 9600,
      totalHits: 128,
      totalKumpau: 47,
      bestPull: "Dragonite V Alt Art",
      badges: ["Dragon Master", "Elite Collector"],
    },
  ]

  // Filter players based on search query
  const filteredPlayers = playerStats.filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleJoinRumble = () => {
    toast({
      title: "Redirecting to product page",
      description: "You'll be able to select your Rumble slot after purchase.",
    })
  }

  // Generate all slots
  const generateAllSlots = () => {
    const slots = []
    for (let i = 1; i <= currentRumble.totalSlots; i++) {
      const isFilled = i <= currentRumble.filledSlots
      slots.push({ number: i, filled: isFilled, user: isFilled ? `User${i}` : null })
    }
    return slots
  }

  const allSlots = generateAllSlots()

  return (
    <div className="container px-4 py-6 max-w-full md:max-w-6xl">
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Pokémon TCG Rumble</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Join our exciting Rumble events, compete for bounties, and track your stats against other trainers.
        </p>
      </div>

      <Tabs defaultValue="current" className="mt-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current" className="text-xs sm:text-sm">
            Current Rumble
          </TabsTrigger>
          <TabsTrigger value="players" className="text-xs sm:text-sm">
            Player Stats
          </TabsTrigger>
          <TabsTrigger value="past" className="text-xs sm:text-sm">
            Past Rumbles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-6 space-y-6">
          {/* Current Rumble Header */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl">{currentRumble.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    {currentRumble.startDate} - {currentRumble.endDate}
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>
                        {currentRumble.filledSlots}/{currentRumble.totalSlots} Slots Filled
                      </span>
                    </Badge>
                    <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                  </div>
                  <Progress
                    value={(currentRumble.filledSlots / currentRumble.totalSlots) * 100}
                    className="h-2 w-full sm:w-40"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* Slot Grid - Scrollable */}
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-1" /> Available Slots
                  </h3>

                  <Card className="border rounded-lg overflow-hidden">
                    <ScrollArea className="h-[300px] w-full">
                      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 gap-1 p-2">
                        {allSlots.map((slot) => (
                          <div
                            key={slot.number}
                            className={`text-center p-1 rounded ${
                              slot.filled ? "bg-muted" : "bg-green-50 dark:bg-green-950/20"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center h-12 sm:h-14">
                              <span className="font-medium text-xs">#{slot.number}</span>
                              {slot.filled ? (
                                <span className="text-[10px] text-muted-foreground">Taken</span>
                              ) : (
                                <Link href="/products/sealed/obsidian-flames-booster-box">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-[10px] text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 p-0 w-full"
                                    onClick={handleJoinRumble}
                                  >
                                    Join
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </div>

                {/* Bounties */}
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Trophy className="h-4 w-4 mr-1" /> Bounties
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentRumble.bounties.map((bounty) => (
                      <Card key={bounty.id} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <Image
                            src={bounty.image || "/placeholder.svg"}
                            alt={bounty.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1.5">
                            <p className="text-white text-xs font-medium truncate">{bounty.name}</p>
                            <p className="text-white/80 text-xs">${bounty.value}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* HP Leaders */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-blue-500" /> HP Leaders
                </CardTitle>
                <CardDescription className="text-xs">Highest hit points accumulated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentRumble.leaderboard.hp.map((leader) => (
                    <div key={leader.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                          {leader.rank}
                        </div>
                        <div className="h-8 w-8 rounded-full overflow-hidden relative">
                          <Image
                            src={leader.avatar || "/placeholder.svg"}
                            alt={leader.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{leader.name}</span>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {leader.value} HP
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hits Leaders */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-500" /> Hits Leaders
                </CardTitle>
                <CardDescription className="text-xs">Most successful hits landed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentRumble.leaderboard.hits.map((leader) => (
                    <div key={leader.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                          {leader.rank}
                        </div>
                        <div className="h-8 w-8 rounded-full overflow-hidden relative">
                          <Image
                            src={leader.avatar || "/placeholder.svg"}
                            alt={leader.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{leader.name}</span>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {leader.value} hits
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Kumpau Leaders */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <X className="h-4 w-4 mr-1 text-red-500" /> Kumpau Leaders
                </CardTitle>
                <CardDescription className="text-xs">Most successful dodges (no hits)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentRumble.leaderboard.kumpau.map((leader) => (
                    <div key={leader.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                          {leader.rank}
                        </div>
                        <div className="h-8 w-8 rounded-full overflow-hidden relative">
                          <Image
                            src={leader.avatar || "/placeholder.svg"}
                            alt={leader.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{leader.name}</span>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {leader.value} kumpau
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Join Rumble CTA */}
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">Ready to Rumble?</h3>
                <p className="text-white/80 text-sm mt-1">
                  Join the May Mega Rumble now and compete for exclusive bounties!
                </p>
              </div>
              <Link href="/products/sealed/obsidian-flames-booster-box">
                <Button
                  className="bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700"
                  onClick={handleJoinRumble}
                >
                  Join Rumble
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Player Stats Tab - Focused on HP, Hits, and Kumpau */}
        <TabsContent value="players" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Player Battle Statistics</CardTitle>
              <CardDescription>View detailed HP, hits, and kumpau stats for all players</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="hp">Sort by HP</option>
                      <option value="hits">Sort by Hits</option>
                      <option value="kumpau">Sort by Kumpau</option>
                    </select>
                  </div>
                </div>

                {/* Stats Legend */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-muted/30 rounded-lg text-center">
                  <div className="flex flex-col items-center">
                    <Shield className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-xs font-medium">HP</span>
                    <span className="text-xs text-muted-foreground">Total hit points</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap className="h-5 w-5 text-yellow-500 mb-1" />
                    <span className="text-xs font-medium">Hits</span>
                    <span className="text-xs text-muted-foreground">Successful attacks</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <X className="h-5 w-5 text-red-500 mb-1" />
                    <span className="text-xs font-medium">Kumpau</span>
                    <span className="text-xs text-muted-foreground">Successful dodges</span>
                  </div>
                </div>

                {/* Player Stats Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredPlayers.map((player) => (
                    <Card key={player.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-12 w-12 rounded-full overflow-hidden relative">
                            <Image
                              src={player.avatar || "/placeholder.svg"}
                              alt={player.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{player.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {player.wins} wins in {player.totalRumbles} rumbles
                            </p>
                          </div>
                        </div>

                        {/* HP, Hits, Kumpau Stats with Progress Bars */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <Shield className="h-4 w-4 text-blue-500 mr-1" />
                                <span className="text-sm font-medium">HP</span>
                              </div>
                              <span className="text-sm font-mono">{player.totalHP}</span>
                            </div>
                            <Progress
                              value={(player.totalHP / 15000) * 100}
                              className="h-2"
                              indicatorClassName="bg-blue-500"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Current: {player.totalHP * 0.1} HP</span>
                              <span>All-time: {player.totalHP}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-medium">Hits</span>
                              </div>
                              <span className="text-sm font-mono">{player.totalHits}</span>
                            </div>
                            <Progress
                              value={(player.totalHits / 200) * 100}
                              className="h-2"
                              indicatorClassName="bg-yellow-500"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Current: {Math.round(player.totalHits * 0.08)} hits</span>
                              <span>All-time: {player.totalHits}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <X className="h-4 w-4 text-red-500 mr-1" />
                                <span className="text-sm font-medium">Kumpau</span>
                              </div>
                              <span className="text-sm font-mono">{player.totalKumpau}</span>
                            </div>
                            <Progress
                              value={(player.totalKumpau / 100) * 100}
                              className="h-2"
                              indicatorClassName="bg-red-500"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Current: {Math.round(player.totalKumpau * 0.12)} kumpau</span>
                              <span>All-time: {player.totalKumpau}</span>
                            </div>
                          </div>
                        </div>

                        {/* Battle Efficiency */}
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">Battle Efficiency</span>
                            <span className="text-sm font-medium">
                              {Math.round((player.totalHits / (player.totalHits + player.totalKumpau)) * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Hit/Kumpau Ratio: {(player.totalHits / player.totalKumpau).toFixed(1)}</span>
                            <span>HP per Rumble: {Math.round(player.totalHP / player.totalRumbles)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stat Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* HP Rankings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-blue-500" /> HP Rankings
                </CardTitle>
                <CardDescription className="text-xs">All-time hit points accumulated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {playerStats
                    .sort((a, b) => b.totalHP - a.totalHP)
                    .slice(0, 5)
                    .map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="h-8 w-8 rounded-full overflow-hidden relative">
                            <Image
                              src={player.avatar || "/placeholder.svg"}
                              alt={player.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{player.name}</span>
                        </div>
                        <Badge variant="outline" className="font-mono">
                          {player.totalHP} HP
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Hits Rankings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-500" /> Hits Rankings
                </CardTitle>
                <CardDescription className="text-xs">All-time successful hits landed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {playerStats
                    .sort((a, b) => b.totalHits - a.totalHits)
                    .slice(0, 5)
                    .map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="h-8 w-8 rounded-full overflow-hidden relative">
                            <Image
                              src={player.avatar || "/placeholder.svg"}
                              alt={player.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{player.name}</span>
                        </div>
                        <Badge variant="outline" className="font-mono">
                          {player.totalHits} hits
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Kumpau Rankings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <X className="h-4 w-4 mr-1 text-red-500" /> Kumpau Rankings
                </CardTitle>
                <CardDescription className="text-xs">All-time successful dodges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {playerStats
                    .sort((a, b) => b.totalKumpau - a.totalKumpau)
                    .slice(0, 5)
                    .map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="h-8 w-8 rounded-full overflow-hidden relative">
                            <Image
                              src={player.avatar || "/placeholder.svg"}
                              alt={player.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{player.name}</span>
                        </div>
                        <Badge variant="outline" className="font-mono">
                          {player.totalKumpau} kumpau
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastRumbles.map((rumble) => (
              <Card key={rumble.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={rumble.image || "/placeholder.svg"} alt={rumble.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold">{rumble.name}</h3>
                    <p className="text-white/80 text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {rumble.date}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Winner</p>
                      <p className="font-medium">{rumble.winner}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Participants</p>
                      <p className="font-medium">{rumble.participants}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Top Bounty</p>
                      <p className="font-medium">{rumble.topBounty}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 text-sm">
                    View Results
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Past Rumble Results Table - Mobile Friendly Cards */}
          <Card className="mt-8 md:hidden">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Past Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pastRumbles.map((rumble) => (
                <Card key={rumble.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <h3 className="font-medium">{rumble.name}</h3>
                    <p className="text-xs text-muted-foreground">{rumble.date}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Winner</p>
                        <p className="text-sm">{rumble.winner}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Participants</p>
                        <p className="text-sm">{rumble.participants}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Top Bounty</p>
                        <p className="text-sm">{rumble.topBounty}</p>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {/* Additional past rumbles */}
              <Card className="overflow-hidden">
                <CardContent className="p-3">
                  <h3 className="font-medium">January Frost Rumble</h3>
                  <p className="text-xs text-muted-foreground">Jan 10-17, 2023</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Winner</p>
                      <p className="text-sm">BrockRock</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Participants</p>
                      <p className="text-sm">96</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Top Bounty</p>
                      <p className="text-sm">Gengar VMAX</p>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-3">
                  <h3 className="font-medium">Holiday Special Rumble</h3>
                  <p className="text-xs text-muted-foreground">Dec 20-27, 2022</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Winner</p>
                      <p className="text-sm">AshKetchum</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Participants</p>
                      <p className="text-sm">216</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Top Bounty</p>
                      <p className="text-sm">Mew EX</p>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Past Rumble Results Table - Desktop */}
          <Card className="mt-8 hidden md:block">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Past Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Winner</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Top Bounty</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastRumbles.map((rumble) => (
                      <TableRow key={rumble.id}>
                        <TableCell className="font-medium">{rumble.name}</TableCell>
                        <TableCell>{rumble.date}</TableCell>
                        <TableCell>{rumble.winner}</TableCell>
                        <TableCell>{rumble.participants}</TableCell>
                        <TableCell>{rumble.topBounty}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Additional past rumbles */}
                    <TableRow>
                      <TableCell className="font-medium">January Frost Rumble</TableCell>
                      <TableCell>Jan 10-17, 2023</TableCell>
                      <TableCell>BrockRock</TableCell>
                      <TableCell>96</TableCell>
                      <TableCell>Gengar VMAX</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Holiday Special Rumble</TableCell>
                      <TableCell>Dec 20-27, 2022</TableCell>
                      <TableCell>AshKetchum</TableCell>
                      <TableCell>216</TableCell>
                      <TableCell>Mew EX</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
