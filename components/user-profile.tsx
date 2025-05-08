"use client"

import { useWixClient } from "@/hooks/use-wix-client"
import { useUserStore } from "@/stores/use-user-store"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function UserProfile() {
  const wixClient = useWixClient()
  const { user, isLoggedIn, isLoading, getUser, logout } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    getUser(wixClient)
  }, [wixClient, getUser])

  const handleLogout = async () => {
    await logout(wixClient)
    Cookies.remove("refreshToken")
    router.push("/login")
  }

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center p-8">
        <p>You are not logged in.</p>
        <button onClick={() => router.push("/login")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Username</p>
          <p className="font-medium">{user.profile?.nickname || "Not set"}</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-medium">{user.loginEmail}</p>
        </div>
        {user.contact?.firstName && (
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">
              {user.contact.firstName} {user.contact.lastName}
            </p>
          </div>
        )}
        {user.contact?.phones && user.contact.phones.length > 0 && (
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium">{user.contact.phones[0]}</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.push("/account/edit")}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Edit Profile
        </button>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  )
}
