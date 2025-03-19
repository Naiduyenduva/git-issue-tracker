import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { RepositoryState } from "../client/types";

const Issues: React.FC<{ repositories: RepositoryState }> = ({ repositories }) => {

  // Ensure repositories is an array (not an error object)
  if (!Array.isArray(repositories)) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {repositories.error}</p>
      </div>
    );
  }

  // Flatten issues from all repositories
  const allIssues = repositories.flatMap((repo) =>
    repo.issues.map((issue) => ({ ...issue, repoName: repo.name,repoOwner:repo.owner }))
  );

  return (
    <div>
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
                  {allIssues.length > 0 ? (
                    allIssues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell>
                          {issue.state === "open" ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          <span>
                            {issue.title.length > 50
                              ? issue.title.slice(0, 50) + "..."
                              : issue.title}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-muted-foreground">
                          <span>{issue.repoOwner}/{issue.repoName}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-xs text-muted-foreground">
                            #{issue.number}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
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
  );
};

export default Issues;
