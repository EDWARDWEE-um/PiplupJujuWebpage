// This is a minimal authentication client that uses the absolute minimum code needed
// to authenticate with Wix. No fancy features, just the basics.

// Hardcoded client ID - no environment variables needed
const CLIENT_ID = "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3"

// Generate a random string for state parameter
function generateRandomString(length = 32): string {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let text = ""
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// Generate a code challenge for PKCE
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await crypto.subtle.digest("SHA-256", data)

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

// Get the login URL
export async function getLoginUrl(): Promise<string> {
  try {
    // Generate code verifier and challenge
    const codeVerifier = generateRandomString(64)
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const state = generateRandomString(32)

    // Store in localStorage for later use
    localStorage.setItem("wixCodeVerifier", codeVerifier)
    localStorage.setItem("wixState", state)

    // Construct the redirect URI - use the current origin
    const redirectUri = `${window.location.origin}/minimal-callback`
    localStorage.setItem("wixRedirectUri", redirectUri)

    // Construct the authorization URL
    const authUrl = new URL("https://www.wix.com/oauth/authorize")
    authUrl.searchParams.append("client_id", CLIENT_ID)
    authUrl.searchParams.append("response_type", "code")
    authUrl.searchParams.append("redirect_uri", redirectUri)
    authUrl.searchParams.append("scope", "offline_access")
    authUrl.searchParams.append("state", state)
    authUrl.searchParams.append("code_challenge", codeChallenge)
    authUrl.searchParams.append("code_challenge_method", "S256")

    return authUrl.toString()
  } catch (error) {
    console.error("Error generating login URL:", error)
    throw error
  }
}

// Exchange code for tokens
export async function exchangeCodeForTokens(code: string): Promise<any> {
  try {
    // Get stored values
    const codeVerifier = localStorage.getItem("wixCodeVerifier")
    const state = localStorage.getItem("wixState")
    const redirectUri = localStorage.getItem("wixRedirectUri")

    if (!codeVerifier || !redirectUri) {
      throw new Error("Missing authentication data. Please try logging in again.")
    }

    // Construct the token request
    const tokenUrl = "https://www.wix.com/oauth/access"
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Token exchange failed: ${response.status} ${errorText}`)
    }

    const tokens = await response.json()

    // Store tokens
    localStorage.setItem("wixTokens", JSON.stringify(tokens))

    return tokens
  } catch (error) {
    console.error("Error exchanging code for tokens:", error)
    throw error
  }
}

// Get current user
export async function getCurrentUser(): Promise<any> {
  try {
    const tokensStr = localStorage.getItem("wixTokens")
    if (!tokensStr) {
      return null
    }

    const tokens = JSON.parse(tokensStr)
    const accessToken = tokens.access_token

    const response = await fetch("https://www.wixapis.com/members/v1/members/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired
        localStorage.removeItem("wixTokens")
        return null
      }
      throw new Error(`Failed to get user: ${response.status}`)
    }

    const userData = await response.json()
    return userData.member
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Logout
export function logout(): void {
  localStorage.removeItem("wixCodeVerifier")
  localStorage.removeItem("wixState")
  localStorage.removeItem("wixRedirectUri")
  localStorage.removeItem("wixTokens")

  // Redirect to home page
  window.location.href = "/"
}
