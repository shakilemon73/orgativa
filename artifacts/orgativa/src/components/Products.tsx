import { useState } from "react";
import { useLocation } from "wouter";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

const P = "#2D5A27";

export default function Products() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "honey", label: "Honey" },
    { id: "grocery", label: "Grocery" },
    { id: "dry-fruits", label: "Dry Fruits" },
    { id: "wellness", label: "Wellness" },
  ];

  const filtered = activeTab === "all" ? products : products.filter((p) => p.categorySlug === activeTab);

  return (
    <section style={{ marginTop: 80, marginBottom: 80 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 11, color: P, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter',sans-serif", margin: "0 0 6px" }}>The Favorites</p>
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 32, color: "#1A1C1C", fontWeight: 400, margin: 0, lineHeight: 1.2 }}>Our Seasonal Picks</h2>
        </div>
        <a href="/category/all" onClick={(e) => { e.preventDefault(); navigate("/category/all"); }}
          style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif", fontWeight: 600, textDecoration: "none", border: "1px solid #C3C8C1", borderRadius: 8, padding: "10px 20px", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = P; (e.currentTarget as HTMLElement).style.color = P; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#C3C8C1"; (e.currentTarget as HTMLElement).style.color = "#434843"; }}>
          View all products
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
        </a>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding: "8px 20px", borderRadius: 999, border: activeTab === t.id ? `1.5px solid ${P}` : "1.5px solid #E8E8E8", backgroundColor: activeTab === t.id ? P : "#fff", color: activeTab === t.id ? "#fff" : "#434843", fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
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

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();

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
      style={{ backgroundColor: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #EEEEEE", cursor: "pointer", transition: "box-shadow 0.25s, transform 0.25s", boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transform: hovered ? "translateY(-4px)" : "translateY(0)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.slug}`)}>

      {/* Image area */}
      <div style={{ aspectRatio: "1/1", backgroundColor: "#F8F8F7", overflow: "hidden", position: "relative", padding: "24px" }}>
        <img src={product.image} alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "contain", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s ease" }} />

        {/* Badges */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
          {product.badge && (
            <span style={{ backgroundColor: P, color: "#fff", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 4, fontFamily: "'Inter',sans-serif" }}>{product.badge}</span>
          )}
          {discount && (
            <span style={{ backgroundColor: "#D64545", color: "#fff", fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 4, fontFamily: "'Inter',sans-serif" }}>-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={(e) => e.stopPropagation()}
          style={{ position: "absolute", top: 8, right: 8, width: 32, height: 32, borderRadius: "50%", backgroundColor: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#434843" }}>favorite</span>
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 11, color: "#a8a29e", fontFamily: "'Inter',sans-serif" }}>({product.reviews})</span>
        </div>
        <h4 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, color: hovered ? P : "#1A1C1C", margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 400, transition: "color 0.2s" }}>
          {product.name}
        </h4>
        <p style={{ fontSize: 12, color: "#a8a29e", fontFamily: "'Inter',sans-serif", margin: "0 0 12px" }}>{product.weight}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span style={{ fontSize: 13, color: "#C3C8C1", textDecoration: "line-through", marginLeft: 6, fontFamily: "'Inter',sans-serif" }}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button aria-label="Add to cart" onClick={handleAdd}
            style={{ backgroundColor: added ? "#1a4016" : P, color: "#fff", width: 38, height: 38, borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(45,90,39,0.3)", transition: "all 0.2s", flexShrink: 0 }}
            onMouseEnter={(e) => { if (!added) (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.92)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
            <span className="material-symbols-outlined" style={{ fontSize: 19 }}>{added ? "check" : "add_shopping_cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
