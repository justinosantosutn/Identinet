import { Hero } from "@/components/ui/hero";
import { QuickNav } from "@/components/ui/quick-nav";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Packs } from "@/components/sections/Packs";
import { Explore } from "@/components/sections/Explore";
import { Clients } from "@/components/sections/Clients";
import { Tools } from "@/components/sections/Tools";
import { Support } from "@/components/sections/Support";
import { Contact, Footer } from "@/components/sections/Contact";

const Home = () => {
  return (
    <div id="top" className="w-full">
      <Hero />
      <QuickNav />
      <HowItWorks />
      <Services />
      <Packs />
      <Explore />
      <About />
      <Clients />
      <Tools />
      <Support />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
