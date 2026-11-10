import type { Metadata } from "next";
import AnnouncementTicker from "@/components/site/AnnouncementTicker";
import CampusLifeSection from "@/components/site/CampusLifeSection";
import CtaBand from "@/components/site/CtaBand";
import HeroSlider from "@/components/site/HeroSlider";
import JourneySection from "@/components/site/JourneySection";
import NewsEvents from "@/components/site/NewsEvents";
import ProgramsCarousel from "@/components/site/ProgramsCarousel";
import StatsBand from "@/components/site/StatsBand";
import Testimonials from "@/components/site/Testimonials";

export const metadata: Metadata = { title: "Home" };

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AnnouncementTicker />
      <JourneySection />
      <ProgramsCarousel />
      <StatsBand />
      <CampusLifeSection />
      <NewsEvents />
      <Testimonials />
      <CtaBand />
    </>
  );
}
