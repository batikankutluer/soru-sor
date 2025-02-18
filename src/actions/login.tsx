"use server";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  try {
    const password = formData.get("password");

    if (password !== process.env.PASSWORD) {
      throw { error: "Şifre yanlış" };
    }

    const cookieStore = await cookies();
    cookieStore.set("password", password as string);
  } catch (error) {
    console.error(error);
    return redirect("/gelen?result=false");
  }

  redirect("/gelen?result=true");
}
