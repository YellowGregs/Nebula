import { useState, useEffect } from 'react';
import {
  Download,
  AlertCircle,
  Smartphone,
  Apple,
  Monitor,
  CheckCircle,
  DownloadCloud
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ApkLinks {
  [key: string]: string;
}

interface VngLinks {
  [key: string]: string;
}

interface JsonData {
  ApkLink: {
    '32': string;
    '64': string;
    vng: VngLinks;
  };
}

const VersionSelect = ({
  selectedVersion,
  onChange,
  isVNG
}: {
  selectedVersion: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isVNG: boolean;
}) => (
  <div className="relative inline-block">
    <select
      id="version-select"
      aria-label="Select version"
      className="appearance-none bg-blue-500/10 text-white border border-blue-500/20 
                 rounded-xl pl-4 pr-10 py-2 hover:border-blue-500/30 transition-all duration-300 cursor-pointer focus:outline-none 
                 focus:ring-2 focus:ring-blue-500/20 w-full"
      value={selectedVersion}
      onChange={onChange}
    >
      {isVNG ? (
        <>
          <option value="vng-64">VNG 64‑bit</option>
          <option value="vng-32" disabled>
            VNG 32‑bit (W.I.P)
          </option>
        </>
      ) : (
        <>
          <option value="64">64‑bit</option>
          <option value="32" disabled>
            32‑bit (W.I.P)
          </option>
        </>
      )}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg
        className="w-4 h-4 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

export default function DownloadPage() {
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [selectedVersion, setSelectedVersion] = useState('64');
  const [isVNG, setIsVNG] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json'
    )
      .then((res) => res.json())
      .then((data: JsonData) => setJsonData(data))
      .catch((err) => console.error('Error fetching JSON:', err));
  }, []);

  // Handler for user location selection
  const handleLocationSelect = (fromVietnam: boolean) => {
    setIsVNG(fromVietnam);
    setSelectedVersion(fromVietnam ? 'vng-64' : '64');
    setShowModal(false);
  };

  const handleDownload = () => {
    if (!jsonData) return;

    let link: string | undefined;
    if (selectedVersion.startsWith('vng-')) {
      // "vng-64" → key "64"
      const bit = selectedVersion.split('-')[1];
      link = jsonData.ApkLink.vng[bit];
    } else {
      link = jsonData.ApkLink[selectedVersion as '32' | '64'];
    }

    if (link) {
      window.open(link, '_blank');
    } else {
      alert('Download link not available for this version.');
    }
  };

  // Until the user selects their location, do not render the main UI.
  if (isVNG === null && showModal === false) return null;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-28 pb-12">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-blue-950 border border-blue-500/20 rounded-2xl p-8 max-w-sm w-full text-center text-white shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Are you from Vietnam?</h2>
            <p className="text-blue-200 mb-6">
              This helps us show you the correct APK version.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleLocationSelect(true)}
                className="px-6 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => handleLocationSelect(false)}
                className="px-6 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[800px] h-[800px] -top-400 -right-200 bg-blue-500/10 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
              <DownloadCloud className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Download Nebula</h1>
          <p className="text-blue-200 text-lg">
            Choose your platform and start executing
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/40">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-500/10 p-4 rounded-xl">
                    <Smartphone className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Android</h2>
                    <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-green-500/10 text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Working
                    </span>
                  </div>
                </div>

                <div className="bg-blue-500/5 rounded-xl p-4 mb-6 flex-grow">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-200 text-sm">
                      {isVNG
                        ? 'Select your VNG build.'
                        : '32‑bit version is in development. Use 64‑bit if supported.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
                  >
                    <Download className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                    Download
                  </motion.button>

                  <VersionSelect
                    selectedVersion={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    isVNG={!!isVNG}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* iOS Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/40">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-500/10 p-4 rounded-xl">
                    <Apple className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">iOS</h2>
                    <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-red-500/10 text-red-400">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      N.I.D
                    </span>
                  </div>
                </div>

                <div className="bg-blue-500/5 rounded-xl p-4 mb-6 flex-grow">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-200 text-sm">
                      iOS version is not in development.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled
                  className="w-full py-3 px-6 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 transition-all duration-300 opacity-50 cursor-not-allowed mt-auto"
                >
                  Not Available
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Windows Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/40">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-500/10 p-4 rounded-xl">
                    <Monitor className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Windows</h2>
                    <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-red-500/10 text-red-400">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      N.I.D
                    </span>
                  </div>
                </div>

                <div className="bg-blue-500/5 rounded-xl p-4 mb-6 flex-grow">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-200 text-sm">
                      Windows version is not in development.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled
                  className="w-full py-3 px-6 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 transition-all duration-300 opacity-50 cursor-not-allowed mt-auto"
                >
                  Not Available
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
