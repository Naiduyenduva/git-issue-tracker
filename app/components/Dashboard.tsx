"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addRepository } from "../api/repository"
import { fetchRepositories } from "../api/issues"
import { fetchAllIssues } from "../api/issues"

type issuetype = {
  id: string;
  title: string;
  createdAt: Date;
  repository: { id: string; name: string; owner: string };
  number?: number; // Mark as optional
  state?: string; // Mark as optional
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [repositories, setRepositories] = useState<{ id: string; owner: string; name: string; userId:string;}[] | { error: string }>([])
  const [isAddingRepo, setIsAddingRepo] = useState(false)
  const [issues, setIssues] = useState<issuetype[]>([]);

  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");
  const userId = process.env.USERID;

  async function handleSubmit (formData: FormData) {
    const response = await addRepository(formData);

    if(response.error) {
        setMessage(response.error)
        console.log(message)
    } else {
        setMessage(response.success as string);
        setIsAddingRepo(false);
        setRepoUrl("")
        fetchIssues();
    }
  }

  async function fetchRepos() {
    const response = await fetchRepositories();
    console.log(response)
    if ("error" in response) {
      console.log(response.error);
      return;
    }
    setRepositories(response);
  }

  async function fetchIssues() {
    const response = await fetchAllIssues(); // ✅ Fetch all issues from DB
    console.log(response);
    
    if ("error" in response) {
      console.log(response.error);
      return;
    }
    setIssues(response); // ✅ Set issues instead of repositories
}

  useEffect(()=> {
    fetchIssues();
    fetchRepos();
  },[])
  

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
                <Button className="cursor-pointer">
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
                <form action={handleSubmit} className="flex flex-col gap-3">
                  <Input
                      type="text"
                      name="repoUrl"
                      placeholder="Enter GitHub repo URL"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      required
                      className="outline-none"
                  />
                  <Button variant="outline" className="cursor-pointer" onClick={() => setIsAddingRepo(false)}>
                    Cancel
                  </Button>
                  <Input type="hidden" name="userId" value={userId} /> {/* Hidden userId field */}
                  <Button type="submit" className="cursor-pointer">Add Repository</Button>
                </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            { Array.isArray(repositories) ? (
            repositories.map((repo) => (
              <Card
                key={repo.id}
                className={`cursor-pointer hover:border-primary transition-colors`}
                
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    {repo.name}
                  </CardTitle>
                  <CardDescription>{repo.owner}/{repo.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                      <span>{issues.length} issues</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href={`https://github.com/${repo.owner}/${repo.name}`} target="_blank">
                      View on GitHub
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
            ) : (<p>Hello this is error</p>)
          }
          </div>
        </main>
        <h2 className="text-2xl font-bold pl-5 pb-5">Recent 5 issues of Repositories</h2>
        <Tabs defaultValue="list" className="mb-8 px-5">
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
                    <TableHead>Repository</TableHead>
                    <TableHead className="text-right">Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { issues.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell>
                            {issue.state === "open" ? (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            <span>{issue.title.length > 50 ? issue.title.slice(0, 50) + "..." : issue.title}</span>
                          </TableCell>
                          <TableCell className="font-medium text-muted-foreground">
                            <span>{issue.repository.owner}/{issue.repository.name}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-xs text-muted-foreground">
                              #{issue.number}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}              
                  {issues.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
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
    </div>
    </div>
  )
}