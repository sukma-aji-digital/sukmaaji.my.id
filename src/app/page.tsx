import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getSortedProjectsData, getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  // Get projects data at build time
  const projects = getSortedProjectsData();
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection projects={projects} featuredProjects={featuredProjects} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
