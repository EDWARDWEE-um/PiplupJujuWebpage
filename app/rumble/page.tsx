import type { Metadata } from "next"
import RumbleDashboard from "./rumble-dashboard"

export const metadata: Metadata = {
  title: "Pokémon TCG Rumble | PokéCollect",
  description: "Join our exciting Rumble events, compete for bounties, and track your stats against other trainers.",
}

export default function RumblePage() {
  return <RumbleDashboard />
}
