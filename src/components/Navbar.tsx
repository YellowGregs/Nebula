import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import { Menu, X, Home, Download, Code2 } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [discordLink, setDiscordLink] = useState<string | null>(null);
  const location = useLocation();
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  const navScale = useTransform(
    scrollY,
    [0, 50],
    [1.02, 1]
  );

  const navPadding = useTransform(
    scrollY,
    [0, 50],
    ["1rem", "0.5rem"]
  );

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

  const isActive = (path: string) => location.pathname === path;
  const shouldHaveSolidBg = isMenuOpen;

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-3"
      style={{ paddingTop: navPadding, paddingBottom: navPadding }}
    >
      <motion.nav 
        style={{ 
          scale: navScale,
          backgroundColor: shouldHaveSolidBg ? "rgba(0, 0, 0, 0.8)" : navBackground,
        }}
        className="max-w-7xl mx-auto transition-all duration-300 rounded-2xl backdrop-blur-xl"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                src="https://files.catbox.moe/gl077v.png"
                alt="Nebula"
                className="w-10 h-10"
              />
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white font-bold text-xl tracking-wider"
              >
                Nebula
              </motion.span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-4">
                <NavLink to="/" isActive={isActive('/')} icon={Home}>
                  Home
                </NavLink>
                <NavLink to="/scripts" isActive={isActive('/scripts')} icon={Code2}>
                  Scripts
                </NavLink>
                <NavLink to="/download" isActive={isActive('/download')} icon={Download}>
                  Download
                </NavLink>
              </div>

              <div className="h-6 w-px bg-blue-500/20 mx-2" />

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={discordLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-[#7289da]/10 hover:bg-[#7289da]/20 
                text-[#7289da] border border-[#7289da]/30 transition-all duration-300"
              >
                <FaDiscord className="w-4 h-4" />
                <span>Discord</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden overflow-hidden"
              >
                <motion.div 
                  className="py-3 space-y-1 border-t border-blue-500/10"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.1
                      }
                    }
                  }}
                >
                  <MobileNavLink to="/" isActive={isActive('/')} icon={Home} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink to="/scripts" isActive={isActive('/scripts')} icon={Code2} onClick={() => setIsMenuOpen(false)}>
                    Scripts
                  </MobileNavLink>
                  <MobileNavLink to="/download" isActive={isActive('/download')} icon={Download} onClick={() => setIsMenuOpen(false)}>
                    Download
                  </MobileNavLink>

                  <motion.a
                    variants={{
                      closed: { opacity: 0, x: -20 },
                      open: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={discordLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-[#7289da]/10 hover:bg-[#7289da]/20 
                    text-[#7289da] transition-all duration-200 mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaDiscord className="w-5 h-5" />
                    <span>Discord</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </motion.div>
  );
}

interface NavLinkProps {
  to: string;
  isActive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const NavLink = ({ to, isActive, icon: Icon, children }: NavLinkProps) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' 
          : 'text-zinc-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </Link>
  </motion.div>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, isActive, icon: Icon, children, onClick }: MobileNavLinkProps) => (
  <motion.div
    variants={{
      closed: { opacity: 0, x: -20 },
      open: { opacity: 1, x: 0 }
    }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' 
          : 'text-zinc-400 hover:text-white hover:bg-white/5'
      }`}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </Link>
  </motion.div>
);
