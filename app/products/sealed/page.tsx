import type { Metadata } from "next"
import SealedProductsClientPage from "./SealedProductsClientPage"

export const metadata: Metadata = {
  title: "Sealed Products | PokéCollect",
  description:
    "Browse our collection of sealed Pokemon TCG products including booster boxes, elite trainer boxes, and more.",
}

export default function SealedProductsPage() {
  return <SealedProductsClientPage />
}
