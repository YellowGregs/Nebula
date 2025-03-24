import { motion } from 'framer-motion';

interface CertifiedImageProps {
  width?: string;
  height?: string;
  className?: string;
  discordLink?: string;
}

export const CertifiedImage: React.FC<CertifiedImageProps> = ({
  width = '50px',
  height = '50px',
  className = '',
  discordLink = 'https://discord.gg/z2mxCpDmuA',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 left-2 z-50"
    >
      <a href={discordLink} target="_blank" rel="noopener noreferrer">
        <img
          src="https://files.catbox.moe/ml8oqi.webp"
          alt="Certified Safe"
          style={{ width, height }}
          className={className}
        />
      </a>
    </motion.div>
  );
};
