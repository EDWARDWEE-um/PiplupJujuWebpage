"use client"

import { Badge } from "@/components/ui/badge"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Package, Settings, ShoppingBag, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function AccountPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container py-6 sm:py-8 md:py-12 px-4">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base sm:text-lg">{user.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
              <nav className="flex flex-col space-y-1">
                <Link href="/account">
                  <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Link href="/account/orders">
                  <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                </Link>
                <Link href="/loyalty">
                  <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10">
                    <Award className="mr-2 h-4 w-4" />
                    Loyalty Points
                  </Button>
                </Link>
                <Link href="/account/settings">
                  <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-3/4">
          <Tabs defaultValue="overview">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="text-xs sm:text-sm flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs sm:text-sm flex-1">
                Recent Orders
              </TabsTrigger>
              <TabsTrigger value="points" className="text-xs sm:text-sm flex-1">
                Loyalty Points
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <div className="text-xl sm:text-2xl font-bold">{user.points}</div>
                    <p className="text-xs text-muted-foreground">+50 points from your last purchase</p>
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <Link href="/loyalty">
                      <Button variant="ghost" size="sm" className="text-xs h-8">
                        View rewards
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <div className="text-xl sm:text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">1 shipping soon, 1 processing</p>
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <Link href="/account/orders">
                      <Button variant="ghost" size="sm" className="text-xs h-8">
                        View orders
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Rips</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <div className="text-xl sm:text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Scheduled for June 15, 7:00 PM</p>
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <Link href="/account/rips">
                      <Button variant="ghost" size="sm" className="text-xs h-8">
                        View schedule
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <p className="text-xs sm:text-sm font-medium leading-none">Order #1234 Placed</p>
                      <p className="text-xs text-muted-foreground">Scarlet & Violet Booster Box (Rip) - $149.99</p>
                      <p className="text-xs text-muted-foreground">June 10, 2023</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-500">
                      <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>+150 points</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Package className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <p className="text-xs sm:text-sm font-medium leading-none">Order #1233 Shipped</p>
                      <p className="text-xs text-muted-foreground">Charizard VMAX (PSA 10) - $299.99</p>
                      <p className="text-xs text-muted-foreground">June 5, 2023</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-500">
                      <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>+300 points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>View and manage your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Order #1234</div>
                          <div className="text-xs text-muted-foreground">Placed on June 10, 2023</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-500 text-black">Processing</Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="flex-1">
                          <div className="font-medium">Scarlet & Violet Booster Box (Rip)</div>
                          <div className="text-sm text-muted-foreground">Quantity: 1</div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Rip Date:</span> June 15, 7:00 PM
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$149.99</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Order #1233</div>
                          <div className="text-xs text-muted-foreground">Placed on June 5, 2023</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500">Shipped</Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="flex-1">
                          <div className="font-medium">Charizard VMAX (PSA 10)</div>
                          <div className="text-sm text-muted-foreground">Quantity: 1</div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Tracking:</span> USPS 9400 1000 0000 0000 0000 00
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$299.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href="/account/orders">
                    <Button variant="outline">View All Orders</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="points" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loyalty Points</CardTitle>
                  <CardDescription>Earn and redeem points for rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6 text-center">
                      <div className="text-5xl font-bold mb-2">{user.points}</div>
                      <div className="text-sm text-muted-foreground">Available Points</div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Available Rewards</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">$5 Off Your Next Order</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 500 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 500}>
                            Redeem
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">Free Shipping</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 300 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 300}>
                            Redeem
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">Priority Rip Slot</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 200 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 200}>
                            Redeem
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">Exclusive Card Sleeve</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 100 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 100}>
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Recent Points Activity</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Order #1234</div>
                            <div className="text-xs text-muted-foreground">June 10, 2023</div>
                          </div>
                          <div className="text-green-500 font-medium">+150 points</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Order #1233</div>
                            <div className="text-xs text-muted-foreground">June 5, 2023</div>
                          </div>
                          <div className="text-green-500 font-medium">+300 points</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Redeemed $5 Off Coupon</div>
                            <div className="text-xs text-muted-foreground">May 20, 2023</div>
                          </div>
                          <div className="text-red-500 font-medium">-500 points</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href="/loyalty">
                    <Button>View Full Rewards Program</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>View and manage your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Order #1234</div>
                          <div className="text-xs text-muted-foreground">Placed on June 10, 2023</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-500 text-black">Processing</Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="flex-1">
                          <div className="font-medium">Scarlet & Violet Booster Box (Rip)</div>
                          <div className="text-sm text-muted-foreground">Quantity: 1</div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Rip Date:</span> June 15, 7:00 PM
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$149.99</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Order #1233</div>
                          <div className="text-xs text-muted-foreground">Placed on June 5, 2023</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500">Shipped</Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="flex-1">
                          <div className="font-medium">Charizard VMAX (PSA 10)</div>
                          <div className="text-sm text-muted-foreground">Quantity: 1</div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Tracking:</span> USPS 9400 1000 0000 0000 0000 00
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$299.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href="/account/orders">
                    <Button variant="outline">View All Orders</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="points" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loyalty Points</CardTitle>
                  <CardDescription>Earn and redeem points for rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6 text-center">
                      <div className="text-5xl font-bold mb-2">{user.points}</div>
                      <div className="text-sm text-muted-foreground">Available Points</div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Available Rewards</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">$5 Off Your Next Order</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 500 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 500}>
                            Redeem
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">Free Shipping</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 300 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 300}>
                            Redeem
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">Priority Rip Slot</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 200 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 200}>
                            Redeem
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="font-medium">Exclusive Card Sleeve</div>
                          <div className="text-sm text-muted-foreground mb-4">Redeem 100 points</div>
                          <Button variant="outline" size="sm" disabled={user.points < 100}>
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Recent Points Activity</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Order #1234</div>
                            <div className="text-xs text-muted-foreground">June 10, 2023</div>
                          </div>
                          <div className="text-green-500 font-medium">+150 points</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Order #1233</div>
                            <div className="text-xs text-muted-foreground">June 5, 2023</div>
                          </div>
                          <div className="text-green-500 font-medium">+300 points</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Redeemed $5 Off Coupon</div>
                            <div className="text-xs text-muted-foreground">May 20, 2023</div>
                          </div>
                          <div className="text-red-500 font-medium">-500 points</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href="/loyalty">
                    <Button>View Full Rewards Program</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
