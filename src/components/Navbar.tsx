import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import { Menu, X, Home, Download, Search, Code2 } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [discordLink, setDiscordLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json")
      .then(response => response.json())
      .then(data => {
        if (data.invite_discord) {
          setDiscordLink(data.invite_discord);
        }
      })
      .catch(error => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const shouldHaveSolidBg = isMenuOpen && (location.pathname === '/download'  || location.pathname === '/scripts' || location.pathname === '/');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 py-3">
      <nav 
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-2xl transform ${
          shouldHaveSolidBg
            ? 'bg-black border border-zinc-800 shadow-lg'
            : isScrolled 
              ? 'bg-black/60 backdrop-blur-lg border border-zinc-800/50 shadow-lg translate-y-0 scale-100' 
              : 'bg-transparent -translate-y-1 scale-[1.01]'
        }`}
      >
        <div className="px-4 sm:px-1 lg:px6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-1 group">
              <img
                src="https://files.catbox.moe/gl077v.png"
                alt="Nebula"
                className="w-12 h-12 transform transition-all duration-300 group-hover:scale-110"
              />
              {/* <span className="tracking-wider text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"> 
                Nebula
              </span> */}
              <span className="text-white font-bold text-xl tracking-wider">Nebula</span>

            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-blue-400 bg-blue-500/10' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/scripts"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/scripts')
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Scripts</span>
              </Link>
              <Link
                to="/download"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/download')
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Link>
              <div className="h-8 w-px bg-blue-500/20 mx-2" />
              <a
                href={discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-[#7289da]/20 hover:bg-[#7289da]/30 
                text-[#7289da] border border-[#7289da]/50 transition-all duration-200 hover:scale-105"
              >
                <FaDiscord className="w-5 h-5" />
                <span>Discord</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-3 space-y-2 border-t border-zinc-800/50">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-blue-400 bg-blue-500/10' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/download"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive('/download')
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Link>
              <Link
                to="/scripts"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive('/scripts')
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Code2 className="w-4 h-4" />
                <span>Scripts</span>
              </Link>
              <a
                href={discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-[#7289da]/20 hover:bg-[#7289da]/30 
                text-[#7289da] transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaDiscord className="w-5 h-5" />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
