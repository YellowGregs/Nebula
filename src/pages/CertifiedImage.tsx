import { motion } from 'framer-motion';

interface CertifiedImageProps {
  width?: string;
  height?: string;
  className?: string;
}

export const CertifiedImage: React.FC<CertifiedImageProps> = ({
  width = '50px',
  height = '50px',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 left-2 z-50"
    >
      <img
        src="https://files.catbox.moe/ml8oqi.webp"
        alt="Certified Safe"
        style={{ width, height }}
        className={className}
      />
    </motion.div>
  );
};
