"use server";
import prisma from "../lib/prismdb";
import axios from "axios";

export async function checkForNewIssues() {
  const repos = await prisma.repository.findMany();

  for (const repo of repos) {
    const { owner, name, id } = repo;
    const apiUrl: string = `https://api.github.com/repos/${owner}/${name}/issues?per_page=5&sort=created&direction=desc`;

    try {
      const response = await axios.get(apiUrl, {
        headers: { "User-Agent": "YourAppName" },
      });
      console.log(response.data);

      const issues = response.data;
      for (const issue of issues) {
        const existingIssue = await prisma.issue.findUnique({
          where: { issueId: BigInt(issue.id) },
        });

        if (!existingIssue) {
          // Save issue in DB
          await prisma.issue.create({
            data: {
              issueId: issue.id,
              title: issue.title,
              number: issue.number,
              state: issue.state,
              repositoryId: id,
            },
          });

          // Send email notification
        }
      }
    } catch (error) {
      console.error(`Error fetching issues for ${owner}/${name}`, error);
    }
  }

  return { success: "Issues checked successfully!" };
}

export async function fetchRepositoriesWithIssues(userId: string | undefined) {
  if (!userId) {
    return { error: "User ID is required" };
  }

  try {
    const repositories = await prisma.repository.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        owner: true,
        userId:true,
        issues: { // Fetch related issues for each repository
          select: {
            id: true,
            title: true,
            state: true,
            number: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" }, // Fetch latest issues first
        },
      },
    });

    return { repositories };
  } catch (error) {
    console.log("Error fetching repositories and issues:", error);
    return { error: "Failed to fetch repositories and issues" };
  }
}
