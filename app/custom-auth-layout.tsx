"use client"

import { CustomAuthProvider } from "@/hooks/use-custom-auth"
import type { ReactNode } from "react"

export default function CustomAuthLayout({ children }: { children: ReactNode }) {
  return <CustomAuthProvider>{children}</CustomAuthProvider>
}
