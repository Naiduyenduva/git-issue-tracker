"use server";
import prisma from "../lib/prismdb";
import axios from "axios";
import sendMails from "./sendmail/sendmail";

export async function checkForNewIssues() {
  console.log("issues checking...");
  const repos = await prisma.repository.findMany();
  let newissuefound = false;

  for (const repo of repos) {
    const { owner, name, id } = repo;
    const apiUrl: string = `https://api.github.com/repos/${owner}/${name}/issues?per_page=5&sort=created&direction=desc`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "User-Agent": "git-issue-tracker",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });

      const issues = response.data;
      for (const issue of issues) {
        const existingIssue = await prisma.issue.findFirst({
          where: { issueId: Number(issue.id) },
        });

        if (!existingIssue) {
          console.log(`repo user ${repo.userId}`);
          newissuefound = true;
          await prisma.issue.create({
            data: {
              issueId: issue.id,
              title: issue.title,
              number: issue.number,
              state: issue.state,
              repositoryId: id,
            },
          });

          const email = await prisma.user.findMany({
            where: {
              id: repo.userId,
            },
            select: {
              email: true,
            },
          });

          const emails = email.map((e) => e.email);
          console.log(emails)

          if (emails.length > 0) {
            await sendMails(emails);
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching issues for ${owner}/${name}`, error);
    }
  }
  if (!newissuefound) {
    console.log("No new issues found");
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
        userId: true,
        issues: {
          // Fetch related issues for each repository
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
    console.log(error);
    return { error: "Failed to fetch repositories and issues" };
  }
}