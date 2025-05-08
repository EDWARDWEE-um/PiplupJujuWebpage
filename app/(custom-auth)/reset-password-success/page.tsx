import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Password Reset Success - PokéCollect",
  description: "Your password has been successfully reset",
}

export default function ResetPasswordSuccessPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Password Reset Successful</CardTitle>
            <CardDescription className="text-center">Your password has been successfully reset</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-6 text-center">You can now log in to your account using your new password.</p>
            <Button asChild>
              <Link href="/custom-login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
