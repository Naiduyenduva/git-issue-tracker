"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertCircle,
  CheckCircle,
  Github,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Star,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for repositories
const initialRepos = [
  {
    id: 1,
    name: "react",
    fullName: "facebook/react",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    url: "https://github.com/facebook/react",
    stars: 203000,
    openIssues: 1200,
    language: "JavaScript",
  },
  {
    id: 2,
    name: "next.js",
    fullName: "vercel/next.js",
    description: "The React Framework for Production",
    url: "https://github.com/vercel/next.js",
    stars: 105000,
    openIssues: 1500,
    language: "TypeScript",
  },
]

// Mock data for issues
const mockIssues = [
  {
    id: 1,
    title: "Bug in component rendering",
    number: 1234,
    state: "open",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-16T14:20:00Z",
    author: {
      login: "user1",
      avatarUrl: "https://github.com/ghost.png",
    },
    labels: [
      { id: 1, name: "bug", color: "d73a4a" },
      { id: 2, name: "priority: high", color: "b60205" },
    ],
    comments: 5,
    assignees: [
      { login: "dev1", avatarUrl: "https://github.com/ghost.png" },
      { login: "dev2", avatarUrl: "https://github.com/ghost.png" },
    ],
  },
  {
    id: 2,
    title: "Feature request: Add dark mode support",
    number: 1235,
    state: "open",
    createdAt: "2023-06-14T08:15:00Z",
    updatedAt: "2023-06-15T11:45:00Z",
    author: {
      login: "user2",
      avatarUrl: "https://github.com/ghost.png",
    },
    labels: [
      { id: 3, name: "enhancement", color: "a2eeef" },
      { id: 4, name: "good first issue", color: "7057ff" },
    ],
    comments: 3,
    assignees: [],
  },
  {
    id: 3,
    title: "Documentation needs update for new API",
    number: 1236,
    state: "closed",
    createdAt: "2023-06-10T15:20:00Z",
    updatedAt: "2023-06-12T09:30:00Z",
    author: {
      login: "user3",
      avatarUrl: "https://github.com/ghost.png",
    },
    labels: [{ id: 5, name: "documentation", color: "0075ca" }],
    comments: 2,
    assignees: [{ login: "dev3", avatarUrl: "https://github.com/ghost.png" }],
  },
  {
    id: 4,
    title: "Performance optimization for large datasets",
    number: 1237,
    state: "open",
    createdAt: "2023-06-08T11:10:00Z",
    updatedAt: "2023-06-14T16:40:00Z",
    author: {
      login: "user4",
      avatarUrl: "https://github.com/ghost.png",
    },
    labels: [{ id: 6, name: "performance", color: "0e8a16" }],
    comments: 8,
    assignees: [
      { login: "dev1", avatarUrl: "https://github.com/ghost.png" },
      { login: "dev4", avatarUrl: "https://github.com/ghost.png" },
    ],
  },
  {
    id: 5,
    title: "Update dependencies to latest versions",
    number: 1238,
    state: "open",
    createdAt: "2023-06-05T09:25:00Z",
    updatedAt: "2023-06-07T13:15:00Z",
    author: {
      login: "user5",
      avatarUrl: "https://github.com/ghost.png",
    },
    labels: [{ id: 7, name: "dependencies", color: "0366d6" }],
    comments: 1,
    assignees: [],
  },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [repositories, setRepositories] = useState(initialRepos)
  const [selectedRepo, setSelectedRepo] = useState(repositories[0])
  const [issues, setIssues] = useState(mockIssues)
  const [newRepoUrl, setNewRepoUrl] = useState("")
  const [isAddingRepo, setIsAddingRepo] = useState(false)
  const [issueFilter, setIssueFilter] = useState("all")

  // Function to handle adding a new repository
  const handleAddRepository = () => {
    // Extract repo information from URL
    // In a real app, this would make an API call to GitHub
    const urlParts = newRepoUrl.replace("https://github.com/", "").split("/")
    if (urlParts.length >= 2) {
      const owner = urlParts[0]
      const repo = urlParts[1]
      const fullName = `${owner}/${repo}`

      // Check if repo already exists
      if (repositories.some((r) => r.fullName === fullName)) {
        alert("This repository is already added.")
        return
      }

      // Add new repository
      const newRepo = {
        id: repositories.length + 1,
        name: repo,
        fullName: fullName,
        description: `Repository for ${fullName}`,
        url: newRepoUrl,
        stars: Math.floor(Math.random() * 1000),
        openIssues: Math.floor(Math.random() * 100),
        language: ["JavaScript", "TypeScript", "Python", "Go", "Rust"][Math.floor(Math.random() * 5)],
      }

      setRepositories([...repositories, newRepo])
      setNewRepoUrl("")
      setIsAddingRepo(false)
    } else {
      alert("Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo)")
    }
  }

  // Filter issues based on selected filter
  const filteredIssues = issues.filter((issue) => {
    if (issueFilter === "all") return true
    if (issueFilter === "open") return issue.state === "open"
    if (issueFilter === "closed") return issue.state === "closed"
    return true
  })

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-muted transition-all duration-300 border-r flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className={`flex items-center ${!sidebarOpen && "justify-center"}`}>
            <Github className="h-6 w-6" />
            {sidebarOpen && <span className="ml-2 font-bold">IssueTrack</span>}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            <Link
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
            >
              <LayoutDashboard className={`h-5 w-5 ${sidebarOpen ? "mr-3" : "mx-auto"}`} />
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Home className={`h-5 w-5 ${sidebarOpen ? "mr-3" : "mx-auto"}`} />
              {sidebarOpen && <span>Home</span>}
            </Link>
            <Link
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <MessageSquare className={`h-5 w-5 ${sidebarOpen ? "mr-3" : "mx-auto"}`} />
              {sidebarOpen && <span>Messages</span>}
            </Link>
            <Link
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className={`h-5 w-5 ${sidebarOpen ? "mr-3" : "mx-auto"}`} />
              {sidebarOpen && <span>Settings</span>}
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className={`flex items-center ${!sidebarOpen && "justify-center"}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-background border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-64 pl-8" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">GitHub Repositories</h2>
            <Dialog open={isAddingRepo} onOpenChange={setIsAddingRepo}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Repository
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add GitHub Repository</DialogTitle>
                  <DialogDescription>Enter the URL of the GitHub repository you want to track.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/owner/repo"
                      value={newRepoUrl}
                      onChange={(e) => setNewRepoUrl(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingRepo(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRepository}>Add Repository</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {repositories.map((repo) => (
              <Card
                key={repo.id}
                className={`cursor-pointer hover:border-primary transition-colors ${selectedRepo?.id === repo.id ? "border-primary" : ""}`}
                onClick={() => setSelectedRepo(repo)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    {repo.name}
                  </CardTitle>
                  <CardDescription>{repo.fullName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{repo.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-500" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                      <span>{repo.openIssues} issues</span>
                    </div>
                    <Badge variant="outline">{repo.language}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href={repo.url} target="_blank">
                      View on GitHub
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedRepo && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Issues for {selectedRepo.fullName}</h2>
                <div className="flex items-center space-x-2">
                  <Select value={issueFilter} onValueChange={setIssueFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter issues" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Issues</SelectItem>
                      <SelectItem value="open">Open Issues</SelectItem>
                      <SelectItem value="closed">Closed Issues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="list" className="mb-8">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Labels</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredIssues.map((issue) => (
                            <TableRow key={issue.id}>
                              <TableCell>
                                {issue.state === "open" ? (
                                  <AlertCircle className="h-5 w-5 text-red-500" />
                                ) : (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="flex flex-col">
                                  <span>{issue.title}</span>
                                  <span className="text-xs text-muted-foreground">
                                    #{issue.number} opened by {issue.author.login}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {issue.labels.map((label) => (
                                    <Badge
                                      key={label.id}
                                      style={{
                                        backgroundColor: `#${label.color}`,
                                        color: Number.parseInt(label.color, 16) > 0xffffff / 2 ? "#000" : "#fff",
                                      }}
                                      className="text-xs"
                                    >
                                      {label.name}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredIssues.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-8">
                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                  <AlertCircle className="h-8 w-8 mb-2" />
                                  <p>No issues found</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
    </div>
  )
}