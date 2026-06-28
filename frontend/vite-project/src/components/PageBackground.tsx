interface Props {
  children: React.ReactNode;
}

export default function PageBackground({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100">

      {/* Background Image */}
      <img
        src="/background.jpg"
        alt="Background"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          opacity-10
          pointer-events-none
          select-none
        "
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-white/60" />

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}