import { useState, useEffect, useCallback, useMemo } from 'react';
import { Copy, CheckCircle, RefreshCw, Search, ExternalLink, Key, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaDiscord, FaLightbulb, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const FALLBACK_IMAGE = "https://files.catbox.moe/gl077v.png";

export default function Scripts() {
  const [mode, setMode] = useState<"free" | "paid">("free");
  const [activeTab, setActiveTab] = useState<'recommendations' | 'search'>('recommendations');
  const [CopiedSID, setCopiedSID] = useState<string | null>(null);
  const [SearchQ, setSearchQ] = useState('');
  const [SResults, setSResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const Search_Scripts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://scriptblox-api-proxy.vercel.app/api/search`, {
        params: {
          q: SearchQ,
          mode: mode,
          page: page,
        }
      });

      if (response.data && response.data.result) {
        const scripts = response.data.result.scripts.map((script: any) => {
          if (script.game?.imageUrl && !script.game.imageUrl.startsWith("http")) {
            script.game.imageUrl = `https://scriptblox.com${script.game.imageUrl}`;
          }
          return {
            ...script,
            scriptType: script.scriptType || 'free',
            isUniversal: script.isUniversal || false,
            visibility: script.visibility || 'public',
            createdAt: script.createdAt || new Date().toISOString(),
            updatedAt: script.updatedAt || new Date().toISOString(),
          };
        });

        setSResults(scripts);
        setTotalPages(response.data.result.totalPages);
      } else {
        setSResults([]);
        setError('Invalid response format from server');
        setTotalPages(0);
      }
    } catch (err) {
      setError('Failed to fetch scripts. Please try again later.');
      console.error('Error fetching scripts:', err);
    } finally {
      setIsLoading(false);
    }
  }, [SearchQ, mode, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (SearchQ.trim()) {
        Search_Scripts();
      } else {
        setSResults([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [SearchQ, mode, page, Search_Scripts]);

  const CopyTC = async (code: string, scriptId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSID(scriptId);
      setTimeout(() => setCopiedSID(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const recommendH = useMemo(() => [
    {
      name: "Speed Hub X",
      description: "One script to improve your gaming experience.",
      discordLink: "https://discord.gg/speedhubx",
      script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/AhmadV99/Speed-Hub-X/main/Speed%20Hub%20X.lua", true))()',
      image: "https://files.catbox.moe/o6m1bl.png"
    },
    {
      name: "Hoho Hub",
      description: "Hoho.",
      discordLink: "https://discord.gg/hohohub",
      script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/acsu123/HOHO_H/main/Loading_UI"))()',
      image: "https://files.catbox.moe/gl077v.png"
    },
    {
      name: "W-Azure Hub",
      description: "W-azure.",
      discordLink: "https://discord.gg/w-azure",
      script: `getgenv().Team = "Pirates"
getgenv().AutoLoad = false // Will Load Script On Server Hop
loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/3b2169cf53bc6104dabe8e19562e5cc2.lua"))()`,
      image: "https://files.catbox.moe/gl077v.png"
    },
    {
      name: "Reaper Hub",
      description: "Reaper.",
      discordLink: "https://discord.gg/reaperhub",
      script: 'loadstring(game:HttpGet("https://reaperscripts.com/loader.lua"))()',
      image: "https://files.catbox.moe/gl077v.png"
    },
    {
      name: "Lunor Hub",
      description: "Lunor.",
      discordLink: "https://discord.gg/lunor",
      script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Just3itx/Lunor-Loadstrings/refs/heads/main/Loader"))()',
      image: "https://files.catbox.moe/gl077v.png"
    },
    {
      name: "Alchemy hub",
      description: "Alchemy.",
      discordLink: "https://discord.gg/alchemyhub",
      script: 'loadstring(game:HttpGet("https://scripts.alchemyhub.xyz"))()',
      image: "https://files.catbox.moe/topblv.webp"
    }
  ], []);

  const [lineCount, setLineCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const counts: { [key: string]: number } = {};
    recommendH.forEach((hub, index) => {
      counts[`hub-${index}`] = hub.script.split("\n").length;
    });
    setLineCount(counts);
  }, [recommendH]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[500px] h-[500px] -top-250 -right-100 bg-blue-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[500px] h-[500px] -bottom-250 -left-100 bg-blue-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 mb-8 justify-center">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'recommendations'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
              }`}
            >
              <FaLightbulb className="inline mr-2 mb-1" />
              Recommendations
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
              }`}
            >
              <FaSearch className="inline mr-2 mb-1" />
              Script Searcher
            </button>
          </div>

          {activeTab === 'recommendations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendH.map((hub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-lg overflow-hidden hover:border-blue-500/40 transition-all duration-300"
                >
                  {/* Hub content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={hub.image}
                        alt={hub.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-white">{hub.name}</h3>
                        <p className="text-blue-400 text-sm">{hub.description}</p>
                      </div>
                    </div>

                    <div className="relative mb-4">
                      <pre className="bg-black/50 rounded-lg p-4 text-blue-300 text-sm overflow-x-auto custom-scrollbar border border-blue-500/30">
                        {hub.script}
                      </pre>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => CopyTC(hub.script, `hub-${index}`)}
                        className="absolute right-2 px-4 py-1.5 text-sm bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-600/30 transition-all duration-200 flex items-center space-x-2"
                        style={{
                          top: `${55 + (lineCount[`hub-${index}`] || 0) * 22}px`,
                        }}
                      >
                        {CopiedSID === `hub-${index}` ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    <a
                      href={hub.discordLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
                    >
                      <FaDiscord className="w-4 h-4" />
                      <span>Discord</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'search' && (
            <div>
              <div className="max-w-2xl mx-auto mb-8 flex space-x-4 items-center">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={SearchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    placeholder="Search for scripts..."
                    className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-white placeholder-blue-400/60 focus:outline-none focus:border-blue-500/40"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                </div>

                <select
                  className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/20 focus:outline-none"
                  value={mode}
                  onChange={(e) => setMode(e.target.value as "free" | "paid")}
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
              )}

              {error && (
                <div className="text-red-400 text-center py-4">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {SResults.map((script, index) => (
                  <motion.div
                    key={script._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-lg overflow-hidden flex flex-col h-full"
                  >
                    {/* Script card content */}
                    <div className="p-6">
                      <div className="w-full h-40 relative mb-4">
                        {script.game ? (
                          <a href={`https://www.roblox.com/games/${script.game.gameId}`} target="_blank" rel="noopener noreferrer">
                            <img
                              src={script.game.imageUrl}
                              alt={script.game.name || "Game Image"}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = FALLBACK_IMAGE;
                              }}
                            />
                          </a>
                        ) : (
                          <img
                            src={FALLBACK_IMAGE}
                            alt="Script thumbnail"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <a
                            href={`https://scriptblox.com/script/${script.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-blue-400 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-white mb-1 hover:underline">
                              {script.title}
                            </h3>
                          </a>
                          {script.game && (
                            <a
                              href={`https://www.roblox.com/games/${script.game.gameId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 text-sm hover:underline"
                            >
                              {script.game.name}
                            </a>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {script.verified && (
                            <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                          {script.isPatched && (
                            <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded-full">
                              Patched
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <pre className="bg-black/50 rounded-lg p-4 text-blue-300 text-sm overflow-x-auto custom-scrollbar border border-blue-500/10 mb-2">
                          {script.script}
                        </pre>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => CopyTC(script.script, script._id)}
                          className="w-full px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-600/30 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          {CopiedSID === script._id ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </motion.button>
                      </div>

                      <div className="flex items-center justify-between text-sm text-blue-400">
                        <span>{script.views.toLocaleString()} views</span>
                        {script.key && script.keyLink && (
                          <a
                            href={script.keyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
                          >
                            <Key className="w-4 h-4" />
                            <span>Get Key</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5 inline" /> Prev
                  </button>
                  <span className="text-zinc-400 bg-zinc-900/50 px-4 py-2 rounded-lg border border-zinc-800/50">
                   {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all disabled:opacity-50"
                  >
                    Next <ChevronRight className="w-5 h-5 inline" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}