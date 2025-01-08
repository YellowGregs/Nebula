import { FaDiscord } from 'react-icons/fa';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
          <img src="https://files.catbox.moe/gl077v.png" alt="Nebula" className="w-12 h-12" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Nebula
            </span>
          </div>

          <a
            href="https://discord.gg/YCVzXaAtxt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300"
            title="Join our Discord"
          >
            <FaDiscord className="w-5 h-5" /> 
          </a>
        </div>
      </div>
    </header>
  );
}
