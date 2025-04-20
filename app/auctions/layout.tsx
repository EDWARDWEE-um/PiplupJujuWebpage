import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auctions | PokéCollect",
  description: "Bid on rare Pokemon TCG cards and sealed products.",
}

export default function AuctionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 