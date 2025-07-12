import Footer from "@/components/Footer";
import About from "@/components/home/About";
import Category from "@/components/home/Category";
import Cta from "@/components/home/Cta";
import Hero from "@/components/home/Hero";
import BestSeller from "@/components/home/BestSeller";
import ProductsSlide from "@/components/home/ProductsSlide";

export default function Home() {
  return (
    <div className="min-h-screen bg-white ">
      <Hero/>
     <About/>
     <Category/>
     <ProductsSlide/>
     <BestSeller/>
     <Cta/>
      <Footer/>
    </div>
  );
}
