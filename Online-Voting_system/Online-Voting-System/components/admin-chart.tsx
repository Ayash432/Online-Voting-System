"use client"

import { Chart } from "@/components/ui/chart"

export function AdminChart() {
  // Mock data for the chart
  const data = {
    labels: ["Mar 22", "Mar 23", "Mar 24", "Mar 25", "Mar 26", "Mar 27", "Mar 28"],
    datasets: [
      {
        label: "Student Council Election",
        data: [12, 19, 25, 32, 45, 56, 65],
        borderColor: "rgba(25, 118, 210, 1)",
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Park Renovation Proposal",
        data: [8, 15, 22, 30, 38, 48, 55],
        borderColor: "rgba(76, 175, 80, 1)",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <Chart
      type="line"
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Votes",
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          intersect: false,
        },
      }}
      height={300}
    />
  )
}

