import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Pre-Orders | PokéCollect",
  description: "Pre-order upcoming Pokemon TCG products and be the first to get them.",
}

export default function PreOrdersPage() {
  const preOrders = [
    {
      id: 1,
      name: "Paradox Rift Booster Box",
      price: 159.99,
      image: "/placeholder.svg?height=300&width=300",
      releaseDate: "November 3, 2023",
      category: "Booster Box",
      set: "Scarlet & Violet",
      badge: "Popular",
      discount: 10,
      originalPrice: 179.99,
    },
    {
      id: 2,
      name: "Paldean Fates Elite Trainer Box",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      releaseDate: "January 26, 2024",
      category: "Elite Trainer Box",
      set: "Scarlet & Violet",
      badge: "Limited",
    },
    {
      id: 3,
      name: "Temporal Forces Booster Box",
      price: 169.99,
      image: "/placeholder.svg?height=300&width=300",
      releaseDate: "March 22, 2024",
      category: "Booster Box",
      set: "Scarlet & Violet",
      badge: "New",
    },
    {
      id: 4,
      name: "Pokemon TCG Pocket Collection Box",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      releaseDate: "December 8, 2023",
      category: "Collection Box",
      set: "Special Release",
    },
    {
      id: 5,
      name: "Charizard ex Premium Collection",
      price: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      releaseDate: "October 27, 2023",
      category: "Premium Collection",
      set: "Scarlet & Violet",
      badge: "Almost Gone",
      discount: 15,
      originalPrice: 139.99,
    },
    {
      id: 6,
      name: "151 Ultra-Premium Collection",
      price: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      releaseDate: "September 22, 2023",
      category: "Ultra-Premium Collection",
      set: "Scarlet & Violet",
      badge: "Sold Out",
      soldOut: true,
    },
  ]

  // Group pre-orders by month
  const currentDate = new Date()
  const thisMonth = preOrders.filter((item) => new Date(item.releaseDate).getMonth() === currentDate.getMonth())
  const nextMonth = preOrders.filter(
    (item) => new Date(item.releaseDate).getMonth() === (currentDate.getMonth() + 1) % 12,
  )
  const future = preOrders.filter(
    (item) =>
      new Date(item.releaseDate).getMonth() !== currentDate.getMonth() &&
      new Date(item.releaseDate).getMonth() !== (currentDate.getMonth() + 1) % 12,
  )

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">Pre-Orders</h1>
        <p className="text-muted-foreground">
          Secure upcoming Pokemon TCG products before they're released. Pre-order now to guarantee your copy!
        </p>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="this-month">This Month</TabsTrigger>
            <TabsTrigger value="next-month">Next Month</TabsTrigger>
            <TabsTrigger value="future">Future</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {preOrders.map((product) => (
                <PreOrderCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="this-month" className="mt-6">
            {thisMonth.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {thisMonth.map((product) => (
                  <PreOrderCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pre-orders releasing this month.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="next-month" className="mt-6">
            {nextMonth.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {nextMonth.map((product) => (
                  <PreOrderCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pre-orders releasing next month.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="future" className="mt-6">
            {future.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {future.map((product) => (
                  <PreOrderCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No future pre-orders available yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-bold">Pre-Order Information</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                Release Dates
              </h3>
              <p className="text-sm text-muted-foreground">
                Release dates are provided by the manufacturer and are subject to change. We'll notify you if there are
                any changes to your pre-order.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Payment Policy
              </h3>
              <p className="text-sm text-muted-foreground">
                Your card will be charged immediately when you place a pre-order. If the price changes before release,
                you'll always get the lower price.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                Shipping
              </h3>
              <p className="text-sm text-muted-foreground">
                Pre-orders are shipped as soon as we receive stock, often 1-2 days before the official release date.
                Priority is given to earliest orders.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PreOrderCard({ product }: { product: any }) {
  const releaseDate = new Date(product.releaseDate)
  const today = new Date()
  const daysUntilRelease = Math.ceil((releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Link href={`/pre-orders/${product.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover w-full aspect-square"
          />
          {product.badge && (
            <Badge
              className={`absolute top-2 right-2 ${
                product.badge === "Sold Out"
                  ? "bg-gray-500 hover:bg-gray-600"
                  : product.badge === "Limited" || product.badge === "Almost Gone"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black"
              }`}
            >
              {product.badge}
            </Badge>
          )}
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">{product.discount}% Off</Badge>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{releaseDate.toLocaleDateString()}</span>
            </div>
            <Badge variant="outline" className="text-white border-white text-[10px] h-5">
              {daysUntilRelease > 0 ? `${daysUntilRelease} days left` : "Released"}
            </Badge>
          </div>
        </div>
        <CardContent className="p-3 md:p-4">
          <h3 className="font-semibold text-sm md:text-base line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground">
            {product.category} · {product.set}
          </p>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0 flex justify-between items-center">
          <div>
            {product.originalPrice ? (
              <div className="flex items-center gap-1">
                <p className="font-bold text-sm md:text-base">${product.price.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
              </div>
            ) : (
              <p className="font-bold text-sm md:text-base">${product.price.toFixed(2)}</p>
            )}
          </div>
          {product.soldOut ? (
            <Button size="sm" variant="outline" disabled>
              Sold Out
            </Button>
          ) : (
            <Button size="sm">Pre-Order</Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
