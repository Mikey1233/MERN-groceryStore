import Footer from "@/components/Footer";
import About from "@/components/home/About";
import Category from "@/components/home/Category";
import Cta from "@/components/home/Cta";
import Hero from "@/components/home/Hero";
import BestSeller from "@/components/home/BestSeller";

export default function Home() {
  return (
    <div className="min-h-screen bg-white ">
      <Hero/>
     <About/>
     <Category/>
     <BestSeller/>
     <Cta/>
      <Footer/>
    </div>
  );
}
