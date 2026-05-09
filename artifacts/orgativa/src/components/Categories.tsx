import { useState } from "react";
import { useLocation } from "wouter";
import { categories } from "@/data/products";

const P = "#2D5A27";

export default function Categories() {
  const [, navigate] = useLocation();
  return (
    <section style={{ marginTop: "120px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "64px", gap: "12px" }}>
        <span style={{ fontSize: "12px", color: P, textTransform: "uppercase" as const, fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>Nature's Best</span>
        <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "40px", color: "#1A1C1C", textAlign: "center", lineHeight: 1.2, fontWeight: 400 }}>Curated Collections</h2>
        <div style={{ width: "48px", height: "2px", backgroundColor: "rgba(45,90,39,0.4)" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
        {categories.slice(0, 4).map((cat) => (
          <CategoryCard key={cat.slug} label={cat.label} image={cat.image} slug={cat.slug} onClick={() => navigate(`/category/${cat.slug}`)} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ label, image, slug, onClick }: { label: string; image: string; slug: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ cursor: "pointer" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
      <div style={{ aspectRatio: "4/5", overflow: "hidden", borderRadius: "8px", marginBottom: "20px", position: "relative", backgroundColor: "#fafaf9", boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.1)" : "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow 0.5s" }}>
        <img src={image} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "32px", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.7s ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
        <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: "24px", color: hovered ? P : "#1A1C1C", fontWeight: 400, transition: "color 0.2s" }}>{label}</h3>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: hovered ? `1px solid ${P}` : "1px solid #C3C8C1", backgroundColor: hovered ? P : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: hovered ? "white" : "#1A1C1C", transition: "all 0.2s" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
        </div>
      </div>
    </div>
  );
}
