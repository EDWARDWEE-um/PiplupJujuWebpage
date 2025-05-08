"use client"

import { useState } from "react"
import { useGamification } from "@/contexts/gamification-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Ticket, Tag, Award } from "lucide-react"

export default function RewardsDisplay() {
  const { state, claimReward } = useGamification()
  const [filter, setFilter] = useState<string>("all")

  const getIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Tag className="h-5 w-5" />
      case "free_pack":
        return <Gift className="h-5 w-5" />
      case "loyalty_points":
        return <Award className="h-5 w-5" />
      default:
        return <Ticket className="h-5 w-5" />
    }
  }

  const formatExpiry = (date?: Date) => {
    if (!date) return "No expiration"
    return `Expires: ${date.toLocaleDateString()}`
  }

  const handleClaimReward = (code: string) => {
    claimReward(code)
  }

  const filteredRewards = state.rewards
    ? state.rewards.filter((reward) => {
        if (filter === "all") return true
        return reward.type === filter
      })
    : []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Rewards</h2>
        <Badge variant="outline" className="px-2 py-1">
          {state.rewards ? state.rewards.length : 0} Available
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="discount" onClick={() => setFilter("discount")}>
            Discounts
          </TabsTrigger>
          <TabsTrigger value="free_pack" onClick={() => setFilter("free_pack")}>
            Free Packs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredRewards.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRewards.map((reward, index) => (
                <Card key={index} className="overflow-hidden transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-primary/20 text-primary">{getIcon(reward.type)}</div>
                        <CardTitle className="text-base">
                          {reward.type === "discount"
                            ? `${reward.value}% Discount`
                            : reward.type === "free_pack"
                              ? `Free ${reward.value} Pack`
                              : reward.description}
                        </CardTitle>
                      </div>
                      <Badge className="bg-primary">{reward.type.replace("_", " ")}</Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {reward.code && (
                      <div className="bg-muted p-2 rounded text-center font-mono text-sm">{reward.code}</div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">{formatExpiry(reward.expiresAt)}</div>
                    {reward.code && (
                      <Button size="sm" onClick={() => handleClaimReward(reward.code!)}>
                        Claim
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No rewards available</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete achievements and challenges to earn rewards!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="discount" className="mt-0">
          {filteredRewards.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRewards.map((reward, index) => (
                <Card key={index} className="overflow-hidden transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-primary/20 text-primary">{getIcon(reward.type)}</div>
                        <CardTitle className="text-base">
                          {reward.type === "discount" ? `${reward.value}% Discount` : reward.description}
                        </CardTitle>
                      </div>
                      <Badge className="bg-primary">{reward.type.replace("_", " ")}</Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {reward.code && (
                      <div className="bg-muted p-2 rounded text-center font-mono text-sm">{reward.code}</div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">{formatExpiry(reward.expiresAt)}</div>
                    {reward.code && (
                      <Button size="sm" onClick={() => handleClaimReward(reward.code!)}>
                        Claim
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Tag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No discount rewards available</h3>
              <p className="mt-2 text-sm text-muted-foreground">Complete achievements to earn discount codes!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="free_pack" className="mt-0">
          {filteredRewards.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRewards.map((reward, index) => (
                <Card key={index} className="overflow-hidden transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-primary/20 text-primary">{getIcon(reward.type)}</div>
                        <CardTitle className="text-base">
                          {reward.type === "free_pack" ? `Free ${reward.value} Pack` : reward.description}
                        </CardTitle>
                      </div>
                      <Badge className="bg-primary">{reward.type.replace("_", " ")}</Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {reward.code && (
                      <div className="bg-muted p-2 rounded text-center font-mono text-sm">{reward.code}</div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">{formatExpiry(reward.expiresAt)}</div>
                    {reward.code && (
                      <Button size="sm" onClick={() => handleClaimReward(reward.code!)}>
                        Claim
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No free pack rewards available</h3>
              <p className="mt-2 text-sm text-muted-foreground">Complete achievements to earn free packs!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
