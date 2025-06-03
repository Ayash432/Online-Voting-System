"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Vote, Bell, User, Settings, LogOut, School } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface UserInfo {
  name: string
  aadhaar?: string
  email?: string
  [key: string]: any
}

interface DashboardHeaderProps {
  userInfo: UserInfo
  userRole: "voter" | "admin" | "super-admin"
}

export function DashboardHeader({ userInfo, userRole }: DashboardHeaderProps) {
  const router = useRouter()
  const { toast } = useToast()

  const dashboardLink =
    userRole === "voter" ? "/voter/dashboard" : userRole === "admin" ? "/admin/dashboard" : "/super-admin/dashboard"

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, cookies, etc.
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    })

    // Redirect to login page
    setTimeout(() => {
      router.push("/login")
    }, 500)
  }

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href={dashboardLink} className="flex items-center space-x-2">
              <Vote className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">VoteIndia</span>
            </Link>

            {(userRole === "admin" || userRole === "super-admin") && (
              <nav className="hidden md:flex items-center space-x-4 ml-6">
                <Link
                  href={dashboardLink}
                  className="text-sm font-medium text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  href={`/${userRole}/elections`}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                >
                  Elections
                </Link>
                <Link
                  href={`/${userRole}/candidates`}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                >
                  Candidates
                </Link>
                <Link
                  href={`/${userRole}/voters`}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                >
                  Voters
                </Link>
                <Link
                  href={`/${userRole}/reports`}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                >
                  Reports
                </Link>
                {userRole === "super-admin" && (
                  <Link
                    href="/super-admin/admins"
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                  >
                    Admins
                  </Link>
                )}
              </nav>
            )}

            {userRole === "voter" && (
              <nav className="hidden md:flex items-center space-x-4 ml-6">
                <Link
                  href="/voter/dashboard"
                  className="text-sm font-medium text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  href="/voter/college-events"
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                >
                  <School className="h-4 w-4 inline mr-1" />
                  College Events
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userInfo.name} />
                    <AvatarFallback>
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                    <p className="text-xs leading-none text-slate-600 dark:text-slate-400">
                      {userInfo.aadhaar || userInfo.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

