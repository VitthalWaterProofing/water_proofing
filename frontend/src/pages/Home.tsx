import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import WhyUs from "../components/sections/WhyUs";
import LeakageCTA from "../components/sections/LeakageCTA";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs/>
      <Projects />
      <Testimonials />
      <LeakageCTA />
      <Contact />
      <Footer/>
    </>
  );
}