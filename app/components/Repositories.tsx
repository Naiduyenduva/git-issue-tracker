import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Trash2 } from "lucide-react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { RepositoryState, Repository } from "../client/types";
import { deleteRepo } from "../api/repository";
import { toast } from "sonner";

const Repositories: React.FC<{
  repositories: Repository[] | RepositoryState;
}> = ({ repositories }) => {

  async function handleDelete (userid:string,repoid:string) {
    const userId = userid
    const repositoryId = repoid;
    try {
      await deleteRepo(userId,repositoryId)
      toast("repository deleted please refresh")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {Array.isArray(repositories) ? (
          repositories.length>0 ? (
          repositories.map((repo) => (
            <Card
              key={repo.id}
              className={`cursor-pointer hover:border-primary transition-colors`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex">
                    <Github className="mr-2 h-5 w-5" />
                    {repo.name}
                  </div>
                  <button className="cursor-pointer" onClick={() => handleDelete(repo.userId,repo.id)}>
                    <Trash2 size={20} color="red" />
                    </button>
                </CardTitle>
                <CardDescription>
                  {repo.owner}/{repo.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                    <span>{repo.issues.length} issues</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button variant="ghost" size="sm" className="w-full bg-blue-500 text-white" asChild>
                  <Link
                    href={`https://github.com/${repo.owner}/${repo.name}`}
                    target="_blank"
                  >
                    View on GitHub
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ):(<p>No repositories found. Add one to track</p>)
        ) : (
          <p className="text-red-500">Error: {repositories.error}</p>
        )}
      </div>
    </div>
  );
};

export default Repositories;
