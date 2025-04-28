"use client"

import { useGamification } from "@/contexts/gamification-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"

export default function DailyChallenges() {
  const { state, completeDailyChallenge } = useGamification()

  // Format time remaining
  const formatTimeRemaining = (expiryDate: Date) => {
    const now = new Date()
    const diffMs = expiryDate.getTime() - now.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${diffHrs}h ${diffMins}m`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Challenges</h2>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Resets in {formatTimeRemaining(state.dailyChallenges[0]?.expires || new Date())}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {state.dailyChallenges.map((challenge) => (
          <Card key={challenge.id} className={challenge.completed ? "border-primary bg-primary/5" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{challenge.name}</CardTitle>
                {challenge.completed && (
                  <Badge className="bg-primary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>
                    {challenge.progress}/{challenge.target}
                  </span>
                </div>
                <Progress value={(challenge.progress / challenge.target) * 100} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="text-sm">
                <span className="text-primary font-medium">+{challenge.reward} XP</span>
              </div>
              {!challenge.completed && challenge.progress >= challenge.target && (
                <Button size="sm" onClick={() => completeDailyChallenge(challenge.id)}>
                  Claim
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
