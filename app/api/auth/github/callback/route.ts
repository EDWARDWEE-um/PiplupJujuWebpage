import { getServerWixClient } from "@/lib/server-wix-client"
import { createAppAuth, createOAuthUserAuth } from "@octokit/auth-app"
import { members } from "@wix/members"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get GitHub access token
    const githubAccessToken = await getGithubAuth(request)

    // Get user email from GitHub
    const userEmail = await getGithubUserEmail(githubAccessToken)

    if (!userEmail) {
      throw new Error("Could not retrieve email from GitHub")
    }

    // Get or create Wix member
    const member = await getOrCreateWixMember(userEmail)

    // Get member tokens for external login
    const memberTokens = await getServerWixClient().auth.getMemberTokensForExternalLogin(
      member._id!,
      process.env.WIX_API_KEY!,
    )

    // Create response with redirect and set cookie
    const response = new NextResponse(undefined, {
      status: 302,
      headers: {
        Location: "/account",
      },
    })

    // Set session cookie
    response.cookies.set("session", JSON.stringify(memberTokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return response
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.redirect(new URL("/login?error=github-auth-failed", request.url))
  }
}

async function getGithubAuth(request: NextRequest) {
  if (
    !process.env.GITHUB_APP_ID ||
    !process.env.GITHUB_PRIVATE_KEY ||
    !process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ||
    !process.env.GITHUB_CLIENT_SECRET
  ) {
    throw new Error("Missing GitHub OAuth environment variables")
  }

  const appAuth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY,
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  })

  const code = request.nextUrl.searchParams.get("code")
  if (!code) {
    throw new Error("No OAuth code provided")
  }

  const userAuth = await appAuth({
    type: "oauth-user",
    code,
    factory: createOAuthUserAuth,
  })

  const authentication = await userAuth()
  return authentication.token
}

async function getGithubUserEmail(token: string) {
  try {
    // First try to get user info
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (!userRes.ok) {
      throw new Error(`GitHub API error: ${userRes.statusText}`)
    }

    const userInfo = await userRes.json()

    // If email is not public, fetch emails endpoint
    if (!userInfo.email) {
      const emailsRes = await fetch("https://api.github.com/user/emails", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      if (!emailsRes.ok) {
        throw new Error(`GitHub API error: ${emailsRes.statusText}`)
      }

      const emails = await emailsRes.json()

      // Find primary email
      const primaryEmail = emails.find((email: any) => email.primary)
      return primaryEmail?.email
    }

    return userInfo.email
  } catch (error) {
    console.error("Error fetching GitHub user email:", error)
    throw error
  }
}

async function getOrCreateWixMember(email: string) {
  try {
    const wixClient = getServerWixClient()

    // Check if member already exists
    const { items } = await wixClient.members.queryMembers().eq("loginEmail", email).find()

    let member
    if (items.length === 0) {
      // Create new member
      member = await wixClient.members.createMember({
        member: {
          loginEmail: email,
          status: members.Status.APPROVED,
          privacyStatus: members.PrivacyStatusStatus.PRIVATE,
          profile: {
            nickname: email.split("@")[0],
            customFields: {
              points: 100, // Default points for new users
            },
          },
        },
      })
      console.log("Created new Wix member:", member._id)
    } else {
      member = items[0]
      console.log("Found existing Wix member:", member._id)
    }

    return member
  } catch (error) {
    console.error("Error managing Wix member:", error)
    throw error
  }
}
