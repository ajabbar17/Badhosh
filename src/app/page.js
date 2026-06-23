import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PerformancesSection from "./components/PerformancesSection";
import ProcessSection from "./components/ProcessSection";
import CharactersCarousel from "./components/CharactersCarousel";
import ZinesSection from "./components/ZinesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PerformancesSection />
      <ProcessSection />
      <CharactersCarousel />
      <ZinesSection />
    </main>
  );
}
