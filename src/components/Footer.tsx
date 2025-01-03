import { FaDiscord } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 Nebula. All rights reserved.
          </div>
          <a
            href="https://discord.gg/YCVzXaAtxt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300"
          >
            <FaDiscord className="w-5 h-5" />
            <span>Join our Discord</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
