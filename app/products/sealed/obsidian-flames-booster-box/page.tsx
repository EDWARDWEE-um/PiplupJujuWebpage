import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Package, Star } from "lucide-react"

export default function ObsidianFlamesBoosterBoxPage() {
  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      <Link
        href="/products/sealed"
        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Sealed Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square md:sticky md:top-24">
          <Image
            src="/obsidian-flames-pack.png"
            alt="Obsidian Flames Booster Box"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>
              <Badge variant="outline">Rumble Eligible</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Pokémon TCG: Scarlet & Violet—Obsidian Flames Booster Box
            </h1>
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground ml-1">(42 reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$149.99</span>
            <span className="text-lg text-muted-foreground line-through">$179.99</span>
            <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
              Save $30.00
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-muted-foreground">
              The Obsidian Flames expansion introduces Tera Pokémon ex to the Scarlet & Violet Series, featuring
              powerful Fire-type Tera Pokémon like Charizard ex and Tyranitar ex. Each booster box contains 36 packs,
              with each pack containing 10 cards and 1 Energy.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Box Contents</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>36 Pokémon TCG: Scarlet & Violet—Obsidian Flames booster packs</li>
              <li>10 cards per pack, including 1 rare card and 1 Energy</li>
              <li>Chance to pull ultra-rare Tera Pokémon ex cards</li>
              <li>Possibility of special illustration rare cards</li>
            </ul>
          </div>

          <div className="pt-4 border-t">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Link href="/rumble" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  <Package className="mr-2 h-5 w-5" /> Use for Rumble
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Purchase this product to participate in the current Rumble event. After purchase, you'll be able to
              select your slot number.
            </p>
          </div>

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4 text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-400">Rumble Special Offer</p>
              <p className="mt-1 text-amber-700 dark:text-amber-300">
                Buy this booster box for the Rumble event and get a 10% discount on your next purchase!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
