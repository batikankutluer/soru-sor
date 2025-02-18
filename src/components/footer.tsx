const PROJECT_LINK = "soru-sor";

export default function Footer() {
  return (
    <footer className="mt-16 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Anonim Mesaj. Tüm hakları
            saklıdır.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="#"
              className="text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
            >
              Gizlilik Politikası
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
            >
              Kullanım Şartları
            </a>
            <a
              href={`https://github.com/batikankutluer/${PROJECT_LINK}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
            >
              Github Projesi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
