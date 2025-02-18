"use client";

import React from "react";
import { login } from "@/actions/login";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Giriş Yap</h2>
          <p className="mt-2 text-zinc-400">
            Mesajlarınızı görüntülemek için giriş yapın
          </p>
        </div>

        <form
          action={login}
          className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-zinc-700/50"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-100 placeholder-zinc-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
