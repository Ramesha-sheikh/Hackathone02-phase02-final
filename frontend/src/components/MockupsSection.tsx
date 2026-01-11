// frontend/src/components/MockupsSection.tsx

import MockupCard from './MockupCard';

export default function MockupsSection() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">App Preview</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <MockupCard
          title="Desktop View"
          description="Full-featured interface optimized for productivity on larger screens"
        />
        <MockupCard
          title="Mobile View"
          description="Streamlined experience designed for on-the-go task management"
        />
      </div>
    </section>
  );
}