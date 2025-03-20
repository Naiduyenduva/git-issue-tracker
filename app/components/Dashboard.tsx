"use client";

import { useEffect, useState, useCallback } from "react";
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
  X,
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
import Issues from "./Issues";
import Repositories from "./Repositories";
import { RepositoryState } from "../client/types";
import { useSession } from "next-auth/react";
import { fetchRepositoriesWithIssues } from "../api/issues";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [repositories, setRepositories] = useState<RepositoryState>([]);
  const [isAddingRepo, setIsAddingRepo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");
  const {data:session} = useSession();
  const userId = session?.user.id;

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function handleSubmit(formData: FormData) {
    const response = await addRepository(formData);

    if (response.error) {
      setMessage(response.error);
      console.log(message);
    } else {
      setMessage(response.success as string);
      setIsAddingRepo(false);
      setRepoUrl("");
      fetchRepoData();
    }
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const fetchRepoData = useCallback(async () => {
    if (!userId) return;
    const data = await fetchRepositoriesWithIssues(userId);
    if (!("error" in data)) {
      setRepositories(data.repositories);
    }
  }, [userId]);

  useEffect(() => {
    fetchRepoData();
  }, [fetchRepoData]);

  return (
    <div className="flex min-h-screen bg-background relative">
      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${
          isMobile ? "fixed" : "relative"
        } md:w-64 w-64 bg-muted transition-transform duration-300 border-r flex flex-col h-full z-30`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Github className="h-6 w-6" />
            <span className="ml-2 font-bold">IssueTracker</span>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            <Link
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md bg-blue-500 text-primary-foreground"
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{session?.user.username}</p>
              <p className="text-xs text-muted-foreground">
                {session?.user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-background border-b sticky top-0 z-10">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] md:w-64 pl-8"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>{session?.user.username}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
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
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="sm:text-2xl font-bold">GitHub Repositories</h2>
            <Dialog open={isAddingRepo} onOpenChange={setIsAddingRepo}>
              <DialogTrigger asChild>
                <button className="w-auto cursor-pointer group relative flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 font-medium">
                  <Plus className="mr-2 mt-[6px] h-4 w-4" />
                  Add Repository
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] w-[95vw] mx-auto">
                <DialogHeader>
                  <DialogTitle>Add GitHub Repository</DialogTitle>
                  <DialogDescription>
                    Enter the URL of the GitHub repository you want to track.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                    <Input type="hidden" name="userId" value={userId} />
                    <div className="grid flex-col sm:flex-row gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsAddingRepo(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        Add Repository
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Repositories repositories={repositories} />
          <h2 className="sm:text-2xl font-bold mt-8 mb-4">
            Recent 5 issues of Repositories
          </h2>
          <Issues repositories={repositories} />
        </main>
      </div>
    </div>
  );
}