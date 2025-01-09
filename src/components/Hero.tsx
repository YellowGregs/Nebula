import { useState, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [apkLinks, setApkLinks] = useState<{ [key: string]: string }>({});
  const [architecture, setArchitecture] = useState('64');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchJsonData = async () => {
      setLoading(true);
      try {
        const main = await fetch('https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json');
        const data = await main.json();
        
        setApkLinks(data.ApkLink);  
        setVersion(data.versionName);
      } catch (error) {
        console.error('Failed to fetch JSON:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJsonData();
  }, []);

  const handleDownload = () => {
    if (!apkLinks[architecture]) return;
    const link = apkLinks[architecture];
    const a = document.createElement('a');
    a.href = link;
    a.download = 'Nebula.apk';
    a.target = '_blank';
    a.click();
  };

  return (
    <main className="flex-grow flex items-center justify-center relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div>
            <img
              src="https://files.catbox.moe/gl077v.png"
              alt="Nebula Logo"
              className="w-40 h-40 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Nebula - v{version}
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 px-4">
            Nebula is a Roblox Mobile Executor.
          </p>

          {loading && <p className="text-white text-xl mb-6">Loading APK data...</p>}

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)]"
              disabled={!apkLinks[architecture]}
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>

            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-lg 
                          flex items-center justify-center space-x-2 transition-colors"
              >
                <span>{architecture}-bit</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 sm:right-auto mt-2 w-full sm:w-40 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl z-10">
                  <button
                    onClick={() => {
                      setArchitecture('64');
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded-t-lg"
                  >
                    64-bit
                  </button>
                  <button
                    onClick={() => {
                      setArchitecture('32');
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded-b-lg"
                  >
                    32-bit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
