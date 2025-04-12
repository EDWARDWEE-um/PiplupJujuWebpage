import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Flame, Package } from "lucide-react"

export default function RipOrShipHero() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
              Rip or Ship Your Pokemon TCG
            </h1>
            <p className="mx-auto max-w-[700px] text-sm sm:text-base text-gray-200">
              Your choice: Watch us open your packs live on stream or get them shipped sealed to your door
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="/rip-or-ship?option=rip" className="w-full sm:w-auto">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white w-full">
                <Flame className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Live Rip
              </Button>
            </Link>
            <Link href="/rip-or-ship?option=ship" className="w-full sm:w-auto">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                <Package className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Ship Sealed
              </Button>
            </Link>
            <Link href="/products/sealed" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full">
                Browse Products
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-white/80 text-xs sm:text-sm">
            Earn 2X loyalty points on all Rip or Ship purchases this week!
          </div>
        </div>
      </div>
    </section>
  )
}
