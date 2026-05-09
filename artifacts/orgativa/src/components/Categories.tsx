import { useState } from "react";
import { useLocation } from "wouter";
import { categories } from "@/data/products";

const P = "#2D5A27";

export default function Categories() {
  const [, navigate] = useLocation();

  return (
    <section style={{ marginTop: 80 }}>
      {/* Section header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 11, color: P, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter',sans-serif", margin: "0 0 6px" }}>Nature's Best</p>
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 32, color: "#1A1C1C", fontWeight: 400, margin: 0, lineHeight: 1.2 }}>Shop by Category</h2>
        </div>
        <a href="/category/all" onClick={(e) => { e.preventDefault(); navigate("/category/all"); }}
          style={{ fontSize: 13, color: P, fontFamily: "'Inter',sans-serif", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, borderBottom: "1px solid rgba(45,90,39,0.3)", paddingBottom: 2 }}>
          All categories
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
        </a>
      </div>

      {/* Horizontal scrollable row of pill-style category cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
        {categories.map((cat) => (
          <CategoryPill key={cat.slug} cat={cat} onClick={() => navigate(`/category/${cat.slug}`)} />
        ))}
      </div>

      {/* Large feature cards below */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 20 }}>
        {categories.slice(0, 4).map((cat) => (
          <CategoryFeatureCard key={cat.slug} cat={cat} onClick={() => navigate(`/category/${cat.slug}`)} />
        ))}
      </div>
    </section>
  );
}

function CategoryPill({ cat, onClick }: { cat: typeof categories[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "14px 8px", borderRadius: 12, backgroundColor: hovered ? "#DFF2D8" : "#fff", border: hovered ? `1px solid ${P}` : "1px solid #E8E8E8", cursor: "pointer", transition: "all 0.2s" }}>
      <span className="material-symbols-outlined" style={{ fontSize: 24, color: hovered ? P : "#737973" }}>{cat.icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: hovered ? P : "#434843", fontFamily: "'Inter',sans-serif", textAlign: "center", lineHeight: 1.2 }}>{cat.label}</span>
    </button>
  );
}

function CategoryFeatureCard({ cat, onClick }: { cat: typeof categories[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", borderRadius: 14, overflow: "hidden", backgroundColor: "#fff", border: "1px solid #E8E8E8", transition: "box-shadow 0.3s, transform 0.3s", boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transform: hovered ? "translateY(-4px)" : "translateY(0)" }}>
      <div style={{ aspectRatio: "4/3", backgroundColor: "#F3F3F4", overflow: "hidden", position: "relative" }}>
        <img src={cat.image} alt={cat.label}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "20px", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s ease" }} />
        <div style={{ position: "absolute", top: 10, right: 10, backgroundColor: P, color: "#fff", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
          {cat.count}+ items
        </div>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, color: hovered ? P : "#1A1C1C", fontWeight: 400, transition: "color 0.2s" }}>{cat.label}</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: hovered ? P : "#F3F3F4", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: hovered ? "#fff" : "#737973" }}>arrow_forward</span>
        </div>
      </div>
    </div>
  );
}
