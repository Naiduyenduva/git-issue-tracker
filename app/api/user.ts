"use server";

import prisma from "../lib/prismdb";
import { z } from "zod";
import bcrypt from "bcrypt";

const signupSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function createUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const parsed = signupSchema.safeParse({ username, email, password });
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const hashedpassword = await bcrypt.hash(password,10);

  await prisma.user.create({
    data: { username, email:email.toLowerCase(), password:hashedpassword },
  });
  return { success: "user created successfully" };
}
