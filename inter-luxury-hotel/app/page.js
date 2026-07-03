import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoomsSection from "@/components/RoomsSection";
import ExperienceSection from "@/components/ExperienceSection";
import MenuSection from "@/components/MenuSection";
import AccountSection from "@/components/AccountSection";
import Footer from "@/components/Footer";
import ModalHost from "@/components/ModalHost";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RoomsSection />
        <ExperienceSection />
        <MenuSection />
        <AccountSection />
      </main>
      <Footer />
      <ModalHost />
    </>
  );
}
