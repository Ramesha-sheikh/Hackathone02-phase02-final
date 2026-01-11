// frontend/src/components/MockupCard.tsx

export default function MockupCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="coffee-card p-6 text-center h-full">
      <div className="w-full h-48 bg-[color:var(--bg-card)] coffee-border rounded-lg flex items-center justify-center mb-4 overflow-hidden">
        {title === "Desktop View" ? (
          <img
            src="/images/destop.jpg"
            alt="Desktop View"
            className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <img
            src="/images/mobile.jpg"
            alt="Mobile View"
            className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
      <h3 className="text-xl font-bold mb-2 text-[color:var(--text-primary)]">{title}</h3>
      <p className="text-[color:var(--text-secondary)]">{description}</p>
    </div>
  );
}