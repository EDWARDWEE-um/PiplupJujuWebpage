"use client"

import { useState } from "react"
import { useGamification } from "@/contexts/gamification-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database } from "lucide-react"

// Sample collection data
const sampleSets = [
  { id: "sv1", name: "Scarlet & Violet Base Set", total: 258, collected: 142, completion: 55 },
  { id: "sv2", name: "Paldean Fates", total: 198, collected: 87, completion: 44 },
  { id: "sv3", name: "Obsidian Flames", total: 226, collected: 103, completion: 46 },
  { id: "sv4", name: "Paradox Rift", total: 182, collected: 62, completion: 34 },
]

const sampleRarities = [
  { name: "Common", count: 215 },
  { name: "Uncommon", count: 124 },
  { name: "Rare", count: 78 },
  { name: "Ultra Rare", count: 32 },
  { name: "Secret Rare", count: 8 },
]

export default function CollectionTracker() {
  const { state } = useGamification()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Collection Tracker</h2>
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {sampleSets.reduce((acc, set) => acc + set.collected, 0)} cards collected
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sets">Sets</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Collection Overview</CardTitle>
                <CardDescription>Your overall collection progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Total Completion</span>
                      <span className="font-medium">
                        {Math.round(sampleSets.reduce((acc, set) => acc + set.completion, 0) / sampleSets.length)}%
                      </span>
                    </div>
                    <Progress
                      value={sampleSets.reduce((acc, set) => acc + set.completion, 0) / sampleSets.length}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded p-3">
                      <div className="text-xs text-muted-foreground mb-1">Total Cards</div>
                      <div className="text-xl font-bold">{sampleSets.reduce((acc, set) => acc + set.collected, 0)}</div>
                    </div>
                    <div className="bg-muted rounded p-3">
                      <div className="text-xs text-muted-foreground mb-1">Sets Started</div>
                      <div className="text-xl font-bold">{sampleSets.length}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rarity Breakdown</CardTitle>
                <CardDescription>Cards by rarity in your collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleRarities.map((rarity) => (
                    <div key={rarity.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{rarity.name}</span>
                        <span className="font-medium">{rarity.count}</span>
                      </div>
                      <Progress
                        value={(rarity.count / sampleRarities.reduce((acc, r) => acc + r.count, 0)) * 100}
                        className="h-1.5"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sets" className="mt-4">
          <div className="space-y-4">
            {sampleSets.map((set) => (
              <Card key={set.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{set.name}</h3>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">
                          {set.collected} / {set.total} cards
                        </span>
                        <span className="font-medium">{set.completion}%</span>
                      </div>
                      <Progress value={set.completion} className="h-2 mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Collection Statistics</CardTitle>
              <CardDescription>Detailed stats about your collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Total Cards</div>
                    <div className="text-xl font-bold">{sampleSets.reduce((acc, set) => acc + set.collected, 0)}</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Unique Sets</div>
                    <div className="text-xl font-bold">{sampleSets.length}</div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Completion</div>
                    <div className="text-xl font-bold">
                      {Math.round(sampleSets.reduce((acc, set) => acc + set.completion, 0) / sampleSets.length)}%
                    </div>
                  </div>
                  <div className="bg-muted rounded p-3">
                    <div className="text-xs text-muted-foreground mb-1">Estimated Value</div>
                    <div className="text-xl font-bold">$1,245</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Collection Growth</h3>
                  <div className="h-40 flex items-end gap-1">
                    {[28, 42, 35, 50, 65, 48, 72, 85, 90, 110, 125, 142].map((value, index) => (
                      <div
                        key={index}
                        className="bg-primary/80 rounded-t w-full"
                        style={{ height: `${(value / 150) * 100}%` }}
                      >
                        <div className="h-full w-full hover:bg-primary transition-colors duration-200"></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
