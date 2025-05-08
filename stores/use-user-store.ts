import { create } from "zustand"
import type { WixClient } from "@/context/wix-context"
import type { members } from "@wix/members"

type UserState = {
  user: members.Member | null
  isLoading: boolean
  isLoggedIn: boolean
  getUser: (wixClient: WixClient) => Promise<void>
  login: (wixClient: WixClient, email: string, password: string) => Promise<any>
  register: (wixClient: WixClient, email: string, password: string, username: string) => Promise<any>
  logout: (wixClient: WixClient) => Promise<void>
  resetPassword: (wixClient: WixClient, email: string) => Promise<any>
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  getUser: async (wixClient) => {
    try {
      set({ isLoading: true })
      const isLoggedIn = wixClient.auth.loggedIn()

      if (isLoggedIn) {
        const currentMember = await wixClient.members.getCurrentMember()
        set({
          user: currentMember,
          isLoggedIn: true,
          isLoading: false,
        })
      } else {
        set({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        })
      }
    } catch (err) {
      console.error("Error getting user:", err)
      set({
        user: null,
        isLoggedIn: false,
        isLoading: false,
      })
    }
  },
  login: async (wixClient, email, password) => {
    try {
      set({ isLoading: true })
      const response = await wixClient.auth.login({
        email,
        password,
      })

      if (response.loginState === "SUCCESS") {
        const currentMember = await wixClient.members.getCurrentMember()
        set({
          user: currentMember,
          isLoggedIn: true,
          isLoading: false,
        })
      }

      return response
    } catch (err) {
      console.error("Login error:", err)
      set({ isLoading: false })
      throw err
    }
  },
  register: async (wixClient, email, password, username) => {
    try {
      set({ isLoading: true })
      const response = await wixClient.auth.register({
        email,
        password,
        profile: { nickname: username },
      })

      if (response.loginState === "SUCCESS") {
        const currentMember = await wixClient.members.getCurrentMember()
        set({
          user: currentMember,
          isLoggedIn: true,
          isLoading: false,
        })
      }

      return response
    } catch (err) {
      console.error("Registration error:", err)
      set({ isLoading: false })
      throw err
    }
  },
  logout: async (wixClient) => {
    try {
      set({ isLoading: true })
      await wixClient.auth.logout()
      set({
        user: null,
        isLoggedIn: false,
        isLoading: false,
      })
    } catch (err) {
      console.error("Logout error:", err)
      set({ isLoading: false })
    }
  },
  resetPassword: async (wixClient, email) => {
    try {
      set({ isLoading: true })
      const response = await wixClient.auth.sendPasswordResetEmail(email, window.location.href)
      set({ isLoading: false })
      return response
    } catch (err) {
      console.error("Reset password error:", err)
      set({ isLoading: false })
      throw err
    }
  },
}))
