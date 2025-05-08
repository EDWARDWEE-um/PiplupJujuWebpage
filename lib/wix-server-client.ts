import { createClient } from "@wix/sdk"
import { members } from "@wix/members"

export const getWixClient = () => {
  const clientId = process.env.WIX_CLIENT_ID

  if (!clientId) {
    console.error("Missing Wix client ID. Please check your environment variables.")
    throw new Error("Missing Wix client ID")
  }

  return createClient({
    modules: { members },
    auth: {
      clientId,
    },
  })
}
