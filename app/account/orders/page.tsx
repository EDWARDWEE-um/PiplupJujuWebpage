"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Flame, Package, Search, ShoppingBag, Truck, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Settings } from "lucide-react"

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  // Mock orders data
  const orders = [
    {
      id: "1234",
      date: "June 10, 2023",
      status: "processing",
      total: 149.99,
      items: [
        {
          id: 1,
          name: "Scarlet & Violet Booster Box",
          price: 149.99,
          image: "/placeholder.svg?height=80&width=80",
          quantity: 1,
          ripOrShip: "rip",
          ripDate: "June 18, 2023 at 7:00 PM EST",
        },
      ],
    },
    {
      id: "1233",
      date: "June 5, 2023",
      status: "shipped",
      total: 299.99,
      trackingNumber: "9400 1000 0000 0000 0000 00",
      estimatedDelivery: "June 12, 2023",
      items: [
        {
          id: 2,
          name: "Charizard VMAX (PSA 10)",
          price: 299.99,
          image: "/placeholder.svg?height=80&width=80",
          quantity: 1,
        },
      ],
    },
    {
      id: "1232",
      date: "May 20, 2023",
      status: "delivered",
      total: 89.99,
      trackingNumber: "9400 1000 0000 0000 0000 01",
      deliveryDate: "May 25, 2023",
      items: [
        {
          id: 3,
          name: "Pokemon Center ETB",
          price: 89.99,
          image: "/placeholder.svg?height=80&width=80",
          quantity: 1,
          ripOrShip: "ship",
        },
      ],
    },
    {
      id: "1231",
      date: "May 15, 2023",
      status: "completed",
      total: 49.98,
      items: [
        {
          id: 4,
          name: "Pikachu V Full Art",
          price: 24.99,
          image: "/placeholder.svg?height=80&width=80",
          quantity: 2,
        },
      ],
    },
  ]

  // Filter orders based on search term, status, and date
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = filterStatus === "all" || order.status === filterStatus

    const matchesDate =
      filterDate === "all" ||
      (filterDate === "last-30-days" && new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (filterDate === "last-3-months" && new Date(order.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)) ||
      (filterDate === "last-6-months" && new Date(order.date) > new Date(Date.now() - 180 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-yellow-500 text-black">Processing</Badge>
      case "shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "completed":
        return <Badge className="bg-purple-500">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                <Link href="/account">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Link href="/account/orders">
                  <Button variant="default" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                </Link>
                <Link href="/loyalty">
                  <Button variant="ghost" className="w-full justify-start">
                    <Award className="mr-2 h-4 w-4" />
                    Loyalty Points
                  </Button>
                </Link>
                <Link href="/account/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>View and track your orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-full sm:w-[140px]">
                    <Select defaultValue={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-[160px]">
                    <Select defaultValue={filterDate} onValueChange={setFilterDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                        <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                        <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6 space-y-6">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <div className="font-medium">Order #{order.id}</div>
                            <div className="text-xs text-muted-foreground">Placed on {order.date}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.status)}
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/account/orders/${order.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-t"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                              {item.ripOrShip && (
                                <div className="text-sm flex items-center mt-1">
                                  {item.ripOrShip === "rip" ? (
                                    <>
                                      <Flame className="h-3 w-3 mr-1 text-red-500" />
                                      <span>Live Rip</span>
                                      {item.ripDate && (
                                        <span className="ml-2 text-xs text-muted-foreground">
                                          Scheduled for {item.ripDate}
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <Package className="h-3 w-3 mr-1 text-blue-500" />
                                      <span>Ship Sealed</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                        <div className="bg-muted px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t">
                          <div className="flex items-center gap-2">
                            {order.status === "shipped" && (
                              <div className="flex items-center text-sm">
                                <Truck className="h-4 w-4 mr-1 text-blue-500" />
                                <span>
                                  Tracking: {order.trackingNumber}
                                  <span className="ml-2 text-xs text-muted-foreground">
                                    Est. Delivery: {order.estimatedDelivery}
                                  </span>
                                </span>
                              </div>
                            )}
                            {order.status === "delivered" && (
                              <div className="flex items-center text-sm">
                                <Package className="h-4 w-4 mr-1 text-green-500" />
                                <span>Delivered on {order.deliveryDate}</span>
                              </div>
                            )}
                            {order.items.some((item) => item.ripOrShip === "rip") && (
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-1 text-red-500" />
                                <span>Live Rip Scheduled</span>
                              </div>
                            )}
                          </div>
                          <div className="font-medium">Total: ${order.total.toFixed(2)}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm || filterStatus !== "all" || filterDate !== "all"
                          ? "Try adjusting your filters or search term"
                          : "You haven't placed any orders yet"}
                      </p>
                      <Button asChild>
                        <Link href="/products/sealed">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="processing" className="mt-6 space-y-6">
                  {filteredOrders.filter((order) => order.status === "processing").length > 0 ? (
                    filteredOrders
                      .filter((order) => order.status === "processing")
                      .map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <div className="font-medium">Order #{order.id}</div>
                              <div className="text-xs text-muted-foreground">Placed on {order.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(order.status)}
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/account/orders/${order.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-t"
                            >
                              <div className="flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                                {item.ripOrShip && (
                                  <div className="text-sm flex items-center mt-1">
                                    {item.ripOrShip === "rip" ? (
                                      <>
                                        <Flame className="h-3 w-3 mr-1 text-red-500" />
                                        <span>Live Rip</span>
                                        {item.ripDate && (
                                          <span className="ml-2 text-xs text-muted-foreground">
                                            Scheduled for {item.ripDate}
                                          </span>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <Package className="h-3 w-3 mr-1 text-blue-500" />
                                        <span>Ship Sealed</span>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                          <div className="bg-muted px-4 py-3 flex justify-between items-center border-t">
                            <div className="text-sm text-muted-foreground">Your order is being processed</div>
                            <div className="font-medium">Total: ${order.total.toFixed(2)}</div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No processing orders</h3>
                      <p className="text-muted-foreground mb-4">You don't have any orders currently being processed</p>
                      <Button asChild>
                        <Link href="/products/sealed">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="shipped" className="mt-6 space-y-6">
                  {filteredOrders.filter((order) => order.status === "shipped").length > 0 ? (
                    filteredOrders
                      .filter((order) => order.status === "shipped")
                      .map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <div className="font-medium">Order #{order.id}</div>
                              <div className="text-xs text-muted-foreground">Placed on {order.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(order.status)}
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/account/orders/${order.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-t"
                            >
                              <div className="flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                          <div className="bg-muted px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t">
                            <div className="flex items-center text-sm">
                              <Truck className="h-4 w-4 mr-1 text-blue-500" />
                              <span>
                                Tracking: {order.trackingNumber}
                                <span className="ml-2 text-xs text-muted-foreground">
                                  Est. Delivery: {order.estimatedDelivery}
                                </span>
                              </span>
                            </div>
                            <div className="font-medium">Total: ${order.total.toFixed(2)}</div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No shipped orders</h3>
                      <p className="text-muted-foreground mb-4">You don't have any orders currently being shipped</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="mt-6 space-y-6">
                  {filteredOrders.filter((order) => order.status === "delivered" || order.status === "completed")
                    .length > 0 ? (
                    filteredOrders
                      .filter((order) => order.status === "delivered" || order.status === "completed")
                      .map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <div className="font-medium">Order #{order.id}</div>
                              <div className="text-xs text-muted-foreground">Placed on {order.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(order.status)}
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/account/orders/${order.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-t"
                            >
                              <div className="flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                          <div className="bg-muted px-4 py-3 flex justify-between items-center border-t">
                            <div className="text-sm">
                              {order.status === "delivered" ? (
                                <div className="flex items-center">
                                  <Package className="h-4 w-4 mr-1 text-green-500" />
                                  <span>Delivered on {order.deliveryDate}</span>
                                </div>
                              ) : (
                                <div className="text-muted-foreground">Completed</div>
                              )}
                            </div>
                            <div className="font-medium">Total: ${order.total.toFixed(2)}</div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No completed orders</h3>
                      <p className="text-muted-foreground mb-4">You don't have any completed orders yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
