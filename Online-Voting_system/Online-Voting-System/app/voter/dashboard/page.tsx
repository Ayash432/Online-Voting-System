"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Vote, User, BarChart3, CheckCircle2, FileText, Clock } from "lucide-react"
import { VotingCard } from "@/components/voting-card"
import { ElectionResults } from "@/components/election-results"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock data for elections
const activeElections = [
  {
    id: 1,
    title: "Lok Sabha Elections 2025",
    description: "Vote for your constituency representative in the general elections.",
    endDate: "2025-04-15T23:59:59",
    candidates: [
      {
        id: 1,
        name: "Ayash Meshram",
        position: "BJP",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 145,
      },
      {
        id: 2,
        name: "Nikita Borse ",
        position: "Congress",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 120,
      },
      {
        id: 3,
        name: "Yash Sonkawade",
        position: "AAP",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 98,
      },
    ],
    hasVoted: false,
  },
  {
    id: 2,
    title: "Municipal Corporation Elections",
    description: "Vote for your ward representative in the municipal elections.",
    endDate: "2025-04-20T23:59:59",
    candidates: [
      {
        id: 4,
        name: "Sunita Verma",
        position: "Independent",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 78,
      },
      {
        id: 5,
        name: "Rahul Singh",
        position: "BJP",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 92,
      },
      {
        id: 6,
        name: "Meera Desai",
        position: "Congress",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 65,
      },
    ],
    hasVoted: true,
  },
]

const pastElections = [
  {
    id: 3,
    title: "State Assembly Elections",
    description: "Vote for your constituency representative in the state assembly.",
    endDate: "2025-03-10T23:59:59",
    candidates: [
      {
        id: 7,
        name: "Vikram Reddy",
        position: "TDP",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 1245,
      },
      {
        id: 8,
        name: "Lakshmi Narayanan",
        position: "YSRCP",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 1567,
      },
      {
        id: 9,
        name: "Sanjay Rao",
        position: "Congress",
        photo: "/placeholder.svg?height=100&width=100",
        votes: 982,
      },
    ],
    hasVoted: true,
    winner: {
      id: 8,
      name: "Lakshmi Narayanan",
      position: "YSRCP",
      photo: "/placeholder.svg?height=100&width=100",
      votes: 1567,
    },
  },
]

export default function VoterDashboard() {
  const [userInfo, setUserInfo] = useState({
    name: "Ayash Meshram",
    aadhaar: "XXXX-XXXX-1234",
    voterId: "ABC1234567",
    isVerified: true,
  })

  const [elections, setElections] = useState({
    active: activeElections,
    past: pastElections,
  })

  const handleVote = (electionId: number, candidateId: number) => {
    // Update the local state to reflect the vote
    setElections((prev) => ({
      ...prev,
      active: prev.active.map((election) =>
        election.id === electionId
          ? {
              ...election,
              hasVoted: true,
              candidates: election.candidates.map((candidate) =>
                candidate.id === candidateId ? { ...candidate, votes: candidate.votes + 1 } : candidate,
              ),
            }
          : election,
      ),
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader userInfo={userInfo} userRole="voter" />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Vote className="h-4 w-4" />
                  <span>Active Elections</span>
                </TabsTrigger>
                <TabsTrigger value="past" className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Past Elections</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6">
                {elections.active.length > 0 ? (
                  elections.active.map((election) => (
                    <VotingCard key={election.id} election={election} onVote={handleVote} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-slate-600 dark:text-slate-400">There are no active elections at the moment.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                {elections.past.length > 0 ? (
                  elections.past.map((election) => (
                    <Card key={election.id} className="overflow-hidden">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{election.title}</CardTitle>
                            <CardDescription>{election.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ElectionResults election={election} />
                      </CardContent>
                      <CardFooter className="bg-slate-100 dark:bg-slate-800 flex justify-between">
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Ended on: {new Date(election.endDate).toLocaleDateString()}
                        </div>
                        {election.hasVoted && <Badge variant="secondary">You voted in this election</Badge>}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-slate-600 dark:text-slate-400">
                        You haven't participated in any past elections.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Voter Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt={userInfo.name} />
                    <AvatarFallback>
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-medium">{userInfo.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Aadhaar: {userInfo.aadhaar}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Voter ID</span>
                    <span className="text-sm font-medium">{userInfo.voterId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Verification Status</span>
                    <span className="text-sm font-medium flex items-center">
                      {userInfo.isVerified ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                          Verified
                        </>
                      ) : (
                        <span className="text-amber-500">Pending</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Elections Participated</span>
                    <span className="text-sm font-medium">{elections.past.filter((e) => e.hasVoted).length}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Profile
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Upcoming Elections</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Panchayat Elections</p>
                      <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        Starts on: May 15, 2025
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">School Board Elections</p>
                      <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        Starts on: June 10, 2025
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Voting Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Active Elections</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">2 Available</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">1 Voted</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Participation Rate</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">0%</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">75%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

