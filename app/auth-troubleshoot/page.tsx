import { EnvChecker } from "@/components/env-checker"

export default function AuthTroubleshootPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Authentication Troubleshooting</h1>
      <EnvChecker />

      <div className="max-w-2xl mx-auto mt-8 p-6 border rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Common Authentication Issues</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Missing Environment Variables</h3>
            <p className="text-sm text-muted-foreground">
              The most common issue is missing environment variables. Make sure you've set up all required variables.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Invalid Client ID</h3>
            <p className="text-sm text-muted-foreground">
              Ensure your Wix Client ID is correct and associated with your Wix project.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Redirect URI Not Configured</h3>
            <p className="text-sm text-muted-foreground">
              Make sure you've added all necessary redirect URIs in your Wix OAuth app settings.
            </p>
          </div>

          <div>
            <h3 className="font-medium">CORS Issues</h3>
            <p className="text-sm text-muted-foreground">
              If you're seeing CORS errors, ensure your domain is properly configured in your Wix app settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
