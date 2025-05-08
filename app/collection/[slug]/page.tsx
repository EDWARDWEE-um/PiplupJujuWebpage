import type { Metadata } from "next"
import CollectionPage from "./CollectionPage"

interface CollectionPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = params
  const formattedName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${formattedName} | PokéCollect`,
    description: `Browse our collection of ${formattedName} Pokemon cards and products`,
  }
}

export default function CollectionPageWrapper({ params }: CollectionPageProps) {
  return <CollectionPage slug={params.slug} />
}
