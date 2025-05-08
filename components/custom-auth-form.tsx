"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import WixAuthService from "@/lib/wix-auth-service"
import Link from "next/link"

export default function CustomAuthForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerificationRequired, setIsVerificationRequired] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "error" | "success" | "info"; text: string } | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      const result = await WixAuthService.login(email, password)

      if (result.success) {
        setMessage({ type: "success", text: "Login successful! Redirecting..." })
        setTimeout(() => router.push("/account"), 1000)
      } else if (result.loginState === "EMAIL_VERIFICATION_REQUIRED") {
        setIsVerificationRequired(true)
        setMessage({ type: "info", text: result.message })
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Login failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    if (!name || !email || !password) {
      setMessage({ type: "error", text: "All fields are required" })
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await WixAuthService.register(email, password, {
        nickname: name,
        customFields: {
          points: 100, // New users get 100 points
        },
      })

      if (result.success) {
        setMessage({ type: "success", text: "Registration successful! Redirecting..." })
        setTimeout(() => router.push("/account"), 1000)
      } else if (result.loginState === "EMAIL_VERIFICATION_REQUIRED") {
        setIsVerificationRequired(true)
        setMessage({ type: "info", text: result.message })
      } else if (result.loginState === "OWNER_APPROVAL_REQUIRED") {
        setMessage({ type: "info", text: result.message })
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Registration failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      const result = await WixAuthService.processVerification(verificationCode)

      if (result.success) {
        setMessage({ type: "success", text: "Verification successful! Redirecting..." })
        setTimeout(() => router.push("/account"), 1000)
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Verification failed. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      await WixAuthService.sendPasswordResetEmail(email)
      setMessage({
        type: "success",
        text: "Password reset email sent. Please check your inbox.",
      })
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to send password reset email. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isVerificationRequired) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            Please enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-4">
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to PokéCollect</CardTitle>
        <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : message.type === "success" ? "default" : "default"}
              className="mt-4"
            >
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("reset-password")}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="reset-password">
            <form onSubmit={handlePasswordReset} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => setActiveTab("login")}>
                Back to Login
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
