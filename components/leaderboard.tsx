"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Award, Star } from "lucide-react"

// Sample leaderboard data
const sampleLeaderboard = [
  { id: 1, name: "PokeMaster99", avatar: "/images/trainer-1.png", level: 42, points: 12450, badges: 24 },
  { id: 2, name: "Charizard4Life", avatar: "/images/trainer-2.png", level: 38, points: 10820, badges: 19 },
  { id: 3, name: "PikachuFan", avatar: "/images/trainer-3.png", level: 35, points: 9750, badges: 22 },
  { id: 4, name: "AshKetchum", avatar: "/images/trainer-4.png", level: 33, points: 8900, badges: 18 },
  { id: 5, name: "MistyWater", avatar: "/images/trainer-1.png", level: 31, points: 8200, badges: 16 },
  { id: 6, name: "BrockRock", avatar: "/images/trainer-2.png", level: 29, points: 7600, badges: 15 },
  { id: 7, name: "TeamRocket", avatar: "/images/trainer-3.png", level: 27, points: 7100, badges: 14 },
  { id: 8, name: "GaryOak", avatar: "/images/trainer-4.png", level: 26, points: 6800, badges: 13 },
  { id: 9, name: "ProfOak", avatar: "/images/trainer-1.png", level: 25, points: 6500, badges: 12 },
  { id: 10, name: "NursJoy", avatar: "/images/trainer-2.png", level: 24, points: 6200, badges: 11 },
]

// Sample collection leaderboard
const sampleCollectionLeaderboard = [
  { id: 1, name: "CardCollector", avatar: "/images/trainer-3.png", cards: 1245, sets: 8, completion: 92 },
  { id: 2, name: "RareHunter", avatar: "/images/trainer-4.png", cards: 1120, sets: 7, completion: 88 },
  { id: 3, name: "SetCompleter", avatar: "/images/trainer-1.png", cards: 980, sets: 6, completion: 85 },
  { id: 4, name: "PokeFinder", avatar: "/images/trainer-2.png", cards: 920, sets: 6, completion: 80 },
  { id: 5, name: "CardMaster", avatar: "/images/trainer-3.png", cards: 850, sets: 5, completion: 75 },
  { id: 6, name: "RarityChaser", avatar: "/images/trainer-4.png", cards: 780, sets: 5, completion: 70 },
  { id: 7, name: "PokeDexFiller", avatar: "/images/trainer-1.png", cards: 720, sets: 4, completion: 65 },
  { id: 8, name: "CardHoarder", avatar: "/images/trainer-2.png", cards: 680, sets: 4, completion: 60 },
  { id: 9, name: "SetBuilder", avatar: "/images/trainer-3.png", cards: 650, sets: 4, completion: 55 },
  { id: 10, name: "CardTrader", avatar: "/images/trainer-4.png", cards: 620, sets: 3, completion: 50 },
]

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("points")

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Leaderboards
        </CardTitle>
        <CardDescription>See how you rank against other collectors</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="points" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="points">Points & Level</TabsTrigger>
            <TabsTrigger value="collection">Collection</TabsTrigger>
          </TabsList>

          <TabsContent value="points" className="mt-4">
            <div className="space-y-2">
              {sampleLeaderboard.map((user, index) => (
                <div key={user.id} className={`flex items-center p-2 rounded-lg ${index < 3 ? "bg-muted" : ""}`}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-6">
                      {index < 3 ? (
                        <Trophy className={`h-5 w-5 ${getMedalColor(index + 1)}`} />
                      ) : (
                        <span className="text-sm text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Award className="h-3 w-3" />
                        <span>Level {user.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{user.points.toLocaleString()} pts</div>
                    <div className="text-xs text-muted-foreground">{user.badges} badges</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collection" className="mt-4">
            <div className="space-y-2">
              {sampleCollectionLeaderboard.map((user, index) => (
                <div key={user.id} className={`flex items-center p-2 rounded-lg ${index < 3 ? "bg-muted" : ""}`}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-6">
                      {index < 3 ? (
                        <Trophy className={`h-5 w-5 ${getMedalColor(index + 1)}`} />
                      ) : (
                        <span className="text-sm text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3" />
                        <span>{user.completion}% completion</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{user.cards.toLocaleString()} cards</div>
                    <div className="text-xs text-muted-foreground">{user.sets} complete sets</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
