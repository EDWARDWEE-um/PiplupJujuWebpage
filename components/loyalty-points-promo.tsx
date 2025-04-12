import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Gift, TrendingUp } from "lucide-react"

export default function LoyaltyPointsPromo() {
  return (
    <Card className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-none">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs sm:text-sm">
              <Award className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              PokéCollect Rewards
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Earn Loyalty Points with Every Purchase</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Earn 1 point per $1 spent</span>
              </li>
              <li className="flex items-start gap-2">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  Redeem points for discounts, exclusive products, and priority rip slots
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Double points on all Rip or Ship purchases this week!</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link href="/loyalty">
                <Button className="bg-white text-amber-600 hover:bg-white/90 text-sm sm:text-base">
                  View Rewards Program
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 sm:p-6 text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">2X</div>
            <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">POINTS</div>
            <p className="mb-4 text-sm sm:text-base">On all Rip or Ship purchases</p>
            <div className="text-xs sm:text-sm bg-white/20 p-3 rounded-md">
              Limited time offer: Earn double points when you choose our Rip or Ship service for any sealed product!
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
