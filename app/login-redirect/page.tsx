import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WixRedirectLoginButton } from "@/components/wix-redirect-login-button"

export default function LoginRedirectPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to PIPLUPJUJUTCG</CardTitle>
          <CardDescription>Sign in to your account to access your orders, wishlist, and more.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <WixRedirectLoginButton label="Login with Wix" />

          <div className="text-center text-sm text-muted-foreground">
            <p>
              By logging in, you agree to our{" "}
              <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
