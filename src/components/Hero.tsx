import { Download } from 'lucide-react';
import { Button } from './Button';
import { useState, useEffect } from 'react';
// ok some of things i coded here are trash :cry:
export function Hero() {
  const [apkLinks, setApkLinks] = useState<{ [key: string]: string }>({});
  const [version, setVersion] = useState('');
  const [arch, setArch] = useState('64');
  const [warningVisible, setWarningVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJSON = async () => {
      setLoading(true);
      try {
        const main = await fetch('https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json');
        const data = await main.json();

        // console.log('Fetched:', data);

        setApkLinks(data.ApkLink);
        setVersion(data.versionName);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch JSON:', error);
        setLoading(false);
      }
    };

    fetchJSON();
  }, []);

  useEffect(() => {
    if (!apkLinks || Object.keys(apkLinks).length === 0) {
      setWarningVisible(true);
      const timeout = setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setWarningVisible(false);
        setFadeOut(false);
      }, 3500);

      return () => clearTimeout(timeout);
    }
  }, [apkLinks]);

  const handleDownload = () => {
    if (!apkLinks || !apkLinks[arch]) return;

    const link = apkLinks[arch];
    window.open(link, '_blank');
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-center pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4">
      <img src="https://files.catbox.moe/gl077v.png" alt="Nebula" className="w-49 h-48 mx-auto mb-8" />
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Nebula - v{version}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Nebula is a Roblox Mobile Executor.
        </p>

        {loading && (
          <p className="text-white text-xl mb-6">Loading APK data...</p>
        )}

        {!loading && (
          <div className="mb-4">
            <label htmlFor="arch-select" className="block text-white mb-2">Select Bit:</label>
            <select
              id="arch-select"
              value={arch}
              onChange={(e) => setArch(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-800 text-white"
            >
              <option value="64">64-bit</option>
              <option value="32">32-bit</option>
            </select>
          </div>
        )}

        <Button
          onClick={handleDownload}
          className="group"
          disabled={!apkLinks[arch] || loading}
        >
          <Download className="w-5 h-5 transition-transform duration-300 group-hover:scale-100" />
          Download
        </Button>


        {warningVisible && (
          <div
            className={`mt-4 text-red-500 font-semibold transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
          >
            Nebula isn't released.
          </div>
        )}
      </div>
    </section>
  );
}
