import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import PromoStrip from "@/components/PromoStrip";
import TrendingSection from "@/components/TrendingSection";
import TrustBanner from "@/components/TrustBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#F9F9F9", color: "#1A1C1C", minHeight: "100vh" }}>
      <Header />
      <Hero />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <Categories />
        <PromoStrip />
        <TrendingSection />
        <Products />
      </div>
      <TrustBanner />
      <Footer />
    </div>
  );
}
