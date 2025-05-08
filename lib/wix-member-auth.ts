// This file implements Wix member authentication using server-side proxies

// Login with email and password
export async function loginWithEmailPassword(email: string, password: string) {
  try {
    const response = await fetch("/api/member-auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      // Try to parse error as JSON
      try {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      } catch (e) {
        // If parsing fails, use status text
        throw new Error(`Login failed: ${response.statusText}`)
      }
    }

    const data = await response.json()

    // Store tokens
    if (data.tokens) {
      localStorage.setItem("wixMemberTokens", JSON.stringify(data.tokens))
    }

    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

// Register a new member
export async function registerMember(email: string, password: string) {
  try {
    const response = await fetch("/api/member-auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      // Try to parse error as JSON
      try {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      } catch (e) {
        // If parsing fails, use status text
        throw new Error(`Registration failed: ${response.statusText}`)
      }
    }

    const data = await response.json()

    // Store tokens
    if (data.tokens) {
      localStorage.setItem("wixMemberTokens", JSON.stringify(data.tokens))
    }

    return data
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

// Get current member
export async function getCurrentMember() {
  try {
    const tokensStr = localStorage.getItem("wixMemberTokens")
    if (!tokensStr) {
      return null
    }

    const tokens = JSON.parse(tokensStr)

    const response = await fetch("/api/member-auth/me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired
        localStorage.removeItem("wixMemberTokens")
        return null
      }
      throw new Error(`Failed to get member: ${response.status}`)
    }

    const userData = await response.json()
    return userData.member
  } catch (error) {
    console.error("Error getting current member:", error)
    return null
  }
}

// Logout
export function logout() {
  localStorage.removeItem("wixMemberTokens")
  window.location.href = "/"
}

// Check if user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem("wixMemberTokens")
}

// Send password reset email
export async function sendPasswordResetEmail(email: string) {
  try {
    const response = await fetch("/api/member-auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })

    if (!response.ok) {
      // Try to parse error as JSON
      try {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send password reset email")
      } catch (e) {
        // If parsing fails, use status text
        throw new Error(`Failed to send password reset email: ${response.statusText}`)
      }
    }

    return true
  } catch (error) {
    console.error("Password reset error:", error)
    throw error
  }
}
