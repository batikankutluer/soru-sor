import Footer from "@components/footer";
import { sendMessage } from "@actions/sendMessage";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <main className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Anonim Mesaj Gönder
            </h1>
            <p className="text-zinc-400 text-lg">
              Düşüncelerini güvenli ve anonim bir şekilde paylaş
            </p>
          </div>

          <form
            action={sendMessage}
            className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-zinc-700/50"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Mesajınızı buraya yazın..."
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-zinc-100 placeholder-zinc-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  Gönder
                </button>
              </div>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}
