"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;

  const cookieStore = await cookies();
  cookieStore.set("password", password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
