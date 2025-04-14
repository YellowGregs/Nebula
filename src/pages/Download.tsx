import { useState, useEffect } from 'react';
import {
  Download,
  AlertCircle,
  Smartphone,
  Apple,
  Monitor,
  CheckCircle,
  DownloadCloud,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  versions,
}: {
  selectedVersion: string;
  onChange: (version: string) => void;
  versions: { label: string; value: string; disabled?: boolean }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = versions.find(v => v.value === selectedVersion)?.label || '';

  return (
    <div className="relative">
      <motion.button
        id="version-select-button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-blue-500/10 text-white border border-blue-500/20 
                 rounded-xl hover:border-blue-500/30 transition-all duration-300 focus:outline-none"
      >
        <span className="text-blue-200">{selectedLabel}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-blue-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 bottom-0 sm:absolute sm:bottom-auto sm:top-full z-[9999] w-full mt-2 bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-xl overflow-hidden shadow-xl"
            style={{
              maxHeight: '50vh',
              overflowY: 'auto'
            }}
          >
            <div className="p-2 space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-blue-400 border-b border-blue-500/20">Global Version</div>
              {versions.filter(v => !v.value.startsWith('vng-')).map((version, index) => (
                <motion.button
                  key={version.value}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => {
                    onChange(version.value);
                    setIsOpen(false);
                  }}
                  disabled={version.disabled}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    version.disabled 
                      ? 'opacity-50 cursor-not-allowed text-blue-300'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  {version.label}
                </motion.button>
              ))}
              
              <div className="px-3 py-2 text-sm font-medium text-blue-400 border-b border-blue-500/20">VNG Version</div>
              {versions.filter(v => v.value.startsWith('vng-')).map((version, index) => (
                <motion.button
                  key={version.value}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => {
                    onChange(version.value);
                    setIsOpen(false);
                  }}
                  disabled={version.disabled}
                  className={`w-full px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    version.disabled 
                      ? 'opacity-50 cursor-not-allowed text-blue-300'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  {version.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function DownloadPage() {
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [selectedVersion, setSelectedVersion] = useState('64');
  const [downloadAvailable, setDownloadAvailable] = useState(true);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json'
    )
      .then((res) => res.json())
      .then((data: JsonData) => {
        setJsonData(data);
        checkDownloadAvailability(data, selectedVersion);
      })
      .catch((err) => {
        console.error('Error fetching JSON:', err);
        setDownloadAvailable(false);
      });
  }, []);

  const checkDownloadAvailability = (data: JsonData, version: string) => {
    let link: string | undefined;
    if (version.startsWith('vng-')) {
      const bit = version.split('-')[1];
      link = data.ApkLink.vng[bit];
    } else {
      link = data.ApkLink[version as '32' | '64'];
    }
    setDownloadAvailable(!!link);
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    if (jsonData) {
      checkDownloadAvailability(jsonData, version);
    }
  };

  const handleDownload = () => {
    if (!jsonData || !downloadAvailable) return;
    
    let link: string | undefined;
    if (selectedVersion.startsWith('vng-')) {
      const bit = selectedVersion.split('-')[1];
      link = jsonData.ApkLink.vng[bit];
    } else {
      link = jsonData.ApkLink[selectedVersion as '32' | '64'];
    }
    
    if (link) window.open(link, '_blank');
  };

  const isVngVersion = selectedVersion.startsWith('vng-');

  const versions = [
    { label: 'Global 64-bit', value: '64' },
    { label: 'Global 32-bit', value: '32' },
    { label: 'VNG 64-bit', value: 'vng-64' },
    { label: 'VNG 32-bit', value: 'vng-32' }
  ];

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
            ease: "easeInOut"
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
            ease: "easeInOut"
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
              <DownloadCloud className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Download Nebula</h1>
          <p className="text-blue-200 text-lg">Choose your platform and start executing</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Android Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-visible transition-all duration-300 group-hover:border-blue-500/40">
              <div className="p-8">
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

                {isVngVersion && (
                  <div className="bg-yellow-500/10 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-yellow-200 text-sm">
                        Warning: Using VNG version outside Vietnam may result in your account being locked to the Vietnam region. Only use if you're in Vietnam or specifically need the VNG version.
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-blue-500/5 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-200 text-sm">
                      Select your preferred version. Use 64-bit if your device supports it.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <VersionSelect
                    selectedVersion={selectedVersion}
                    onChange={handleVersionChange}
                    versions={versions}
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    disabled={!downloadAvailable}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      downloadAvailable
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/20'
                        : 'bg-blue-500/10 text-blue-400 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {downloadAvailable ? 'Download' : 'Not Available'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* iOS Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/40">
              <div className="p-8">
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

                <div className="bg-blue-500/5 rounded-xl p-4 mb-6">
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
                  className="w-full py-3 px-6 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 transition-all duration-300 opacity-50 cursor-not-allowed"
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
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/40">
              <div className="p-8">
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

                <div className="bg-blue-500/5 rounded-xl p-4 mb-6">
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
                  className="w-full py-3 px-6 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 transition-all duration-300 opacity-50 cursor-not-allowed"
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
