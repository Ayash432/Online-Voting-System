"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Vote, User, ShieldCheck } from "lucide-react"
import { MobileVerification } from "@/components/mobile-verification"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("voter")
  const [loginStep, setLoginStep] = useState<"credentials" | "mobile">("credentials")
  const [credentials, setCredentials] = useState({ aadhaar: "", password: "" })
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVoterLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate Aadhaar format (12 digits)
      if (!/^\d{12}$/.test(credentials.aadhaar)) {
        throw new Error("Invalid Aadhaar number. Please enter a 12-digit number.")
      }

      // Simulate API call for login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Move to mobile verification step
      setLoginStep("mobile")
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call for admin login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to admin dashboard directly
      if (adminCredentials.username.includes("super")) {
        router.push("/super-admin/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    } catch (err) {
      setError("Invalid admin credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleMobileVerified = () => {
    // Redirect to voter dashboard after mobile verification
    router.push("/voter/dashboard")
  }

  const formatAadhaar = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "")

    // Format as XXXX-XXXX-XXXX
    if (digits.length <= 4) return digits
    if (digits.length <= 8) return `${digits.slice(0, 4)}-${digits.slice(4)}`
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}`
  }

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value)
    // Store only digits in state
    setCredentials({ ...credentials, aadhaar: e.target.value.replace(/\D/g, "") })
    // Display formatted value in input
    e.target.value = formatted
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Vote className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">VoteIndia</h1>
          <p className="text-slate-600 dark:text-slate-400">Secure Online Voting System</p>
        </div>

        {loginStep === "credentials" && (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="voter" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Voter</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voter">
              <Card>
                <CardHeader>
                  <CardTitle>Voter Login</CardTitle>
                  <CardDescription>
                    Enter your Aadhaar number and password to access your voting account.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleVoterLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar">Aadhaar Number</Label>
                      <Input
                        id="aadhaar"
                        placeholder="XXXX-XXXX-XXXX"
                        onChange={handleAadhaarChange}
                        maxLength={14} // 12 digits + 2 hyphens
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                      />
                    </div>
                    {error && <p className="text-destructive text-sm">{error}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Authenticating..." : "Login"}
                    </Button>
                    <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                      Don't have an account?{" "}
                      <Link href="/register" className="text-primary hover:underline">
                        Register here
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Login</CardTitle>
                  <CardDescription>Enter your admin credentials to access the control panel.</CardDescription>
                </CardHeader>
                <form onSubmit={handleAdminLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="admin_username"
                        value={adminCredentials.username}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                        required
                      />
                    </div>
                    {error && <p className="text-destructive text-sm">{error}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Authenticating..." : "Login"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {loginStep === "mobile" && (
          <MobileVerification onVerified={handleMobileVerified} onCancel={() => setLoginStep("credentials")} />
        )}
      </div>
    </div>
  )
}

