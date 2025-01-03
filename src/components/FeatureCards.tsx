import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative bg-dark-accent rounded-xl p-8 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
      
      <div className="relative">
        <div className="mb-6 relative">
          <div className="absolute -inset-2 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Icon className="w-10 h-10 text-white/90 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" />
        </div>
        
        <h3 className="text-xl font-semibold text-white/90 mb-3 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
