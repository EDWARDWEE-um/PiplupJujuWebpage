"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { WixCmsItem } from "@/lib/wix-cms"
import { Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface WixCmsContentProps {
  items: WixCmsItem[]
  type: "blog" | "newsletter" | "product-update"
  loading?: boolean
}

export default function WixCmsContent({ items, type, loading = false }: WixCmsContentProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No content available at this time.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(item.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {item.content.image && (
              <div className="mb-4">
                <Image
                  src={item.content.image || "/placeholder.svg"}
                  alt={item.title}
                  width={800}
                  height={400}
                  className="rounded-md object-cover w-full"
                />
              </div>
            )}
            <div className="prose prose-sm max-w-none">
              {item.content.excerpt && <p className="text-muted-foreground">{item.content.excerpt}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/${type}/${item.slug}`}>
              <Button variant="outline" size="sm">
                Read More
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
