import { motion } from 'framer-motion';
import { Key } from 'lucide-react';

export default function GetKeyPage() {
  const handleGetKey = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-28 pb-12">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[800px] h-[800px] -top-400 -right-200 bg-blue-500/10 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[800px] h-[800px] -bottom-400 -left-200 bg-blue-500/10 rounded-full blur-[180px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-500/10 p-4 rounded-2xl">
              <Key className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Get Key</h1>
          <p className="text-blue-200 text-lg">Choose your provider to receive your key</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lootlab Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-purple-500/40">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-purple-500/10 p-4 rounded-xl">
                    <img
                      src="https://s3-eu-west-1.amazonaws.com/tpd/logos/65786726ba1241d21ae5bdd3/0x0.png"
                      alt="Lootlab Logo"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Lootlab</h2>
                  </div>
                </div>

                <div className="flex flex-col items-center mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGetKey("https://ads.luarmor.net/get_key?for=Key_Reward-tKEDOXlSFOcU")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                             from-purple-600 to-purple-700 text-white rounded-xl font-medium transition-all duration-300
                             hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    Get Key
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Linkvertise Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-orange-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-orange-500/40">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-orange-500/10 p-4 rounded-xl">
                    <img
                      src="https://www.stepstone.de/upload_de/logo/E/logoLinkvertise-Inh-Marc-Winter-255864DE-2101131647.gif"
                      alt="Linkvertise Logo"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Linkvertise</h2>
                  </div>
                </div>

                <div className="flex flex-col items-center mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGetKey("https://ads.luarmor.net/get_key?for=Key_Reward-dGvHJFaYUIon")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                             from-orange-600 to-orange-700 text-white rounded-xl font-medium transition-all duration-300
                             hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    Get Key
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Work.ink Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-green-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-green-500/40">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-green-500/10 p-4 rounded-xl">
                    <img
                      src="https://files.catbox.moe/kwc5so.png"
                      alt="Work.ink Logo"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Work.ink</h2>
                  </div>
                </div>

                <div className="flex flex-col items-center mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGetKey("https://ads.luarmor.net/get_key?for=Key_Reward-ncEajmhwclYM")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                             from-green-600 to-green-700 text-white rounded-xl font-medium transition-all duration-300
                             hover:shadow-lg hover:shadow-green-500/20"
                  >
                    Get Key
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
