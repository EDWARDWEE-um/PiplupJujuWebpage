import CustomAuthForm from "@/components/custom-auth-form"

export const metadata = {
  title: "Custom Login - PokéCollect",
  description: "Sign in to your PokéCollect account or create a new one",
}

export default function CustomLoginPage() {
  return (
    <div className="container mx-auto py-10">
      <CustomAuthForm />
    </div>
  )
}
