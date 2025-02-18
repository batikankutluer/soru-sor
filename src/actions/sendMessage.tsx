"use server";

import { saveMessage } from "@/lib/db";
import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const message = formData.get("message") as string;

  if (!message || message.trim().length === 0) return;

  await saveMessage(message.trim());
  redirect("/");
}
