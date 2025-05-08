import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthNav() {
  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-center space-x-4">
        <Button variant="outline" asChild>
          <Link href="/login">Wix-Managed Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/custom-login">Custom Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/custom-auth-test">Auth Test</Link>
        </Button>
      </div>
    </div>
  )
}
