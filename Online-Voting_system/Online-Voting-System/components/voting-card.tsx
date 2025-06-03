"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Candidate {
  id: number
  name: string
  position: string
  photo: string
  votes: number
}

interface Election {
  id: number
  title: string
  description: string
  endDate: string
  candidates: Candidate[]
  hasVoted: boolean
}

interface VotingCardProps {
  election: Election
  onVote: (electionId: number, candidateId: number) => void
}

export function VotingCard({ election, onVote }: VotingCardProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const { toast } = useToast()

  const timeRemaining = () => {
    const now = new Date()
    const end = new Date(election.endDate)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  const handleVoteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setShowConfirmDialog(true)
  }

  const handleConfirmVote = () => {
    if (selectedCandidate) {
      onVote(election.id, selectedCandidate.id)
      setShowConfirmDialog(false)

      // Show toast instead of modal for better UX
      toast({
        title: "Vote Successful",
        description: "Your vote has been successfully recorded. Thank you for participating in this election.",
        variant: "success",
        duration: 5000,
      })
    }
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{election.title}</CardTitle>
              <CardDescription>{election.description}</CardDescription>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            >
              <Clock className="h-3 w-3" />
              <span>{timeRemaining()}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {election.candidates.map((candidate) => (
              <Card
                key={candidate.id}
                className={`overflow-hidden transition-all ${election.hasVoted ? "opacity-80" : "hover:shadow-md"}`}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.photo} alt={candidate.name} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{candidate.name}</CardTitle>
                      <CardDescription>{candidate.position}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-2">
                  <Button
                    onClick={() => handleVoteClick(candidate)}
                    disabled={election.hasVoted}
                    variant={election.hasVoted ? "outline" : "default"}
                    className="w-full"
                  >
                    {election.hasVoted ? "Already Voted" : "Vote"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-800 flex justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Ends on: {new Date(election.endDate).toLocaleDateString()}
          </div>
          {election.hasVoted && <Badge variant="secondary">You have already voted in this election</Badge>}
        </CardFooter>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              You are about to cast your vote for this election. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedCandidate && (
            <div className="flex items-center space-x-4 py-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedCandidate.photo} alt={selectedCandidate.name} />
                <AvatarFallback>
                  {selectedCandidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-medium">{selectedCandidate.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{selectedCandidate.position}</p>
              </div>
            </div>
          )}

          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              Please verify your selection carefully. Your vote is final and cannot be changed once submitted.
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmVote}>Confirm Vote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* This dialog is now replaced with a toast notification for better UX */}
      <AlertDialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Vote Successful
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your vote has been successfully recorded. Thank you for participating in this election.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCloseSuccessDialog}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

