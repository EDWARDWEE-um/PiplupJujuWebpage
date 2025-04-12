import type { Metadata } from "next"
import LivestreamsClientPage from "./LivestreamsClientPage"

export const metadata: Metadata = {
  title: "Livestream Calendar | PokéCollect",
  description: "View upcoming Pokemon TCG livestreams and set notifications.",
}

export default function LivestreamsPage() {
  return <LivestreamsClientPage />
}
