import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Rip or Ship | PokéCollect",
  description: "Choose whether we open your sealed products live on stream or ship them to you sealed.",
}

export default function RipOrShipPage() {
  return (
    <div className="container px-4 py-6 sm:py-8 md:px-6 md:py-12">
      <div className="space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Rip or Ship</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          Purchase sealed products and decide whether you want us to open them live on stream or ship them directly to
          you.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 mt-6 sm:mt-8 md:mt-12 max-w-4xl mx-auto">
        <Card className="bg-gradient-to-b from-red-500 to-red-600 text-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
              <Flame className="h-5 w-5 sm:h-6 sm:w-6" />
              Live Rip
            </CardTitle>
            <CardDescription className="text-white/80 text-xs sm:text-sm">
              We open your products live on stream
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
            <ul className="space-y-1 sm:space-y-2">
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Watch your packs being opened in real-time</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Share the excitement with our community</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>All cards pulled are shipped to you</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Clips of your best pulls shared on social media</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Lower shipping costs (singles only)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="px-4 pb-4 sm:px-6 sm:pb-6">
            <Link href="/products/sealed" className="w-full">
              <Button className="w-full bg-white text-red-600 hover:bg-white/90 text-xs sm:text-sm h-9 sm:h-10">
                Browse Products for Live Rip
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-b from-blue-500 to-blue-600 text-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
              <Package className="h-5 w-5 sm:h-6 sm:w-6" />
              Ship Sealed
            </CardTitle>
            <CardDescription className="text-white/80 text-xs sm:text-sm">
              We ship the sealed products directly to you
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
            <ul className="space-y-1 sm:space-y-2">
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Receive your products factory sealed</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Open at your own pace and convenience</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Keep sealed for your collection</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Potential for long-term value appreciation</span>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-base sm:text-lg">✓</span>
                <span>Great for gifts or special occasions</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="px-4 pb-4 sm:px-6 sm:pb-6">
            <Link href="/products/sealed" className="w-full">
              <Button className="w-full bg-white text-blue-600 hover:bg-white/90 text-xs sm:text-sm h-9 sm:h-10">
                Browse Products for Shipping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto">
        <Tabs defaultValue="how-it-works">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="how-it-works" className="text-xs sm:text-sm">
              How It Works
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-xs sm:text-sm">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="text-xs sm:text-sm">
              Testimonials
            </TabsTrigger>
          </TabsList>
          <TabsContent value="how-it-works" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                      <span className="font-bold text-lg">1</span>
                    </div>
                    <h3 className="font-medium">Choose Products</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse our selection of sealed Pokemon TCG products.
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                      <span className="font-bold text-lg">2</span>
                    </div>
                    <h3 className="font-medium">Select Rip or Ship</h3>
                    <p className="text-sm text-muted-foreground">
                      Decide if you want us to open it live or ship it sealed.
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                      <span className="font-bold text-lg">3</span>
                    </div>
                    <h3 className="font-medium">Enjoy!</h3>
                    <p className="text-sm text-muted-foreground">
                      Watch the livestream or wait for your sealed package.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Live Rip Schedule</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We host live opening streams several times a week. After your purchase, we'll schedule your opening
                    and notify you when it's time.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium">Tuesdays</p>
                      <p className="text-muted-foreground">7:00 PM - 9:00 PM EST</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium">Thursdays</p>
                      <p className="text-muted-foreground">8:00 PM - 10:00 PM EST</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium">Saturdays</p>
                      <p className="text-muted-foreground">3:00 PM - 6:00 PM EST</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">What happens if I miss the livestream?</h3>
                  <p className="text-sm text-muted-foreground">
                    Don't worry! All livestreams are recorded and available to watch later. We'll also send you a
                    summary of your pulls via email.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">How long does shipping take?</h3>
                  <p className="text-sm text-muted-foreground">
                    For "Ship Sealed" orders, we typically ship within 1-2 business days. For "Live Rip" orders, we ship
                    your pulls within 1-2 business days after the livestream.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Can I change my mind after ordering?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can change from "Live Rip" to "Ship Sealed" (or vice versa) up to 24 hours before the scheduled
                    livestream. Contact our customer service to make changes.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">What if I pull a valuable card?</h3>
                  <p className="text-sm text-muted-foreground">
                    All cards pulled during a "Live Rip" belong to you! For especially valuable pulls, we offer free
                    sleeve and toploader protection, and insurance for shipping.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Do you ship internationally?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we ship worldwide! International shipping rates apply and will be calculated at checkout.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="testimonials" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 fill-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm mb-3">
                      "I chose the Live Rip option for my Scarlet & Violet booster box and it was so much fun! Pulled a
                      Charizard ex and the chat went wild. Highly recommend!"
                    </p>
                    <p className="text-sm font-medium">- Michael T.</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 fill-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm mb-3">
                      "I've used the Ship Sealed option for several ETBs that I'm collecting. Always arrived in perfect
                      condition with great packaging. Will order again!"
                    </p>
                    <p className="text-sm font-medium">- Sarah K.</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 fill-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm mb-3">
                      "The Live Rip experience is addictive! I've done it three times now and it's so exciting to see
                      your packs opened live. The community is awesome too!"
                    </p>
                    <p className="text-sm font-medium">- David R.</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 fill-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm mb-3">
                      "Bought some vintage packs and chose Ship Sealed. They arrived double-protected and in pristine
                      condition. Great service and communication throughout."
                    </p>
                    <p className="text-sm font-medium">- Emily W.</p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Link href="/products/sealed">
                    <Button size="lg">Try Rip or Ship Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
