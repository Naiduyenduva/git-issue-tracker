"use server"

import prisma from "../lib/prismdb"
import {z} from "zod"
import { revalidatePath } from "next/cache";

const repoSchema = z.object({
    repoUrl: z.string().url(),
    userId: z.string(),
  });

export async function addRepository (formData: FormData) {
    const repoUrl = formData.get("repoUrl") as string;
    const userId = formData.get("userId") as string;

    const parsed = repoSchema.safeParse({ repoUrl, userId });
    if (!parsed.success) {
      return { error: "Invalid input" };
    }
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return { error: "Invalid GitHub repo URL" };

    const [, owner, name] = match;

    await prisma.repository.create({
        data: { name, owner, userId },
      });

    revalidatePath("/")

    return { success: "Repository added successfully!" };
}

export async function getRepositories(userId: string) {
    return await prisma.repository.findMany({ where: { userId } });
  }
