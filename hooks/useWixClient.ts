"use client"

import { OAuthStrategy, createClient } from "@wix/sdk"
import { collections, products } from "@wix/stores"
import { orders } from "@wix/ecom"
import { members } from "@wix/members"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

let wixClientSingleton: ReturnType<typeof createWixClient> | null = null

function createWixClient() {
  let refreshToken

  try {
    refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}")
  } catch (e) {}

  return createClient({
    modules: {
      products,
      collections,
      orders,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  })
}

export function useWixClient() {
  const [wixClient, setWixClient] = useState<ReturnType<typeof createWixClient> | null>(null)

  useEffect(() => {
    if (!wixClientSingleton) {
      wixClientSingleton = createWixClient()
    }
    setWixClient(wixClientSingleton)
  }, [])

  return wixClient || createWixClient()
}
