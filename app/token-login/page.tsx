import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DirectTokenLogin from "@/components/direct-token-login"
import Link from "next/link"

export default function TokenLoginPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Developer Login</CardTitle>
          <CardDescription>Sign in using a pre-configured member token</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DirectTokenLogin />
          <div className="text-center mt-4">
            <Link href="/login" className="text-sm text-blue-600 hover:underline">
              Back to regular login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
