"use client"

import { useState } from "react"
import { useGamification, type Achievement, type Reward } from "@/contexts/gamification-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, CheckCircle, ShoppingCart, Calendar, Package, Database, Gift, Tag } from "lucide-react"

export default function AchievementsDisplay() {
  const { state } = useGamification()
  const [filter, setFilter] = useState<string>("all")

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shopping-cart":
        return <ShoppingCart className="h-5 w-5" />
      case "database":
        return <Database className="h-5 w-5" />
      case "check-circle":
        return <CheckCircle className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "package-open":
        return <Package className="h-5 w-5" />
      case "credit-card":
        return <ShoppingCart className="h-5 w-5" />
      case "share":
        return <ShoppingCart className="h-5 w-5" />
      default:
        return <Award className="h-5 w-5" />
    }
  }

  const filteredAchievements = state.achievements.filter((achievement) => {
    if (filter === "all") return true
    if (filter === "unlocked") return achievement.unlocked
    if (filter === "locked") return !achievement.unlocked
    return achievement.category === filter
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <Badge variant="outline" className="px-2 py-1">
          {state.achievements.filter((a) => a.unlocked).length}/{state.achievements.length} Unlocked
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="unlocked" onClick={() => setFilter("unlocked")}>
            Unlocked
          </TabsTrigger>
          <TabsTrigger value="collection" onClick={() => setFilter("collection")}>
            Collection
          </TabsTrigger>
          <TabsTrigger value="purchase" onClick={() => setFilter("purchase")}>
            Purchase
          </TabsTrigger>
          <TabsTrigger value="engagement" onClick={() => setFilter("engagement")}>
            Engagement
          </TabsTrigger>
          <TabsTrigger value="locked" onClick={() => setFilter("locked")}>
            Locked
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unlocked" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collection" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="purchase" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locked" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shopping-cart":
        return <ShoppingCart className="h-5 w-5" />
      case "database":
        return <Database className="h-5 w-5" />
      case "check-circle":
        return <CheckCircle className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "package-open":
        return <Package className="h-5 w-5" />
      case "credit-card":
        return <ShoppingCart className="h-5 w-5" />
      case "share":
        return <ShoppingCart className="h-5 w-5" />
      default:
        return <Award className="h-5 w-5" />
    }
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Tag className="h-4 w-4" />
      case "free_pack":
        return <Gift className="h-4 w-4" />
      case "loyalty_points":
        return <Award className="h-4 w-4" />
      case "badge":
        return <Award className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  const renderReward = (reward: Reward) => (
    <div className="flex items-center gap-1 text-xs">
      {getRewardIcon(reward.type)}
      <span>{reward.description}</span>
    </div>
  )

  return (
    <Card className={`overflow-hidden transition-all ${achievement.unlocked ? "border-primary" : "opacity-75"}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-full ${achievement.unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
            >
              {getIcon(achievement.icon)}
            </div>
            <CardTitle className="text-base">{achievement.name}</CardTitle>
          </div>
          {achievement.unlocked && <Badge className="bg-primary">Unlocked</Badge>}
        </div>
        <CardDescription>{achievement.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {achievement.maxProgress && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>
                {achievement.progress || 0}/{achievement.maxProgress}
              </span>
            </div>
            <Progress value={((achievement.progress || 0) / achievement.maxProgress) * 100} />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground space-y-1">
          {achievement.reward && <div className="font-medium">Rewards:</div>}
          {achievement.reward && Array.isArray(achievement.reward) ? (
            <div className="space-y-1">
              {achievement.reward.map((r, i) => (
                <div key={i}>{renderReward(r)}</div>
              ))}
            </div>
          ) : achievement.reward ? (
            renderReward(achievement.reward)
          ) : null}
        </div>
      </CardFooter>
    </Card>
  )
}
