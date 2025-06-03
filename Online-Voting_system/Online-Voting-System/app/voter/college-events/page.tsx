"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { School, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for college events
const activeCollegeElections = [
  {
    id: "ce1",
    title: "Student Council Election 2025",
    description: "Vote for your student council representatives for the academic year 2025-26",
    startDate: "2025-04-10T09:00:00",
    endDate: "2025-04-12T18:00:00",
    positions: [
      {
        id: "p1",
        title: "President",
        candidates: [
          {
            id: "c1",
            name: "Rahul Sharma",
            party: "Progressive Students",
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "c2",
            name: "Priya Patel",
            party: "United Students Front",
            image: "/placeholder.svg?height=80&width=80",
          },
          { id: "c3", name: "Amit Kumar", party: "Independent", image: "/placeholder.svg?height=80&width=80" },
        ],
      },
      {
        id: "p2",
        title: "Vice President",
        candidates: [
          { id: "c4", name: "Neha Singh", party: "Progressive Students", image: "/placeholder.svg?height=80&width=80" },
          {
            id: "c5",
            name: "Vikram Reddy",
            party: "United Students Front",
            image: "/placeholder.svg?height=80&width=80",
          },
        ],
      },
    ],
  },
  {
    id: "ce2",
    title: "Department Representative Election",
    description: "Select your department representatives for the academic year",
    startDate: "2025-04-15T10:00:00",
    endDate: "2025-04-16T17:00:00",
    positions: [
      {
        id: "p3",
        title: "Computer Science Rep",
        candidates: [
          { id: "c6", name: "Ananya Desai", party: "Tech Innovators", image: "/placeholder.svg?height=80&width=80" },
          { id: "c7", name: "Rohan Joshi", party: "CS United", image: "/placeholder.svg?height=80&width=80" },
        ],
      },
    ],
  },
]

const pastCollegeElections = [
  {
    id: "pce1",
    title: "Student Council Election 2024",
    description: "Previous year's student council election",
    startDate: "2024-04-10T09:00:00",
    endDate: "2024-04-12T18:00:00",
    results: [
      {
        position: "President",
        winner: "Arjun Mehta",
        party: "Progressive Students",
        votes: 1245,
        totalVotes: 2100,
        percentage: 59.3,
      },
      {
        position: "Vice President",
        winner: "Meera Kapoor",
        party: "United Students Front",
        votes: 1050,
        totalVotes: 2050,
        percentage: 51.2,
      },
    ],
  },
]

const upcomingEvents = [
  {
    id: "ue1",
    title: "Annual Cultural Festival",
    date: "May 15-17, 2025",
    description: "Three-day cultural extravaganza with performances, competitions, and celebrity appearances",
  },
  {
    id: "ue2",
    title: "Technical Symposium",
    date: "June 5-6, 2025",
    description: "Technical workshops, hackathons, and guest lectures from industry experts",
  },
]

// Mock user data
const userInfo = {
  name: "Aditya Sharma",
  aadhaar: "XXXX-XXXX-1234",
  college: "Delhi Technical University",
  department: "Computer Science & Engineering",
  year: "3rd Year",
  studentId: "DTU2022CS045",
  votingStatus: {
    ce1: {
      p1: false,
      p2: false,
    },
    ce2: {
      p3: false,
    },
  },
}

export default function CollegeEventsPage() {
  const [votingStatus, setVotingStatus] = useState(userInfo.votingStatus)
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleVote = (electionId: string, positionId: string, candidateId: string) => {
    // In a real app, this would make an API call to record the vote
    setVotingStatus((prev) => ({
      ...prev,
      [electionId]: {
        ...prev[electionId],
        [positionId]: true,
      },
    }))

    toast({
      title: "Vote Recorded",
      description: "Your vote has been successfully recorded.",
      variant: "success",
      duration: 3000,
    })
  }

  const getRemainingTime = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${hours} hour${hours > 1 ? "s" : ""}`
    }
    return `${hours} hour${hours > 1 ? "s" : ""} remaining`
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader userInfo={userInfo} userRole="voter" />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <School className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">College Events</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="active">Active Elections</TabsTrigger>
                <TabsTrigger value="past">Past Results</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6">
                {activeCollegeElections.map((election) => (
                  <Card key={election.id} className="overflow-hidden">
                    <CardHeader className="bg-slate-100 dark:bg-slate-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{election.title}</CardTitle>
                          <CardDescription className="mt-1">{election.description}</CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100"
                        >
                          <Clock className="h-3 w-3" />
                          {getRemainingTime(election.endDate)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(election.startDate)} - {formatDate(election.endDate)}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      {election.positions.map((position) => (
                        <div
                          key={position.id}
                          className="p-6 border-b border-slate-200 dark:border-slate-700 last:border-0"
                        >
                          <h3 className="text-lg font-medium mb-4">{position.title}</h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {position.candidates.map((candidate) => (
                              <Card key={candidate.id} className="overflow-hidden">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                  <Avatar className="h-20 w-20 mb-3">
                                    <AvatarImage src={candidate.image} alt={candidate.name} />
                                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <h4 className="font-medium">{candidate.name}</h4>
                                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{candidate.party}</p>

                                  <Button
                                    onClick={() => handleVote(election.id, position.id, candidate.id)}
                                    disabled={votingStatus[election.id]?.[position.id]}
                                    className="w-full"
                                  >
                                    {votingStatus[election.id]?.[position.id] ? (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Voted
                                      </>
                                    ) : (
                                      "Vote"
                                    )}
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>

                    <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-4 text-sm text-slate-500 dark:text-slate-400">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                      Your vote is confidential and secure. You can only vote once for each position.
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                {pastCollegeElections.map((election) => (
                  <Card key={election.id}>
                    <CardHeader>
                      <CardTitle>{election.title}</CardTitle>
                      <CardDescription>{election.description}</CardDescription>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {formatDate(election.startDate)} - {formatDate(election.endDate)}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-6">
                        {election.results.map((result, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h3 className="font-medium mb-2">{result.position}</h3>
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar>
                                <AvatarFallback>{result.winner.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{result.winner}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{result.party}</p>
                              </div>
                              <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                Winner
                              </Badge>
                            </div>

                            <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-2">
                              <div
                                className="bg-primary h-4 rounded-full"
                                style={{ width: `${result.percentage}%` }}
                              ></div>
                            </div>

                            <div className="flex justify-between text-sm">
                              <span>{result.votes} votes</span>
                              <span>{result.percentage}% of total</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription className="mt-1">{event.description}</CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                        >
                          {event.date}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline">More Info</Button>
                      <Button>Register Interest</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  College Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userInfo.name} />
                    <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-lg">{userInfo.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{userInfo.studentId}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">College:</span>
                    <span className="font-medium">{userInfo.college}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Department:</span>
                    <span className="font-medium">{userInfo.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Year:</span>
                    <span className="font-medium">{userInfo.year}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-medium mb-2">Upcoming Events</h4>
                  <div className="space-y-2">
                    {upcomingEvents.slice(0, 2).map((event) => (
                      <div key={event.id} className="flex gap-2 items-start">
                        <Calendar className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full College Profile
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Voting Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Student Council Election</span>
                      <span className="font-medium">
                        {Object.values(votingStatus.ce1).filter(Boolean).length} /{" "}
                        {Object.keys(votingStatus.ce1).length}
                      </span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(Object.values(votingStatus.ce1).filter(Boolean).length / Object.keys(votingStatus.ce1).length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Department Election</span>
                      <span className="font-medium">
                        {Object.values(votingStatus.ce2).filter(Boolean).length} /{" "}
                        {Object.keys(votingStatus.ce2).length}
                      </span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(Object.values(votingStatus.ce2).filter(Boolean).length / Object.keys(votingStatus.ce2).length) * 100}%`,
                        }}
                      ></div>
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

