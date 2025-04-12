import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Scarlet & Violet Booster Box",
      price: 149.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "sealed",
      badge: "New Release",
    },
    {
      id: 2,
      name: "Charizard VMAX (PSA 10)",
      price: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "slabs",
      badge: "Rare",
    },
    {
      id: 3,
      name: "Blaziken VMAX Alt Art",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "singles",
      badge: "Trending",
    },
    {
      id: 4,
      name: "Pokemon Center ETB",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "sealed",
      badge: "Limited",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-8">
      {featuredProducts.map((product) => (
        <Link key={product.id} href={`/products/${product.category}/${product.id}`}>
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
                <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-600 text-black">
                  {product.badge}
                </Badge>
              )}
            </div>
            <CardContent className="p-2 sm:p-3 md:p-4">
              <h3 className="font-semibold text-xs sm:text-sm md:text-base line-clamp-1">{product.name}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm capitalize">{product.category}</p>
            </CardContent>
            <CardFooter className="p-2 sm:p-3 md:p-4 pt-0">
              <p className="font-bold text-sm sm:text-base">${product.price.toFixed(2)}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
