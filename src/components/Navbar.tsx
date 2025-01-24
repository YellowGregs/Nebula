import { useState, useEffect } from 'react';
import { Home, Code2, Menu, X, Download } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// ugly but who cares
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [discordInvite, setDiscordInvite] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json')
      .then(response => response.json())
      .then(data => {
        if (data.invite_discord) {
          setDiscordInvite(data.invite_discord);
        }
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/scripts', icon: Code2, label: 'Scripts' },
    { path: '/download', icon: Download, label: 'Download' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-4 py-2"
    >
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-blue-500/20' : 'bg-transparent backdrop-blur-sm'}`}>
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="group flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://files.catbox.moe/gl077v.png" 
                alt="Nebula Logo" 
                className="w-8 h-8 object-contain"
              />
            </motion.div>
            <span className="text-white font-bold text-xl tracking-wider">Nebula</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className="relative group px-3"
              >
                <div className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  isActive(path)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-white/60 hover:text-blue-400 group-hover:bg-blue-500/5'
                }`}>
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
              </Link>
            ))}

            <div className="h-8 w-px bg-blue-500/20 mx-2" />

            {discordInvite && (
              <motion.a
                href={discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white/60 hover:text-blue-400 transition-colors"
                title="Join our Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </motion.a>
            )}
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-500/5 transition-colors duration-200"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.div>
          </button>
        </div>
      
        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden rounded-b-2xl"
        >
          <div className={`${scrolled ? 'bg-black/90' : 'bg-transparent'} backdrop-blur-sm`}>
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive(path)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-white/60 hover:text-blue-400 hover:bg-blue-500/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
              
              <div className="flex items-center space-x-2 px-3 py-4 border-t border-blue-500/10">
                {discordInvite && (
                  <a
                    href={discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/60 hover:text-blue-400 transition-colors"
                    title="Join our Discord"
                  >
                    <FaDiscord className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
