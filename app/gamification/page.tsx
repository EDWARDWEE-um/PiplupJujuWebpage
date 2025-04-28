"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LevelProgress from "@/components/level-progress"
import DailyCheckIn from "@/components/daily-check-in"
import DailyChallenges from "@/components/daily-challenges"
import AchievementsDisplay from "@/components/achievements-display"
import CollectionTracker from "@/components/collection-tracker"
import PackSimulator from "@/components/pack-simulator"
import Leaderboard from "@/components/leaderboard"
import { Award, Gift, Trophy, Package, Database, Star } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GamificationPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { trainerLevel, experience, experienceToNextLevel, rewards, redeemReward } = useGamification()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Trainer Dashboard</h1>
          <p className="text-muted-foreground">Track your progress, achievements, and collection</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Award className="h-5 w-5 text-primary" />
          <span className="font-medium">Trainer Level {trainerLevel}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <LevelProgress />
        <DailyCheckIn />
        <Leaderboard />
      </div>

      {/* Rewards Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          Available Rewards
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {rewards.length > 0 ? (
            rewards.map((reward, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => redeemReward(reward.id)} className="w-full">
                    Redeem Reward
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="md:col-span-3">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Complete achievements and challenges to earn rewards!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span>Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="collection" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Collection</span>
          </TabsTrigger>
          <TabsTrigger value="simulator" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>Pack Simulator</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="mt-6">
          <DailyChallenges />
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <AchievementsDisplay />
        </TabsContent>

        <TabsContent value="collection" className="mt-6">
          <CollectionTracker />
        </TabsContent>

        <TabsContent value="simulator" className="mt-6">
          <PackSimulator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
