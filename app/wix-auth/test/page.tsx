import WixAuthStatus from "@/components/wix-auth-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WixAuthTestPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Wix Authentication Test</CardTitle>
            <CardDescription>
              This page demonstrates the Wix authentication flow using Wix-managed login.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              The authentication flow uses Wix's managed login page to handle member authentication. After logging in,
              members are redirected back to your site with tokens that can be used to make API calls on their behalf.
            </p>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Your Authentication Status</h3>
              <WixAuthStatus />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
