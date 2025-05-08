import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

export default function WixOAuthSetupPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Wix OAuth Setup Guide</CardTitle>
          <CardDescription>Follow these steps to configure your Wix OAuth app correctly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              The &quot;This content is blocked&quot; error occurs when your redirect URI isn&apos;t properly configured
              in your Wix OAuth app.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 1: Access Your Wix Project</h2>
            <p>Log in to your Wix Developer Center and navigate to your project.</p>

            <h2 className="text-xl font-semibold">Step 2: Go to OAuth Apps</h2>
            <p>In your project dashboard, find and click on &quot;OAuth Apps&quot; in the sidebar.</p>

            <h2 className="text-xl font-semibold">Step 3: Edit Your OAuth App</h2>
            <p>Find the OAuth app you&apos;re using for this authentication flow and click &quot;Edit&quot;.</p>

            <h2 className="text-xl font-semibold">Step 4: Add Redirect URIs</h2>
            <p>
              In the OAuth app settings, find the section for &quot;Redirect URIs&quot; or &quot;Authorized Redirect
              URIs&quot;.
            </p>

            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium">Add the following URL as an allowed redirect URI:</p>
              <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto text-sm">
                {typeof window !== "undefined"
                  ? `${window.location.origin}/enhanced-callback`
                  : "https://your-domain.com/enhanced-callback"}
              </pre>
            </div>

            <h2 className="text-xl font-semibold">Step 5: Save Your Changes</h2>
            <p>
              Click the &quot;Save&quot; or &quot;Update&quot; button to save your changes to the OAuth app
              configuration.
            </p>

            <h2 className="text-xl font-semibold">Step 6: Test Your Authentication</h2>
            <p>Return to your application and try the authentication flow again.</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-6">
            <h3 className="text-lg font-medium text-amber-800">Troubleshooting Tips</h3>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-amber-700">
              <li>
                Make sure the redirect URI exactly matches what&apos;s in your code, including the protocol
                (http/https).
              </li>
              <li>Check that you&apos;re using the correct client ID in your application.</li>
              <li>Clear your browser cache and cookies before testing again.</li>
              <li>Try using an incognito/private browsing window for testing.</li>
              <li>Check the browser console for any additional error messages.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
