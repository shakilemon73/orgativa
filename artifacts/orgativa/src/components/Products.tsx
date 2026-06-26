import { useState } from "react";
import { useLocation } from "wouter";
import { formatPrice, type Product } from "@/data/products";
import { useProducts } from "@/lib/supabase-hooks";
import { useCart } from "@/context/CartContext";
import { useResponsive } from "@/hooks/use-responsive";

const P = "#2D5A27";

export default function Products() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const { isMobile, isTablet } = useResponsive();

  const tabs = [
    { id: "all", label: "সব" },
    { id: "honey", label: "মধু" },
    { id: "grocery", label: "মুদিখানা" },
    { id: "dry-fruits", label: "শুকনো ফল" },
    { id: "wellness", label: "স্বাস্থ্য" },
  ];

  const { data: products } = useProducts();
  const filtered = activeTab === "all" ? products : products.filter((p) => p.categorySlug === activeTab);

  return (
    <section style={{ marginTop: isMobile ? 40 : 80, marginBottom: isMobile ? 48 : 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 16 : 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 11, color: P, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter',sans-serif", margin: "0 0 6px" }}>প্রিয় পণ্য</p>
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: isMobile ? 24 : 32, color: "#1A1C1C", fontWeight: 400, margin: 0, lineHeight: 1.2 }}>আমাদের মৌসুমী পছন্দ</h2>
        </div>
        <a href="/category/all" onClick={(e) => { e.preventDefault(); navigate("/category/all"); }}
          style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif", fontWeight: 600, textDecoration: "none", border: "1px solid #C3C8C1", borderRadius: 8, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
          সব পণ্য
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
        </a>
      </div>

      {/* Tabs — horizontal scroll on mobile */}
      <div className="scroll-x" style={{ display: "flex", gap: 8, marginBottom: isMobile ? 16 : 28, paddingBottom: 2 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding: isMobile ? "7px 16px" : "8px 20px", borderRadius: 999, border: activeTab === t.id ? `1.5px solid ${P}` : "1.5px solid #E8E8E8", backgroundColor: activeTab === t.id ? P : "#fff", color: activeTab === t.id ? "#fff" : "#434843", fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", flexShrink: 0 }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4, 1fr)", gap: isMobile ? 12 : 20 }}>
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`material-symbols-outlined${s <= rating ? " fill" : ""}`}
          style={{ fontSize: 13, color: s <= rating ? "#F59E0B" : "#E2E2E2" }}>star</span>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();
  const { isMobile } = useResponsive();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      style={{ backgroundColor: "#fff", borderRadius: isMobile ? 12 : 14, overflow: "hidden", border: "1px solid #EEEEEE", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.25s", boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transform: hovered ? "translateY(-4px)" : "translateY(0)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.slug}`)}>

      <div style={{ aspectRatio: "1/1", backgroundColor: "#F8F8F7", overflow: "hidden", position: "relative", padding: isMobile ? "16px" : "24px" }}>
        <img src={product.image} alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "contain", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s ease" }} />
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {product.badge && (
            <span style={{ backgroundColor: P, color: "#fff", fontSize: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 4, fontFamily: "'Inter',sans-serif" }}>{product.badge}</span>
          )}
          {discount && (
            <span style={{ backgroundColor: "#D64545", color: "#fff", fontSize: 8, fontWeight: 800, padding: "2px 6px", borderRadius: 4, fontFamily: "'Inter',sans-serif" }}>-{discount}%</span>
          )}
        </div>
      </div>

      <div style={{ padding: isMobile ? "10px 12px 12px" : "14px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 10, color: "#a8a29e", fontFamily: "'Inter',sans-serif" }}>({product.reviews})</span>
        </div>
        <h4 style={{ fontFamily: "'Noto Serif',serif", fontSize: isMobile ? 14 : 16, color: hovered ? P : "#1A1C1C", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 400, transition: "color 0.2s" }}>
          {product.name}
        </h4>
        <p style={{ fontSize: 11, color: "#a8a29e", fontFamily: "'Inter',sans-serif", margin: "0 0 10px" }}>{product.weight}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{formatPrice(product.price)}</span>
            {product.originalPrice && !isMobile && (
              <span style={{ fontSize: 12, color: "#C3C8C1", textDecoration: "line-through", marginLeft: 5, fontFamily: "'Inter',sans-serif" }}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button aria-label="ঝুড়িতে যোগ করুন" onClick={handleAdd}
            style={{ backgroundColor: added ? "#1a4016" : P, color: "#fff", width: isMobile ? 34 : 38, height: isMobile ? 34 : 38, borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(45,90,39,0.3)", transition: "all 0.2s", flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 17 }}>{added ? "check" : "add_shopping_cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
