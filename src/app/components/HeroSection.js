export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <video autoPlay loop muted playsInline>
          <source src="/BADOSHI-Slow.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
