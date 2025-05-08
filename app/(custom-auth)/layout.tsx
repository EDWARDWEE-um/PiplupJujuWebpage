import type React from "react"
import CustomAuthLayout from "@/app/custom-auth-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CustomAuthLayout>{children}</CustomAuthLayout>
}
