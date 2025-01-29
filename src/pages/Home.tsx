import { Download, Book, Shield, Sparkles, Key, Youtube, HelpCircle, ChevronDown } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface JsonData {
  versionName: string;
}

const features = [
  {
    icon: Shield,
    title: "Secure",
    description: "Safe to Use."
  },
  {
    icon: Sparkles,
    title: "Smooth UI",
    description: "Clean and modern interface for the user experience."
  },
  {
    icon: Key,
    title: "Easy Key System",
    description: "Simple and straightforward key system."
  }
];

const faqs = [
  {
    question: "What is Nebula?",
    answer: "Nebula is a free Roblox executor that allows you to run scripts in your games."
  },
  {
    question: "Is Nebula safe to use?",
    answer: "Yes, Nebula is completely safe to use."
  },
  {
    question: "Do I need a key?",
    answer: "Yes, Nebula uses a key system to maintain service."
  },
  {
    question: "Which Android version do I need?",
    answer: "We recommend using Android 64-bit, Since 32-bit version is currently in development."
  }
];

export default function Home() {
  const [data, setData] = useState<JsonData | null>(null);
  const { scrollY } = useScroll();
  const featuresOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const featuresY = useTransform(scrollY, [0, 300], [50, 0]);
  const tutorialRef = useRef<HTMLDivElement>(null);

  const scrollToTutorial = () => {
    tutorialRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json");
      const jsonData: JsonData = await response.json();
      setData(jsonData);
    };
    
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-250 -right-100 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute w-[500px] h-[500px] -bottom-250 -left-100 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full" />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400/40 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-blue-400/30 rounded-full" />
      </div>
      
      {/* Floating Tutorial Button */}
<motion.button
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.8 }}
  onClick={scrollToTutorial}
  className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 group flex items-center space-x-2 border border-blue-500/50"
>
  <div className="absolute -top-12 right-0 mb-2 px-4 py-2 bg-white/10 backdrop-blur-lg text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10">
    Go to Tutorial
  </div>
  <Youtube className="w-4 h-4" /> 
  <span className="font-medium text-sm">Tutorial</span>
  <ChevronDown className="w-3 h-3" />
</motion.button>

      
      <main className="relative flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
        {/* Main Section */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <img 
                src="https://files.catbox.moe/gl077v.png" 
                alt="Nebula Logo" 
                className="w-56 h-56 sm:w-64 sm:h-64 mx-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-2 tracking-tight">
                Nebula
              </h1>
              <p className="text-lg sm:text-xl text-blue-200 mb-8 max-w-2xl mx-auto px-4">
                Version {data.versionName}
              </p>
              <p className="text-lg sm:text-xl text-blue-200 mb-8 max-w-2xl mx-auto px-4">
                A Free Roblox Executor To Execute Scripts.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/download"
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] backdrop-blur-lg border border-blue-500/50"
                  >
                    <Download className="relative w-5 h-5 mr-2" />
                    <span className="relative">Download</span>
                  </Link>
                </motion.div>

                {/* <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-lg border border-white/10 hover:border-white/20"
                  >
                    <Book className="w-5 h-5 mr-2" />
                    View Documentation
                  </a>
                </motion.div> */}
                
                {/* <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/documentation"
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-500/10 text-blue-400 transition-all duration-300 hover:bg-blue-500/20 backdrop-blur-lg border border-blue-500/20"
                  >
                    <Book className="relative w-5 h-5 mr-2" />
                    <span className="relative">Documentation</span>
                  </Link>
                </motion.div> */}


              </div>
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <motion.div 
          style={{ opacity: featuresOpacity, y: featuresY }}
          className="w-full max-w-4xl mx-auto px-4 py-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-blue-500/5 backdrop-blur-xl rounded-lg p-6 border border-blue-500/10 hover:border-blue-500/20 transition-colors duration-300"
              >
                <feature.icon className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-white/60 text-sm text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tutorial Section */}
        <motion.div 
          ref={tutorialRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto px-4 py-16 scroll-mt-24"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Tutorial</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-blue-500/5 border border-blue-500/20">
            <iframe 
              width="1280" 
              height="720" 
              src="https://www.youtube.com/embed/_DICj4Ut8B8" 
              title="FULL TUTORIAL | How to Download New Nebula Mobile Executor" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto px-4 py-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-blue-500/5 backdrop-blur-xl rounded-lg p-6 border border-blue-500/10"
              >
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                    <p className="text-white/60">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
