import { useState, useEffect } from 'react';
import { Download, AlertCircle, Smartphone, Apple, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface ApkLinks {
  [key: string]: string;
}

interface JsonData {
  ApkLink: ApkLinks;
}

const VersionSelect = ({ selectedVersion, onChange }: { selectedVersion: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
  <div className="relative inline-block">
    <label htmlFor="version-select" className="sr-only">Select Version</label>
    <select
      id="version-select"
      aria-label="Select version"
      className="appearance-none bg-blue-500/10 text-white border border-blue-500/20 rounded-lg pl-4 pr-10 py-2 hover:bg-blue-500/20 transition-colors cursor-pointer focus:outline-none focus:border-blue-500/40"
      value={selectedVersion}
      onChange={onChange}
    >
      <option value="64">64-bit</option>
      <option value="32" disabled>32-bit (W.I.P)</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

export default function DownloadPage() {
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [selectedVersion, setSelectedVersion] = useState("64");

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json')
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Error fetching JSON data:', error));
  }, []);

  const handleDownload = () => {
    if (jsonData) {
      const downloadLink = jsonData.ApkLink[selectedVersion];
      if (downloadLink) {
        // window.location.href = downloadLink;
        window.open(downloadLink, "_blank");
      }
    }
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(e.target.value);
  };

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Download Nebula</h1>
            <p className="text-blue-200 text-lg">Download Your Executor For Free</p>
          </motion.div>

          <div className="grid gap-8">
            {/* Android */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
            >
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-500/10 p-4 rounded-xl">
                    <Smartphone className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Android Executor</h2>
                    <p className="text-white/60">64-bit version available</p>
                  </div>
                </div>

                <div className="bg-blue-500/5 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white/60 text-sm">
                      32-bit version is currently in development. Please use the 64-bit version if your device supports it.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </motion.button>

                  <VersionSelect selectedVersion={selectedVersion} onChange={handleVersionChange} />
                </div>
              </div>
            </motion.div>

            {/* Coming Soon  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[ 
                {
                  name: 'Windows',
                  icon: Monitor,
                  description: 'Windows version coming soon',
                  buttonText: 'Coming Soon'
                },
                {
                  name: 'iOS',
                  icon: Apple,
                  description: 'iOS version coming soon',
                  buttonText: 'Coming Soon'
                }
              ].map(({ name, icon: Icon, description, buttonText }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{name} Version</h3>
                  </div>
                  <p className="text-white/60 mb-6">{description}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300"
                  >
                    {buttonText}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
