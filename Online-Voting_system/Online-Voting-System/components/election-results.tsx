"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"
import { Chart } from "@/components/ui/chart"

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
  winner?: Candidate
}

interface ElectionResultsProps {
  election: Election
}

export function ElectionResults({ election }: ElectionResultsProps) {
  const totalVotes = election.candidates.reduce((sum, candidate) => sum + candidate.votes, 0)

  // Sort candidates by votes (descending)
  const sortedCandidates = [...election.candidates].sort((a, b) => b.votes - a.votes)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Results Breakdown</h3>
          <div className="space-y-4">
            {sortedCandidates.map((candidate, index) => {
              const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0

              return (
                <div key={candidate.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={candidate.photo} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{candidate.name}</span>
                          {index === 0 && election.winner && (
                            <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                              <Trophy className="h-3 w-3 mr-1" />
                              Winner
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{candidate.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{percentage.toFixed(1)}%</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{candidate.votes} votes</p>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${index === 0 ? "bg-primary" : "bg-slate-400 dark:bg-slate-500"}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Vote Distribution</h3>
          <div className="h-[250px]">
            <ResultsChart election={election} />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Total Votes: <span className="font-medium text-slate-900 dark:text-white">{totalVotes}</span> • Election
          Ended:{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {new Date(election.endDate).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  )
}

function ResultsChart({ election }: ElectionResultsProps) {
  const totalVotes = election.candidates.reduce((sum, candidate) => sum + candidate.votes, 0)

  const data = {
    labels: election.candidates.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: election.candidates.map((c) => c.votes),
        backgroundColor: [
          "rgba(25, 118, 210, 0.8)",
          "rgba(66, 165, 245, 0.8)",
          "rgba(100, 181, 246, 0.8)",
          "rgba(144, 202, 249, 0.8)",
          "rgba(187, 222, 251, 0.8)",
        ],
        borderColor: [
          "rgba(25, 118, 210, 1)",
          "rgba(66, 165, 245, 1)",
          "rgba(100, 181, 246, 1)",
          "rgba(144, 202, 249, 1)",
          "rgba(187, 222, 251, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Chart
      type="pie"
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 15,
              padding: 15,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw as number
                const percentage = totalVotes > 0 ? (value / totalVotes) * 100 : 0
                return `${label}: ${value} votes (${percentage.toFixed(1)}%)`
              },
            },
          },
        },
      }}
    />
  )
}

