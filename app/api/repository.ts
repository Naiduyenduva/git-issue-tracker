"use server";

import prisma from "../lib/prismdb";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import axios from "axios";

const repoSchema = z.object({
  repoUrl: z.string().url(),
  userId: z.string(),
});

export async function addRepository(formData: FormData) {
  const repoUrl = formData.get("repoUrl") as string;
  const userId = formData.get("userId") as string;

  const parsed = repoSchema.safeParse({ repoUrl, userId });
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return { error: "Invalid GitHub repo URL" };

  const [, owner, name] = match;

  const existingRepo = await prisma.repository.findFirst({
    where: { owner, name },
  });

  if (existingRepo) {
    return { error: "Repo already added" };
  }

  // ✅ Add the repository
  const newRepo = await prisma.repository.create({
    data: { name, owner, userId },
  });

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return { error: "GitHub token not found" };
  }

  // ✅ Fetch the latest 5 issues
  const apiUrl = `https://api.github.com/repos/${owner}/${name}/issues?per_page=5&sort=created&direction=desc`;

  try {
    const { data: issues } = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "git-issue-tracker",
        Authorization: `Bearer ${GITHUB_TOKEN}`, // ✅ Corrected
      },
    });

    // ✅ Insert multiple issues into database
    if (issues.length > 0) {
      await prisma.issue.createMany({
        data: issues.map((issue: { title: string; state: string; number: number; id: number }) => ({
          title: issue.title,
          state: issue.state,
          number: issue.number,
          issueId: issue.id,
          repositoryId: newRepo.id, // ✅ Link issue to repository
        })),
      });
    }
  } catch (error) {
    console.error("Failed to fetch GitHub issues:", error);
  }

  revalidatePath("/");

  return { success: "Repository and issues added successfully!" };
}

export async function getRepositories(userId: string) {
    return await prisma.repository.findMany({ where: { userId } });
  }
