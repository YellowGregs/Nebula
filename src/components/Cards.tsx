import { ShieldIcon, ZapIcon, CodeIcon, PercentIcon } from 'lucide-react';
import { FeatureCard } from './FeatureCards';

const features = [
  {
    icon: ShieldIcon,
    title: "Title Update 1",
    description: "Description of the feature"
  },
  {
    icon: ZapIcon,
    title: "Title Update 2",
    description: "Description of the feature"
  },
  {
    icon: CodeIcon,
    title: "Title Update 3",
    description: "Description of the feature"
  },
  {
    icon: PercentIcon,
    title: "SUNC",
    description: "99% SUNC from our executor"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
