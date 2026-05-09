import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import TrustBanner from "@/components/TrustBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#F9F9F9", color: "#1A1C1C", minHeight: "100vh" }}>
      <Header />
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 64px" }}>
        <Hero />
        <Categories />
        <Products />
      </main>
      <TrustBanner />
      <Footer />
    </div>
  );
}
