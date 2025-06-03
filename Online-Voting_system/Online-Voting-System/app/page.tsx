import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Vote, BarChart3, Users, Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-900 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">VoteIndia</h1>
            </div>
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
            Secure Online Voting System
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A secure and transparent platform for conducting elections with Aadhaar verification and mobile
            authentication.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Aadhaar Verification"
              description="Secure voter identification using Aadhaar card to prevent duplicate registrations and ensure legitimate voters."
            />
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-primary" />}
              title="Mobile Authentication"
              description="Two-factor authentication via mobile verification to enhance security and prevent unauthorized access."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Real-Time Results"
              description="Live vote counts and graphical results with automatic updates as votes are cast."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="One-Time Voting"
              description="Prevents double voting through secure verification and tracking mechanisms."
            />
            <FeatureCard
              icon={<Vote className="h-10 w-10 text-primary" />}
              title="Admin Controls"
              description="Start and end elections, add candidates, and manage the entire election process."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Audit Logs"
              description="Track all voting activities for transparency and security audits."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                </div>
                <CardTitle className="text-center">Register</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Register with your Aadhaar card, PAN card, and mobile number. Upload required documents for
                  verification.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                </div>
                <CardTitle className="text-center">Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Complete mobile verification and wait for admin approval of your documents and voter eligibility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                </div>
                <CardTitle className="text-center">Vote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Login with your Aadhaar number and password, participate in active elections, and view real-time
                  results.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Vote className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VoteIndia</span>
            </div>
            <div className="text-slate-400 text-sm">© {new Date().getFullYear()} VoteIndia. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

