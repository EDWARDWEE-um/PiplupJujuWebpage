import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import WixCart from "@/components/wix-cart"

export const metadata: Metadata = {
  title: "Shopping Cart | PokéCollect",
  description: "View and manage your shopping cart.",
}

export default function CartPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
          <Button variant="outline" asChild>
            <Link href="/products/sealed">Continue Shopping</Link>
          </Button>
        </div>

        <WixCart />
      </div>
    </div>
  )
}
