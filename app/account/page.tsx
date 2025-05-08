import UserProfile from "@/components/user-profile"

export default function AccountPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">My Account</h1>
      <UserProfile />
    </div>
  )
}
