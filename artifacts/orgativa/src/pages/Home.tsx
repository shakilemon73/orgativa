import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import PromoStrip from "@/components/PromoStrip";
import TrustBanner from "@/components/TrustBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#F9F9F9", color: "#1A1C1C", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#2D5A27", color: "white", textAlign: "center", padding: "9px 16px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
        🌿 Free Delivery on All Orders Over ৳1,000 &nbsp;|&nbsp; 100% Organic Certified &nbsp;|&nbsp; Same-Day Dispatch in Dhaka
      </div>
      <Header />
      <Hero />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <Categories />
        <PromoStrip />
        <Products />
      </div>
      <TrustBanner />
      <Footer />
    </div>
  );
}
