"use server";

import Login from "@/components/login";
import Footer from "@/components/footer";
import { cookies } from "next/headers";
import { readData } from "@/lib/data";

export default async function Home() {
  const cookieStore = await cookies();
  const password = cookieStore.get("password")?.value;

  if (password !== process.env.PASSWORD || process.env.PASSWORD === undefined)
    return <Login />;

  const messages: string[] = await readData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <main className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Gelen Mesajlar
            </h1>
            <p className="text-zinc-400 text-lg">
              Size gönderilen tüm anonim mesajlar
            </p>
          </div>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center p-8 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/50">
                <p className="text-zinc-400">Henüz mesaj bulunmuyor</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className="p-6 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-zinc-500">
                      Mesaj #{messages.length - index}
                    </span>
                    <span className="text-sm text-zinc-500">
                      {new Date().toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <p className="text-zinc-200 whitespace-pre-wrap">{message}</p>
                </div>
              ))
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
