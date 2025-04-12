import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Youtube, Calendar, TrendingUp, Package, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsletterSignupForm from "@/components/newsletter-signup-form"
import YouTubePreview from "@/components/youtube-preview"

export const metadata: Metadata = {
  title: "Newsletter | PIPLUPJUJUTCG",
  description: "Subscribe to our newsletter for the latest Pokémon TCG news, market updates, and exclusive content.",
}

export default function NewsletterPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <Image
          src="/images/piplupjuju-logo.png"
          alt="PIPLUPJUJUTCG Logo"
          width={180}
          height={180}
          className="mb-4"
          priority
        />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">PIPLUPJUJUTCG Newsletter</h1>
        <p className="text-muted-foreground max-w-[700px] text-sm md:text-base">
          Stay updated with the latest Pokémon TCG news, market trends, exclusive deals, and our YouTube content
          delivered straight to your inbox.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_350px] gap-8 items-start">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                <span>Latest YouTube Content</span>
              </CardTitle>
              <CardDescription>
                Check out our latest videos and subscribe to our channel for daily Pokémon TCG content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="featured">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="pack-openings">Pack Openings</TabsTrigger>
                  <TabsTrigger value="market-updates">Market Updates</TabsTrigger>
                </TabsList>
                <TabsContent value="featured" className="space-y-4 pt-4">
                  <YouTubePreview
                    title="Scarlet & Violet Booster Box Opening - INSANE PULLS!"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="12K"
                    date="2 days ago"
                    duration="18:24"
                  />
                  <YouTubePreview
                    title="Top 10 Pokémon Cards to Invest in 2023"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="8.5K"
                    date="1 week ago"
                    duration="15:37"
                  />
                  <YouTubePreview
                    title="Paldean Fates ETB Opening - Shiny Charizard Hunt!"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="10.2K"
                    date="3 days ago"
                    duration="22:15"
                  />
                </TabsContent>
                <TabsContent value="pack-openings" className="space-y-4 pt-4">
                  <YouTubePreview
                    title="Paldean Fates ETB Opening - Shiny Charizard Hunt!"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="10.2K"
                    date="3 days ago"
                    duration="22:15"
                  />
                  <YouTubePreview
                    title="Vintage Pack Opening - Base Set Booster!"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="15.7K"
                    date="2 weeks ago"
                    duration="12:48"
                  />
                  <YouTubePreview
                    title="Mystery Box Opening - What's Inside?"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="7.3K"
                    date="5 days ago"
                    duration="19:52"
                  />
                </TabsContent>
                <TabsContent value="market-updates" className="space-y-4 pt-4">
                  <YouTubePreview
                    title="Top 10 Pokémon Cards to Invest in 2023"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="8.5K"
                    date="1 week ago"
                    duration="15:37"
                  />
                  <YouTubePreview
                    title="Pokémon TCG Market Update - June 2023"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="6.2K"
                    date="2 weeks ago"
                    duration="14:22"
                  />
                  <YouTubePreview
                    title="Are Vintage Cards Still Worth Investing In?"
                    thumbnail="/placeholder.svg?height=200&width=360"
                    views="9.1K"
                    date="3 weeks ago"
                    duration="17:05"
                  />
                </TabsContent>
              </Tabs>

              <div className="flex justify-center">
                <Link
                  href="https://www.youtube.com/@PIPLUPJUJUTCG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Youtube className="mr-2 h-4 w-4" />
                    Subscribe to Our Channel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Content Schedule</span>
              </CardTitle>
              <CardDescription>Our weekly YouTube upload schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col p-4 border rounded-lg">
                  <div className="font-semibold mb-2">Monday</div>
                  <div className="text-sm text-muted-foreground mb-1">Market Monday</div>
                  <p className="text-sm">
                    Weekly market updates and price trends for Pokémon TCG singles and sealed products
                  </p>
                </div>
                <div className="flex flex-col p-4 border rounded-lg">
                  <div className="font-semibold mb-2">Wednesday</div>
                  <div className="text-sm text-muted-foreground mb-1">Pack Crack Wednesday</div>
                  <p className="text-sm">Opening the latest Pokémon TCG products and hunting for rare pulls</p>
                </div>
                <div className="flex flex-col p-4 border rounded-lg">
                  <div className="font-semibold mb-2">Friday</div>
                  <div className="text-sm text-muted-foreground mb-1">Collection Showcase</div>
                  <p className="text-sm">Showcasing amazing collections and rare cards from our community</p>
                </div>
                <div className="flex flex-col p-4 border rounded-lg">
                  <div className="font-semibold mb-2">Sunday</div>
                  <div className="text-sm text-muted-foreground mb-1">Sunday Special</div>
                  <p className="text-sm">Special content including deck profiles, gameplay, and TCG tips & tricks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Newsletter Benefits</span>
              </CardTitle>
              <CardDescription>Why you should subscribe to our newsletter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Market Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Exclusive market analysis and investment tips for Pokémon TCG collectors
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Youtube className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Content Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Be the first to know when we upload new videos and live streams
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Exclusive Deals</h3>
                    <p className="text-sm text-muted-foreground">
                      Special discounts and early access to our store products
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Giveaways</h3>
                    <p className="text-sm text-muted-foreground">
                      Subscriber-only giveaways for rare cards and sealed products
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Subscribe Now</span>
              </CardTitle>
              <CardDescription>
                Join our community and receive weekly updates on Pokémon TCG news, market trends, and exclusive content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsletterSignupForm />
            </CardContent>
            <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
              <p>We respect your privacy. Unsubscribe at any time.</p>
              <p className="mt-2">
                By subscribing, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-primary">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Past Newsletters</CardTitle>
              <CardDescription>Browse our previous newsletter issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-3">
                <Link href="#" className="font-medium hover:underline">
                  June 2023: Summer TCG Market Update
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Top summer picks, Paldean Fates analysis, and upcoming releases
                </p>
              </div>
              <div className="border-b pb-3">
                <Link href="#" className="font-medium hover:underline">
                  May 2023: Scarlet & Violet Set Review
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete breakdown of the new Scarlet & Violet set and chase cards
                </p>
              </div>
              <div className="border-b pb-3">
                <Link href="#" className="font-medium hover:underline">
                  April 2023: Vintage Market Report
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Analysis of vintage card prices and investment opportunities
                </p>
              </div>
              <div>
                <Link href="#" className="text-sm text-primary hover:underline inline-flex items-center">
                  View all past issues
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
