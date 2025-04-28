import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import WixProductGrid from "@/components/wix-product-grid"

export const metadata: Metadata = {
  title: "Single Cards | PokéCollect",
  description: "Browse our collection of Pokemon TCG single cards.",
}

export default function SingleCardsPage() {
  // Category ID for single cards
  const singleCardsCategoryId = "single-cards"

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Reset
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <Slider defaultValue={[0, 300]} max={500} step={1} />
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="h-8" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="h-8" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Rarity</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="common" />
                  <Label htmlFor="common">Common</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="uncommon" />
                  <Label htmlFor="uncommon">Uncommon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rare" />
                  <Label htmlFor="rare">Rare</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ultra-rare" />
                  <Label htmlFor="ultra-rare">Ultra Rare</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="secret-rare" />
                  <Label htmlFor="secret-rare">Secret Rare</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Set</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="scarlet-violet" />
                  <Label htmlFor="scarlet-violet">Scarlet & Violet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="paldean-fates" />
                  <Label htmlFor="paldean-fates">Paldean Fates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evolving-skies" />
                  <Label htmlFor="evolving-skies">Evolving Skies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="silver-tempest" />
                  <Label htmlFor="silver-tempest">Silver Tempest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fusion-strike" />
                  <Label htmlFor="fusion-strike">Fusion Strike</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="darkness-ablaze" />
                  <Label htmlFor="darkness-ablaze">Darkness Ablaze</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Card Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pokemon" />
                  <Label htmlFor="pokemon">Pokémon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trainer" />
                  <Label htmlFor="trainer">Trainer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="energy" />
                  <Label htmlFor="energy">Energy</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Condition</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mint" />
                  <Label htmlFor="mint">Mint</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="near-mint" />
                  <Label htmlFor="near-mint">Near Mint</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="excellent" />
                  <Label htmlFor="excellent">Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="good" />
                  <Label htmlFor="good">Good</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Single Cards</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-8 lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="featured">
                <SelectTrigger className="w-full sm:w-[180px] h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <WixProductGrid categoryId={singleCardsCategoryId} limit={12} />

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Watch Us on TikTok!</h2>
            <p className="text-gray-700">
              Follow our TikTok channel for live pack openings, card pulls, and market updates on the latest Pokémon TCG
              releases!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
