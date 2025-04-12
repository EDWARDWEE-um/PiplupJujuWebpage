import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PriceChart from "@/components/price-chart"

export const metadata: Metadata = {
  title: "Blaziken VMAX (Alternate Art Secret) | PokéTCG Store",
  description: "Blaziken VMAX (Alternate Art Secret) from SWSH06: Chilling Reign - Card #201/198",
}

export default function BlazikenVMAXPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <Link href="/products/singles" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Singles
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="sticky top-24">
            <Card className="overflow-hidden bg-white rounded-lg shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-[1/1.4] w-full">
                  <Image
                    src="/placeholder.svg?height=600&width=430"
                    alt="Blaziken VMAX (Alternate Art Secret)"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Blaziken VMAX (Alternate Art Secret)</h1>
            <p className="mt-2 text-gray-600">SWSH06: Chilling Reign | Card #201/198</p>
            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold text-red-600">$199.99</span>
              <span className="ml-2 text-sm text-green-600">In Stock</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button variant="outline">Add to Watchlist</Button>
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="mb-4 text-lg font-semibold">Card Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Set</p>
                <p>SWSH06: Chilling Reign</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Number</p>
                <p>201/198</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Rarity</p>
                <p>Secret Rare</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Type</p>
                <p>Fire</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">HP</p>
                <p>320</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Artist</p>
                <p>Shigenori Negishi</p>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <p className="text-sm text-gray-700">
              With a delightfully offbeat art style, this alternate-art version of Blaziken VMAX is one of the most
              beloved cards from Chilling Reign. The dynamic pose and vibrant colors make this a standout collectible
              for any Pokémon TCG enthusiast.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <PriceChart productType="blaziken-vmax-alt" />
          </div>
        </div>
      </div>
    </div>
  )
}
