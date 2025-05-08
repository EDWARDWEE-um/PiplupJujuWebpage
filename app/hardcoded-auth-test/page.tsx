import { HardcodedGoogleAuth } from "@/components/hardcoded-google-auth"

export default function HardcodedAuthTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Hardcoded Authentication Test</h1>
      <p className="text-center text-muted-foreground mb-8">
        This page uses a hardcoded client ID instead of environment variables
      </p>

      <HardcodedGoogleAuth />

      <div className="max-w-md mx-auto mt-8 p-4 border rounded-md bg-amber-50 text-amber-800 text-sm">
        <h2 className="font-semibold mb-2">How This Works:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>This component bypasses environment variables completely</li>
          <li>It uses a hardcoded client ID: a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3</li>
          <li>The Google authentication flow should work regardless of your .env setup</li>
          <li>If this works, we can update your main authentication system to use this approach</li>
        </ul>
      </div>
    </div>
  )
}
