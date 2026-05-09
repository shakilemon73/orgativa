import { useState } from "react";
import { useLocation } from "wouter";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

const P = "#2D5A27";

export default function Products() {
  const [, navigate] = useLocation();
  return (
    <section style={{ marginTop: "120px", marginBottom: "96px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: P, textTransform: "uppercase" as const, fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>The Favorites</span>
          <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "40px", color: "#1A1C1C", fontWeight: 400, lineHeight: 1.2 }}>Our Seasonal Favorites</h2>
        </div>
        <a href="/category/all" onClick={(e) => { e.preventDefault(); navigate("/category/all"); }}
          style={{ fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" as const, color: "#434843", fontWeight: 500, textDecoration: "none", border: "1px solid #C3C8C1", padding: "12px 24px", borderRadius: "8px", fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = P; (e.currentTarget as HTMLElement).style.color = P; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#C3C8C1"; (e.currentTarget as HTMLElement).style.color = "#434843"; }}>
          View Collection
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
        {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`material-symbols-outlined${s <= rating ? " fill" : ""}`}
          style={{ fontSize: "14px", color: s <= rating ? P : "#C3C8C1" }}>star</span>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="hover-lift"
      style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", border: "1px solid #E8E8E8", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.slug}`)}>
      <div style={{ aspectRatio: "1/1", backgroundColor: "#F3F3F4", overflow: "hidden", position: "relative", padding: "32px" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.5s ease" }} />
        <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: P, color: "white", padding: "2px 8px", fontSize: "9px", textTransform: "uppercase" as const, fontWeight: 700, letterSpacing: "0.1em", borderRadius: "2px", fontFamily: "'Inter', sans-serif" }}>
          Organic
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: "11px", color: "#a8a29e", marginLeft: "4px", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>({product.reviews})</span>
        </div>
        <h4 style={{ fontFamily: "'Noto Serif', serif", fontSize: "20px", color: hovered ? P : "#1A1C1C", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, fontWeight: 400, transition: "color 0.2s" }}>
          {product.name}
        </h4>
        <p style={{ color: "rgba(67,72,67,0.6)", fontSize: "13px", marginBottom: "24px", fontFamily: "'Inter', sans-serif" }}>{product.weight}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter', sans-serif" }}>{formatPrice(product.price)}</span>
          <button aria-label="Add to cart" onClick={handleAdd}
            style={{ backgroundColor: added ? "#1a4016" : P, color: "white", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(45,90,39,0.3)", transition: "all 0.2s" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{added ? "check" : "add_shopping_cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
