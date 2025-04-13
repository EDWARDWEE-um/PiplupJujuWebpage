"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Gift, TrendingUp } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export default function LoyaltyPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleRedeem = (points: number, reward: string) => {
    if (!user || user.points < points) {
      toast({
        title: "Not enough points",
        description: `You need ${points} points to redeem this reward.`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Reward Redeemed",
      description: `You've successfully redeemed ${reward}.`,
    })
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container py-8 md:py:12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">PokéCollect Rewards</h1>
          <p className="text-muted-foreground">Earn points with every purchase and redeem for exclusive rewards</p>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-none overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm">
                  <Award className="mr-1 h-4 w-4" />
                  Your Points
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{user.points} Points</h2>
                <p>Keep collecting points with every purchase!</p>
                <div className="pt-2">
                  <Link href="/products/sealed">
                    <Button className="bg-white text-amber-600 hover:bg-white/90">Shop Now</Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 sm:p-6 max-w-full">
                <h3 className="font-semibold mb-3">How to Earn Points</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Earn 1 point for every $1 spent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Gift className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>2X points on all Rip or Ship purchases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Bonus points for referring friends</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="rewards">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
            <TabsTrigger value="tiers">Membership Tiers</TabsTrigger>
          </TabsList>
          <TabsContent value="rewards" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>$5 Off Your Next Order</CardTitle>
                  <CardDescription>500 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get $5 off your next order. Valid for 30 days after redemption.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleRedeem(500, "$5 Off Coupon")}
                    disabled={!user || user.points < 500}
                    className="w-full"
                  >
                    Redeem 500 Points
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Free Shipping</CardTitle>
                  <CardDescription>300 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Free standard shipping on your next order. Valid for 30 days.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleRedeem(300, "Free Shipping")}
                    disabled={!user || user.points < 300}
                    className="w-full"
                  >
                    Redeem 300 Points
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Priority Rip Slot</CardTitle>
                  <CardDescription>200 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get priority scheduling for your next Live Rip event.</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleRedeem(200, "Priority Rip Slot")}
                    disabled={!user || user.points < 200}
                    className="w-full"
                  >
                    Redeem 200 Points
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Exclusive Card Sleeve</CardTitle>
                  <CardDescription>100 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Limited edition PokéCollect card sleeves (pack of 50).
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleRedeem(100, "Exclusive Card Sleeve")}
                    disabled={!user || user.points < 100}
                    className="w-full"
                  >
                    Redeem 100 Points
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>$10 Off Your Next Order</CardTitle>
                  <CardDescription>900 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get $10 off your next order. Valid for 30 days after redemption.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleRedeem(900, "$10 Off Coupon")}
                    disabled={!user || user.points < 900}
                    className="w-full"
                  >
                    Redeem 900 Points
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Exclusive Playmat</CardTitle>
                  <CardDescription>1500 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Limited edition PokéCollect playmat with exclusive artwork.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleRedeem(1500, "Exclusive Playmat")}
                    disabled={!user || user.points < 1500}
                    className="w-full"
                  >
                    Redeem 1500 Points
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Points History</CardTitle>
                <CardDescription>Track your points earning and redemption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-medium">Order #1234</div>
                      <div className="text-sm text-muted-foreground">Scarlet & Violet Booster Box (Rip)</div>
                      <div className="text-xs text-muted-foreground">June 10, 2023</div>
                    </div>
                    <div className="text-green-500 font-medium">+150 points</div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-medium">Order #1233</div>
                      <div className="text-sm text-muted-foreground">Charizard VMAX (PSA 10)</div>
                      <div className="text-xs text-muted-foreground">June 5, 2023</div>
                    </div>
                    <div className="text-green-500 font-medium">+300 points</div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-medium">Redeemed $5 Off Coupon</div>
                      <div className="text-xs text-muted-foreground">May 20, 2023</div>
                    </div>
                    <div className="text-red-500 font-medium">-500 points</div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-medium">Order #1232</div>
                      <div className="text-sm text-muted-foreground">Paldean Fates ETB (Ship)</div>
                      <div className="text-xs text-muted-foreground">May 15, 2023</div>
                    </div>
                    <div className="text-green-500 font-medium">+180 points</div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-medium">Sign-up Bonus</div>
                      <div className="text-xs text-muted-foreground">May 1, 2023</div>
                    </div>
                    <div className="text-green-500 font-medium">+100 points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tiers" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="bg-gradient-to-b from-zinc-500 to-zinc-600 text-white rounded-t-lg">
                  <CardTitle>Silver Collector</CardTitle>
                  <CardDescription className="text-zinc-100">0 - 999 points</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="font-medium">Benefits:</div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>1 point per $1 spent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Access to basic rewards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Birthday bonus: 50 points</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    {user && user.points < 1000 ? "Your current tier" : ""}
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="bg-gradient-to-b from-yellow-500 to-amber-600 text-white rounded-t-lg">
                  <CardTitle>Gold Collector</CardTitle>
                  <CardDescription className="text-amber-100">1,000 - 4,999 points</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="font-medium">Benefits:</div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>1.25 points per $1 spent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Early access to new releases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Free shipping on orders over $100</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Birthday bonus: 100 points</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    {user && user.points >= 1000 && user.points < 5000 ? "Your current tier" : ""}
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="bg-gradient-to-b from-purple-500 to-purple-700 text-white rounded-t-lg">
                  <CardTitle>Platinum Collector</CardTitle>
                  <CardDescription className="text-purple-100">5,000+ points</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="font-medium">Benefits:</div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>1.5 points per $1 spent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>VIP access to exclusive products</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Free shipping on all orders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Priority customer service</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 mt-0.5" />
                        <span>Birthday bonus: 250 points</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    {user && user.points >= 5000 ? "Your current tier" : ""}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
