"use server";

import { saveData } from "@/lib/data";

export async function sendMessage(formData: FormData) {
    const message = formData.get("message");
    await saveData({message, date: new Date()});
}