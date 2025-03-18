"use server";
import prisma from "../lib/prismdb";
import axios from "axios";

export async function checkForNewIssues() {
  const repos = await prisma.repository.findMany();

  for (const repo of repos) {
    const { owner, name, id } = repo;
    const apiUrl:string = `https://api.github.com/repos/${owner}/${name}/issues?per_page=5&sort=created&direction=desc`;

    try {
      const response = await axios.get(apiUrl, {
        headers: { "User-Agent": "YourAppName" },
      });
      console.log(response.data)
      
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

export async function fetchRepository() {
  try {
    const repos = await prisma.repository.findMany();
    const repoIssues = [];
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Store in environment variable


    for (const repo of repos) {
      const { owner, name, id } = repo;
      const apiUrl = `https://api.github.com/repos/${owner}/${name}/issues?per_page=5&sort=created&direction=desc`;

      try {
        const response = await axios.get(apiUrl, {
          headers: { "User-Agent": "Git-Issue-Tracker" ,
          Authorization: `token ${GITHUB_TOKEN}`,} // ✅ Use GitHub Token
        });

        // Push repo info along with its issues
        repoIssues.push({
          id,
          owner,
          name,
          issues: response.data, // Issues from GitHub API
        });

      } catch (error) {
        console.error(`Error fetching issues for ${owner}/${name}:`, error);
        repoIssues.push({
          id,
          owner,
          name,
          issues: [], // Return empty issues on error
        });
      }
    }

    return repoIssues; // Return structured data

  } catch (error) {
    console.error("Error fetching repositories:", error);
    return { error: "Failed to fetch repositories" };
  }
}