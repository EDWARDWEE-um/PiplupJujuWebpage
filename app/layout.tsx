import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { AuthProvider } from "@/hooks/use-auth"
import { WixEcommerceProvider } from "@/contexts/wix-ecommerce-context"
import { ShippingProvider } from "@/contexts/shipping-context"
import { GamificationProvider } from "@/contexts/gamification-context"
import { AuthModeIndicator } from "@/components/auth-mode-indicator"
import { WixClientProvider } from "@/context/wix-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PokéCollect - Pokemon TCG Marketplace",
  description: "Your premier destination for Pokemon TCG cards, sealed products, and live events.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <WixClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <WixEcommerceProvider>
                <ShippingProvider>
                  <GamificationProvider>
                    <div className="relative flex min-h-screen flex-col">
                      <SiteHeader />
                      <div className="flex-1">{children}</div>
                      <SiteFooter />
                    </div>
                  </GamificationProvider>
                </ShippingProvider>
              </WixEcommerceProvider>
            </AuthProvider>
            <AuthModeIndicator />
          </ThemeProvider>
        </WixClientProvider>
      </body>
    </html>
  )
}
