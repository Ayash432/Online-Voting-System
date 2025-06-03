"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Play, Pause, Clock, CheckCircle2 } from "lucide-react"

// Mock data for elections
const mockElections = [
  {
    id: 1,
    title: "Student Council President Election",
    description: "Vote for the next student council president for the 2025-2026 academic year.",
    startDate: "2025-03-25T09:00:00",
    endDate: "2025-04-15T23:59:59",
    status: "active",
    candidateCount: 3,
    voterCount: 450,
    votesCount: 145,
  },
  {
    id: 2,
    title: "Community Park Renovation Proposal",
    description: "Vote on the proposed renovation plans for Central Community Park.",
    startDate: "2025-03-26T09:00:00",
    endDate: "2025-04-20T23:59:59",
    status: "active",
    candidateCount: 3,
    voterCount: 1200,
    votesCount: 235,
  },
  {
    id: 3,
    title: "City Council Representative",
    description: "Election for the city council representative for District 5.",
    startDate: "2025-02-15T09:00:00",
    endDate: "2025-03-10T23:59:59",
    status: "completed",
    candidateCount: 3,
    voterCount: 3500,
    votesCount: 3794,
  },
  {
    id: 4,
    title: "School Budget Allocation",
    description: "Vote on the proposed budget allocation for the next academic year.",
    startDate: "2025-04-01T09:00:00",
    endDate: "2025-05-01T23:59:59",
    status: "scheduled",
    candidateCount: 2,
    voterCount: 500,
    votesCount: 0,
  },
]

export function ElectionManagement() {
  const [elections, setElections] = useState(mockElections)
  const [showNewElectionDialog, setShowNewElectionDialog] = useState(false)
  const [newElection, setNewElection] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isPublic: true,
  })

  const handleCreateElection = () => {
    const election = {
      id: elections.length + 1,
      ...newElection,
      status: "scheduled",
      candidateCount: 0,
      voterCount: 0,
      votesCount: 0,
    }

    setElections([...elections, election])
    setShowNewElectionDialog(false)
    setNewElection({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      isPublic: true,
    })
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setElections(elections.map((election) => (election.id === id ? { ...election, status: newStatus } : election)))
  }

  const handleDeleteElection = (id: number) => {
    setElections(elections.filter((election) => election.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <Play className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "paused":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
            <Pause className="h-3 w-3 mr-1" />
            Paused
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Election Management</h2>
        <Dialog open={showNewElectionDialog} onOpenChange={setShowNewElectionDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Election
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Election</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new election. You can add candidates after creation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Election Title</Label>
                <Input
                  id="title"
                  value={newElection.title}
                  onChange={(e) => setNewElection({ ...newElection, title: e.target.value })}
                  placeholder="e.g., Student Council Election 2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newElection.description}
                  onChange={(e) => setNewElection({ ...newElection, description: e.target.value })}
                  placeholder="Provide details about this election"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={newElection.startDate}
                    onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={newElection.endDate}
                    onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublic"
                  checked={newElection.isPublic}
                  onCheckedChange={(checked) => setNewElection({ ...newElection, isPublic: checked })}
                />
                <Label htmlFor="isPublic">Make this election public</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewElectionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateElection}>Create Election</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {elections.map((election) => (
          <Card key={election.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{election.title}</CardTitle>
                  <CardDescription>{election.description}</CardDescription>
                </div>
                {getStatusBadge(election.status)}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Timeline</p>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <div>Start: {new Date(election.startDate).toLocaleString()}</div>
                    <div>End: {new Date(election.endDate).toLocaleString()}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Participation</p>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <div>Candidates: {election.candidateCount}</div>
                    <div>Eligible Voters: {election.voterCount}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Results</p>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <div>Votes Cast: {election.votesCount}</div>
                    <div>
                      Turnout:{" "}
                      {election.voterCount > 0 ? ((election.votesCount / election.voterCount) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {election.status === "active" && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(election.id, "paused")}>
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                )}
                {election.status === "paused" && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(election.id, "active")}>
                    <Play className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
                )}
                {election.status === "scheduled" && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(election.id, "active")}>
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                )}
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteElection(election.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

