"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TokenLoginLink() {
  return (
    <div className="text-center mt-4">
      <Link href="/token-login">
        <Button variant="link" className="text-sm">
          Sign in with token (Admin)
        </Button>
      </Link>
    </div>
  )
}
