"use client"

import { useGamification } from "@/contexts/gamification-context"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award } from "lucide-react"

export default function LevelProgress() {
  const { state } = useGamification()

  // Calculate percentage to next level
  const progressPercent =
    100 -
    (state.experienceToNextLevel /
      (state.experienceToNextLevel +
        (state.experience - (Math.pow(state.level, 2) * 50 - state.experienceToNextLevel)))) *
      100

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.level}
              </div>
            </div>
            <div>
              <h3 className="font-bold">Level {state.level}</h3>
              <p className="text-xs text-muted-foreground">Trainer</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{state.experience} XP</div>
            <div className="text-xs text-muted-foreground">
              {state.experienceToNextLevel} XP to Level {state.level + 1}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Level {state.level}</span>
            <span>Level {state.level + 1}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-muted rounded p-2">
            <div className="text-lg font-bold">{state.achievements.filter((a) => a.unlocked).length}</div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </div>
          <div className="bg-muted rounded p-2">
            <div className="text-lg font-bold">{state.badges.length}</div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </div>
          <div className="bg-muted rounded p-2">
            <div className="text-lg font-bold">{state.streakDays}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
