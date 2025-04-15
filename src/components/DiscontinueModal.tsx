import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DiscontinueModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  showDownloadMessage?: boolean;
}

export default function DiscontinueModal({ isOpen: propIsOpen, onClose, showDownloadMessage = false }: DiscontinueModalProps) {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? true);

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (!showDownloadMessage) {
      localStorage.setItem('discontinueModalSeen', 'true');
    }
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg mx-auto z-[9999]"
          >
            <div className="relative bg-gradient-to-br from-black to-blue-950/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-center mb-6">
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src="https://files.catbox.moe/gl077v.png"
                    alt="Nebula Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                </div>
                
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl font-bold text-white text-center mb-4"
                >
                  Nebula Has Been Discontinued
                </motion.h2>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4 text-blue-200 text-sm sm:text-base"
                >
                  <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
                    <p className="leading-relaxed">
                      Dear Community,<br /><br />
                      Nebula Executor has officially been disabled.<br />
                      With the departure of Nop, who was responsible for the Nebula Executor API, we have made the decision to shut down the project entirely.<br /><br />
                      We sincerely thank Nop for helping us bring Nebula to life. His work was instrumental in making this project what it was.<br /><br />
                      Thank you to everyone who supported us on this journey.<br /><br />
                      – The Nebula Team
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 sm:mt-8 flex justify-end"
                >
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base font-medium"
                  >
                    I Understand
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
