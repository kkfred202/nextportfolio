import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import CertsSection from "../components/sections/CertsSection";
import ContactSection from "../components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <CertsSection />
      <ContactSection />
    </>
  );
}
