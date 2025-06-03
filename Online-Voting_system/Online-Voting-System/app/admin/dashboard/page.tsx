"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Vote, Calendar, AlertTriangle, Plus, Download } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ElectionManagement } from "@/components/election-management"
import { CandidateManagement } from "@/components/candidate-management"
import { AdminChart } from "@/components/admin-chart"

// Mock data
const electionStats = {
  totalElections: 5,
  activeElections: 2,
  completedElections: 3,
  totalVoters: 2500,
  registeredVoters: 1875,
  verifiedVoters: 1650,
  totalVotes: 1245,
  participationRate: 75.45,
}

const recentActivities = [
  { id: 1, action: "New voter registered", timestamp: "2025-03-28T10:15:00", user: "john.doe@example.com" },
  { id: 2, action: "Election started", timestamp: "2025-03-28T09:00:00", user: "admin" },
  { id: 3, action: "Candidate added", timestamp: "2025-03-27T16:30:00", user: "admin" },
  { id: 4, action: "Voter verified", timestamp: "2025-03-27T14:45:00", user: "admin" },
  { id: 5, action: "Election ended", timestamp: "2025-03-26T23:59:59", user: "system" },
]

export default function AdminDashboard() {
  const [userInfo, setUserInfo] = useState({
    name: "Admin User",
    email: "admin@securevote.com",
    role: "Election Administrator",
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader userInfo={userInfo} userRole="admin" />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Elections</p>
                  <p className="text-3xl font-bold">{electionStats.totalElections}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Vote className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 mr-2"
                >
                  {electionStats.activeElections} Active
                </Badge>
                <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {electionStats.completedElections} Completed
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Registered Voters</p>
                  <p className="text-3xl font-bold">{electionStats.registeredVoters}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">Verification Rate</span>
                  <span className="text-xs font-medium">
                    {Math.round((electionStats.verifiedVoters / electionStats.registeredVoters) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${(electionStats.verifiedVoters / electionStats.registeredVoters) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Votes Cast</p>
                  <p className="text-3xl font-bold">{electionStats.totalVotes}</p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <BarChart3 className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">Participation Rate</span>
                  <span className="text-xs font-medium">{electionStats.participationRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${electionStats.participationRate}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Security Alerts</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Voting Activity</CardTitle>
              <CardDescription>Vote distribution over time</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">{activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Activities
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="elections" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="elections">Manage Elections</TabsTrigger>
            <TabsTrigger value="candidates">Manage Candidates</TabsTrigger>
            <TabsTrigger value="reports">Generate Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="elections">
            <ElectionManagement />
          </TabsContent>

          <TabsContent value="candidates">
            <CandidateManagement />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Election Reports</CardTitle>
                <CardDescription>Generate and download reports for elections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Voter Participation</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Detailed report on voter turnout and participation rates.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Election Results</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Complete results with vote counts and percentages.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Audit Log</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          System activity log for security and compliance.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

