import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | PokéCollect",
  description: "Get in touch with our customer support team.",
}

export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about your order, our products, or the Rip or Ship service? We're here to help!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-2">
                <Phone className="h-6 w-6 text-primary" />
                <span>Call Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">1-800-POKEMON</p>
              <p className="text-sm text-muted-foreground mt-1">
                Monday - Friday: 9AM - 6PM EST
                <br />
                Saturday: 10AM - 4PM EST
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <span>Email Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">support@pokecollect.com</p>
              <p className="text-sm text-muted-foreground mt-1">
                We typically respond within 24 hours
                <br />
                during business days
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span>Live Chat</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">Chat with us</p>
              <p className="text-sm text-muted-foreground mt-1">
                Available during business hours
                <br />
                for immediate assistance
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Button>Start Chat</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-number">Order Number (Optional)</Label>
                  <Input id="order-number" placeholder="e.g. 1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order-status">Order Status</SelectItem>
                      <SelectItem value="rip-or-ship">Rip or Ship Question</SelectItem>
                      <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="return-refund">Return/Refund</SelectItem>
                      <SelectItem value="technical-issue">Technical Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">What is Rip or Ship?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rip or Ship is our unique service where you can choose to have your sealed products opened live on
                    stream (Rip) or shipped to you sealed (Ship).
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How do I track my order?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can track your order by logging into your account and viewing your order history. Once your
                    order ships, you'll receive a tracking number via email.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">What is your return policy?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We accept returns of sealed products within 30 days of delivery. Please note that products opened
                    through our Rip service cannot be returned.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How do loyalty points work?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You earn 1 point for every $1 spent, and 2X points on Rip or Ship purchases. Points can be redeemed
                    for discounts, free shipping, and exclusive products.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">Map Placeholder</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">PokéCollect Headquarters</p>
                  <p>123 Trading Card Lane</p>
                  <p>San Francisco, CA 94103</p>
                  <p>United States</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
