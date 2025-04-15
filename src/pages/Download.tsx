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

interface JsonData {
  ApkLink: ApkLinks;
}

const VersionSelect = ({
  selectedVersion,
  onChange
}: {
  selectedVersion: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
      <option value="64">64‑bit</option>
      <option value="32">32‑bit</option>
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
  const [selectedVersion, setSelectedVersion] = useState<'64' | '32'>('64');

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json'
    )
      .then((res) => res.json())
      .then((data: JsonData) => setJsonData(data))
      .catch((err) =>
        console.error('Error fetching JSON data for download links:', err)
      );
  }, []);

  const handleDownload = () => {
    if (!jsonData) return;
    const link = jsonData.ApkLink[selectedVersion];
    if (link) {
      window.open(link, '_blank');
    } else {
      console.warn(`No download link found for ${selectedVersion}-bit`);
    }
  };

  const handleVersionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVersion(e.target.value as '64' | '32');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-28 pb-12">
      {/* Background blobs */}
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
        {/* Header */}
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
          <h1 className="text-4xl font-bold text-white mb-4">
            Download Nebula
          </h1>
          <p className="text-blue-200 text-lg">
            Choose your platform and start executing
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Android */}
          <PlatformCard
            icon={<Smartphone className="w-8 h-8 text-blue-400" />}
            title="Android"
            status="Working"
            statusColor="green"
          >
            <p className="text-blue-200 text-sm">
              Both 64‑bit and 32‑bit APKs are available. Select your
              architecture and hit Download.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                           from-blue-600 to-blue-700 text-white rounded-xl font-medium transition-all duration-300
                           hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </motion.button>
              <VersionSelect
                selectedVersion={selectedVersion}
                onChange={handleVersionChange}
              />
            </div>
          </PlatformCard>

          {/* iOS */}
          <PlatformCard
            icon={<Apple className="w-8 h-8 text-blue-400" />}
            title="iOS"
            status="N.I.D"
            statusColor="red"
          >
            <p className="text-blue-200 text-sm">
              iOS version is not in development.
            </p>
          </PlatformCard>

          {/* Windows */}
          <PlatformCard
            icon={<Monitor className="w-8 h-8 text-blue-400" />}
            title="Windows"
            status="N.I.D"
            statusColor="red"
          >
            <p className="text-blue-200 text-sm">
              Windows version is not in development.
            </p>
          </PlatformCard>
        </div>
      </div>
    </div>
  );
}

interface PlatformCardProps {
  icon: React.ReactNode;
  title: string;
  status: 'Working' | 'N.I.D';
  statusColor: 'green' | 'red';
  children: React.ReactNode;
}

const PlatformCard = ({
  icon,
  title,
  status,
  statusColor,
  children
}: PlatformCardProps) => (
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
          <div className="bg-blue-500/10 p-4 rounded-xl">{icon}</div>
          <div>
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <span
              className={`inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-${
                statusColor === 'green'
                  ? 'green-500/10 text-green-400'
                  : 'red-500/10 text-red-400'
              }`}
            >
              {status === 'Working' ? (
                <CheckCircle className="w-4 h-4 mr-1" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-1" />
              )}
              {status}
            </span>
          </div>
        </div>

        <div className="bg-blue-500/5 rounded-xl p-4 mb-6 flex-grow">
          <div className="flex items-start space-x-3">{children}</div>
        </div>

        {status !== 'Working' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled
            className="w-full py-3 px-6 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 
                     transition-all duration-300 opacity-50 cursor-not-allowed mt-auto"
          >
            Not Available
          </motion.button>
        )}
      </div>
    </div>
  </motion.div>
);
