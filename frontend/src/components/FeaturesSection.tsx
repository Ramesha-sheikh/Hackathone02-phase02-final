// frontend/src/components/FeaturesSection.tsx

import FeatureCard from './FeatureCard';
import { Zap, Shield, Users, BarChart3, Star, Heart } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-[color:var(--accent-caramel)]" />,
      title: "Smooth & Rich",
      description: "Seamlessly manage your tasks with our rich, smooth interface. No more waiting around.",
    },
    {
      icon: <Shield className="w-10 h-10 text-[color:var(--accent-coffee)]" />,
      title: "Secure & Private",
      description: "Your data is encrypted and stored securely. We never share your information with third parties.",
    },
    {
      icon: <Users className="w-10 h-10 text-[color:var(--accent-caramel)]" />,
      title: "Team Collaboration",
      description: "Share your lists and collaborate with your team in real-time with seamless integration.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-[color:var(--accent-coffee)]" />,
      title: "Advanced Analytics",
      description: "Track your productivity with detailed analytics and insights to improve your workflow.",
    },
    {
      icon: <Star className="w-10 h-10 text-[color:var(--accent-caramel)]" />,
      title: "Smart Prioritization",
      description: "Our AI-powered system helps you prioritize tasks based on importance and deadlines.",
    },
    {
      icon: <Heart className="w-10 h-10 text-[color:var(--accent-coffee)]" />,
      title: "User Focused",
      description: "Designed with user experience in mind. Warm, intuitive, and coffee-inspired interface.",
    },
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}