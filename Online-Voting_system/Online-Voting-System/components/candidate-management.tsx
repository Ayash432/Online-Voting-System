"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Upload } from "lucide-react"

// Mock data for candidates
const mockCandidates = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "President",
    bio: "Third-year Computer Science student with a passion for student advocacy and campus improvement.",
    photo: "/placeholder.svg?height=100&width=100",
    electionId: 1,
    electionTitle: "Student Council President Election",
    votes: 145,
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "President",
    bio: "Business Administration major with experience in leadership roles and community service.",
    photo: "/placeholder.svg?height=100&width=100",
    electionId: 1,
    electionTitle: "Student Council President Election",
    votes: 120,
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "President",
    bio: "Political Science student focused on transparency and inclusive campus policies.",
    photo: "/placeholder.svg?height=100&width=100",
    electionId: 1,
    electionTitle: "Student Council President Election",
    votes: 98,
  },
  {
    id: 4,
    name: "Plan A: Sports Focus",
    position: "Proposal",
    bio: "Renovation plan focusing on sports facilities including basketball courts, soccer fields, and a running track.",
    photo: "/placeholder.svg?height=100&width=100",
    electionId: 2,
    electionTitle: "Community Park Renovation Proposal",
    votes: 78,
  },
  {
    id: 5,
    name: "Plan B: Family Focus",
    position: "Proposal",
    bio: "Renovation plan with emphasis on family-friendly areas including playgrounds, picnic areas, and splash pads.",
    photo: "/placeholder.svg?height=100&width=100",
    electionId: 2,
    electionTitle: "Community Park Renovation Proposal",
    votes: 92,
  },
]

// Mock data for elections (for dropdown)
const mockElectionOptions = [
  { id: 1, title: "Student Council President Election" },
  { id: 2, title: "Community Park Renovation Proposal" },
  { id: 4, title: "School Budget Allocation" },
]

export function CandidateManagement() {
  const [candidates, setCandidates] = useState(mockCandidates)
  const [showNewCandidateDialog, setShowNewCandidateDialog] = useState(false)
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    position: "",
    bio: "",
    photo: "/placeholder.svg?height=100&width=100",
    electionId: "",
  })

  const handleCreateCandidate = () => {
    const selectedElection = mockElectionOptions.find((e) => e.id.toString() === newCandidate.electionId)

    const candidate = {
      id: candidates.length + 1,
      ...newCandidate,
      electionId: Number.parseInt(newCandidate.electionId),
      electionTitle: selectedElection ? selectedElection.title : "",
      votes: 0,
    }

    setCandidates([...candidates, candidate])
    setShowNewCandidateDialog(false)
    setNewCandidate({
      name: "",
      position: "",
      bio: "",
      photo: "/placeholder.svg?height=100&width=100",
      electionId: "",
    })
  }

  const handleDeleteCandidate = (id: number) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Candidate Management</h2>
        <Dialog open={showNewCandidateDialog} onOpenChange={setShowNewCandidateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>Fill in the details to add a new candidate to an election.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="election">Election</Label>
                <Select
                  onValueChange={(value) => setNewCandidate({ ...newCandidate, electionId: value })}
                  value={newCandidate.electionId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an election" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockElectionOptions.map((election) => (
                      <SelectItem key={election.id} value={election.id.toString()}>
                        {election.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Candidate Name</Label>
                <Input
                  id="name"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  placeholder="Full name or proposal title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newCandidate.position}
                  onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })}
                  placeholder="e.g., President, Treasurer, Proposal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography / Description</Label>
                <Textarea
                  id="bio"
                  value={newCandidate.bio}
                  onChange={(e) => setNewCandidate({ ...newCandidate, bio: e.target.value })}
                  placeholder="Brief description of the candidate or proposal"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Photo</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={newCandidate.photo} alt="Preview" />
                    <AvatarFallback>
                      {newCandidate.name
                        ? newCandidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "CN"}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Recommended: Square image, at least 300x300 pixels
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewCandidateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCandidate}>Add Candidate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="mb-2">
                  {candidate.position}
                </Badge>
                <Badge variant="secondary">{candidate.votes} votes</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={candidate.photo} alt={candidate.name} />
                  <AvatarFallback>
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{candidate.name}</CardTitle>
                  <CardDescription className="line-clamp-1">{candidate.electionTitle}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{candidate.bio}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteCandidate(candidate.id)}>
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

