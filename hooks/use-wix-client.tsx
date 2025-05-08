"use client"

import { WixClientContext } from "@/context/wix-context"
import { useContext } from "react"

export const useWixClient = () => {
  return useContext(WixClientContext)
}
