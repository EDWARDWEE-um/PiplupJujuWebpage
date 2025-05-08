import type { Metadata } from "next"
import CategoryClientPage from "./CategoryClientPage"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params
  const formattedName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${formattedName} | Pokemon TCG Store`,
    description: `Browse our collection of ${formattedName} Pokemon cards and products.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryClientPage slug={params.slug} />
}
