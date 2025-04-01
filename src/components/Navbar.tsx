import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import { Menu, X, Home, Download, Code2, Key } from 'lucide-react';
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

  const mobileMenuVariants = {
    closed: {
      clipPath: "inset(0 0 100% 0)",
      transition: {
        type: "tween",
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    open: {
      clipPath: "inset(0 0 0 0)",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-3"
      style={{ paddingTop: navPadding, paddingBottom: navPadding }}
    >
      <motion.nav 
        style={{ 
          backgroundColor: isMenuOpen ? "rgba(0, 0, 0, 0.8)" : navBackground,
          scale: navScale,
        }}
        className="max-w-7xl mx-auto rounded-2xl backdrop-blur-sm transition-all duration-300"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                src="https://files.catbox.moe/gl077v.png"
                alt="Nebula"
                className="w-10 h-10"
              />
              <span className="text-white font-bold text-xl tracking-wider">
                Nebula
              </span>
            </Link>

            {/* Desktop Navigation */}
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
                <NavLink to="/GetKey" isActive={isActive('/GetKey')} icon={Key}>
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
                text-[#7289da] border border-[#7289da]/30 transition-all duration-200"
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
                >
                  <motion.div variants={menuItemVariants}>
                    <MobileNavLink to="/" isActive={isActive('/')} icon={Home} onClick={() => setIsMenuOpen(false)}>
                      Home
                    </MobileNavLink>
                  </motion.div>
                  <motion.div variants={menuItemVariants}>
                    <MobileNavLink to="/scripts" isActive={isActive('/scripts')} icon={Code2} onClick={() => setIsMenuOpen(false)}>
                      Scripts
                    </MobileNavLink>
                  </motion.div>
                  <motion.div variants={menuItemVariants}>
                    <MobileNavLink to="/download" isActive={isActive('/download')} icon={Download} onClick={() => setIsMenuOpen(false)}>
                      Download
                    </MobileNavLink>
                  </motion.div>
                   <motion.div variants={menuItemVariants}>
                    <MobileNavLink to="/GetKey" isActive={isActive('/GetKey')} icon={Key} onClick={() => setIsMenuOpen(false)}>
                      Get Key
                    </MobileNavLink>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <a
                      href={discordLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-[#7289da]/10 hover:bg-[#7289da]/20 
                      text-[#7289da] transition-all duration-200 mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaDiscord className="w-5 h-5" />
                      <span>Discord</span>
                    </a>
                  </motion.div>
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
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
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
);
