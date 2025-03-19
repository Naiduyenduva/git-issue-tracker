"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { addRepository } from "../api/repository";
import { fetchRepositories } from "../api/issues";
import { fetchAllIssues } from "../api/issues";
import Issues from "./Issues";
import Repositories from "./Repositories";
import { RepositoryState, issuetype } from "../client/types";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [repositories, setRepositories] = useState<RepositoryState>([]);
  const [isAddingRepo, setIsAddingRepo] = useState(false);
  const [issues, setIssues] = useState<issuetype[]>([]);

  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");
  const userId = process.env.USERID;

  async function handleSubmit(formData: FormData) {
    const response = await addRepository(formData);

    if (response.error) {
      setMessage(response.error);
      console.log(message);
    } else {
      setMessage(response.success as string);
      setIsAddingRepo(false);
      setRepoUrl("");
      fetchRepos();
      fetchIssues();
    }
  }

  async function fetchRepos() {
    const response = await fetchRepositories();
    console.log(response);
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

  useEffect(() => {
    fetchIssues();
    fetchRepos();
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-muted transition-all duration-300 border-r flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div
            className={`flex items-center ${!sidebarOpen && "justify-center"}`}
          >
            <Github className="h-6 w-6" />
            {sidebarOpen && <span className="ml-2 font-bold">IssueTracker</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            <Link
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md bg-blue-500 text-primary-foreground"
            >
              <LayoutDashboard
                className={`h-5 w-5 ${sidebarOpen ? "mr-3" : "mx-auto"}`}
              />
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Home className={`h-5 w-5 ${sidebarOpen ? "mr-3" : "mx-auto"}`} />
              {sidebarOpen && <span>Home</span>}
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t">
          <div
            className={`flex items-center ${!sidebarOpen && "justify-center"}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
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
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pl-8"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
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
                <button className=" cursor-pointer group relative flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 font-medium">
                  <Plus className="mr-2 mt-1 h-4 w-4" />
                  Add Repository
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add GitHub Repository</DialogTitle>
                  <DialogDescription>
                    Enter the URL of the GitHub repository you want to track.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <form action={handleSubmit} className="flex flex-col gap-3">
                      <input
                        type="text"
                        name="repoUrl"
                        placeholder="Enter GitHub repo URL"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      <Button
                        variant="outline"
                        className="cursor-pointer bg-red-50"
                        onClick={() => setIsAddingRepo(false)}
                      >
                        Cancel
                      </Button>
                      <Input type="hidden" name="userId" value={userId} />{" "}
                      {/* Hidden userId field */}
                      <button type="submit" className="group relative flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 font-medium cursor-pointer">
                      Add Repository
                      </button>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Repositories repositories={repositories} issues={issues} />
        </main>
        <h2 className="text-2xl font-bold pl-5 pb-5">
          Recent 5 issues of Repositories
        </h2>
        <Issues issues={issues} />
      </div>
    </div>
  );
}
