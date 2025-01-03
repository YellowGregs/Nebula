import { Download } from 'lucide-react';
import { Button } from './Button';
import { useState, useEffect } from 'react';

export function Hero() {
  const [apkLink, setApkLink] = useState('');
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchJSON = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json');
        const data = await response.json();

        // console.log('Fetched:', data);

        setApkLink(data.ApkLink);
        setVersion(data.versionName);
      } catch (error) {
        console.error('Failed to fetch JSON:', error);
      }
    };

    fetchJSON();
  }, []);

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
        <Button 
          onClick={() => window.open(apkLink, '_blank')} 
          className="group" 
          disabled={!apkLink}
        >
          <Download className="w-5 h-5 transition-transform duration-300 group-hover:scale-100" />
          Download
        </Button>
      </div>
    </section>
  );
}
