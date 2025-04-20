import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import WixProductDetail from "@/components/wix-product-detail"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // In a real implementation, you would fetch the product data from Wix
  // and use it to generate the metadata
  return {
    title: `${params.slug} | PokéCollect`,
    description: `Buy ${params.slug} at PokéCollect, your premier Pokemon TCG marketplace.`,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <Link href="/products/sealed" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
      </div>

      <WixProductDetail productSlug={params.slug} />
    </div>
  )
}
