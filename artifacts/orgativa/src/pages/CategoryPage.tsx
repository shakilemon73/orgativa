import { useState, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { products, categories, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const P = "#2D5A27";
const BG = "#F9F9F9";

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`material-symbols-outlined${s <= rating ? " fill" : ""}`}
          style={{ fontSize: 13, color: s <= rating ? P : "#C3C8C1" }}>star</span>
      ))}
    </div>
  );
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const category = categories.find((c) => c.slug === slug);
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    let list = slug === "all"
      ? products
      : products.filter((p) => p.categorySlug === slug);
    list = list.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [slug, sortBy, maxPrice, minRating]);

  const displayName = category?.label ?? (slug === "all" ? "All Products" : slug);

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
      <Header />

      {/* Category Hero Banner */}
      <div style={{ backgroundColor: "#0B2013", color: "#fff", padding: "56px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
              style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontFamily: "'Inter',sans-serif" }}>Home</a>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>chevron_right</span>
            <span style={{ fontSize: 13, color: "#fff", fontFamily: "'Inter',sans-serif" }}>{displayName}</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {category && (
              <div style={{ width: 56, height: 56, backgroundColor: "rgba(45,90,39,0.3)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 30, color: "#6daf67" }}>{category.icon}</span>
              </div>
            )}
            <div>
              <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 40, fontWeight: 400, color: "#fff", lineHeight: 1.2 }}>{displayName}</h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter',sans-serif", marginTop: 6 }}>
                {filtered.length} products • Hand-picked organic essentials
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 64px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 40, alignItems: "start" }}>

          {/* Sidebar Filters */}
          <aside style={{ position: "sticky", top: 100 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #E8E8E8" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>Filter</h3>
              </div>

              {/* Categories */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #E8E8E8" }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#737973", marginBottom: 14, fontFamily: "'Inter',sans-serif" }}>Categories</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <FilterCatItem label="All Products" slug="all" active={slug === "all"} />
                  {categories.map((c) => (
                    <FilterCatItem key={c.slug} label={c.label} slug={c.slug} active={c.slug === slug} count={c.count} />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #E8E8E8" }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#737973", marginBottom: 14, fontFamily: "'Inter',sans-serif" }}>Max Price</h4>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", color: "#434843" }}>৳0</span>
                  <span style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", color: P, fontWeight: 600 }}>{formatPrice(maxPrice)}</span>
                </div>
                <input type="range" min={500} max={5000} step={100} value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: "100%", accentColor: P }} />
              </div>

              {/* Rating */}
              <div style={{ padding: "20px 24px" }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#737973", marginBottom: 14, fontFamily: "'Inter',sans-serif" }}>Min Rating</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[0, 3, 4, 5].map((r) => (
                    <button key={r} onClick={() => setMinRating(r)}
                      style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 0", textAlign: "left" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${minRating === r ? P : "#C3C8C1"}`, backgroundColor: minRating === r ? P : "transparent", flexShrink: 0 }} />
                      {r === 0
                        ? <span style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", color: "#434843" }}>All ratings</span>
                        : <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map((s) => <span key={s} className={`material-symbols-outlined${s<=r?" fill":""}`} style={{ fontSize: 14, color: s<=r?P:"#C3C8C1" }}>star</span>)}<span style={{ fontSize: 12, color: "#737973", marginLeft: 4, fontFamily: "'Inter',sans-serif" }}>& up</span></div>
                      }
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            {/* Sort Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <span style={{ fontSize: 14, color: "#737973", fontFamily: "'Inter',sans-serif" }}>
                Showing <strong style={{ color: "#1A1C1C" }}>{filtered.length}</strong> results
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  style={{ border: "1px solid #E8E8E8", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontFamily: "'Inter',sans-serif", backgroundColor: "#fff", color: "#1A1C1C", cursor: "pointer", outline: "none" }}>
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#737973", fontFamily: "'Inter',sans-serif" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, display: "block", marginBottom: 16, color: "#C3C8C1" }}>search_off</span>
                <p style={{ fontSize: 16 }}>No products match your filters</p>
                <button onClick={() => { setMaxPrice(5000); setMinRating(0); }} style={{ marginTop: 16, background: P, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 13, fontFamily: "'Inter',sans-serif" }}>Reset Filters</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                {filtered.map((p) => <CategoryProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function FilterCatItem({ label, slug, active, count }: { label: string; slug: string; active: boolean; count?: number }) {
  const [, navigate] = useLocation();
  return (
    <button onClick={() => navigate(slug === "all" ? "/category/all" : `/category/${slug}`)}
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: active ? "#DFF2D8" : "transparent", textAlign: "left", transition: "background 0.15s" }}>
      <span style={{ fontSize: 13, color: active ? P : "#434843", fontWeight: active ? 600 : 400, fontFamily: "'Inter',sans-serif" }}>{label}</span>
      {count !== undefined && <span style={{ fontSize: 11, color: active ? P : "#737973", fontFamily: "'Inter',sans-serif" }}>{count}</span>}
    </button>
  );
}

function CategoryProductCard({ product }: { product: (typeof products)[0] }) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="hover-lift" style={{ backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #E8E8E8", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.slug}`)}>
      <div style={{ aspectRatio: "1/1", backgroundColor: "#F3F3F4", padding: 28, position: "relative", overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s" }} />
        {discount && (
          <div style={{ position: "absolute", top: 12, right: 12, backgroundColor: "#D64545", color: "#fff", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
            -{discount}%
          </div>
        )}
        {product.badge && (
          <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: P, color: "#fff", padding: "3px 10px", borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif" }}>
            {product.badge}
          </div>
        )}
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", gap: 2, marginBottom: 6 }}><StarRating rating={product.rating} /><span style={{ fontSize: 11, color: "#a8a29e", marginLeft: 4, fontFamily: "'Inter',sans-serif" }}>({product.reviews})</span></div>
        <h4 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, color: hovered ? P : "#1A1C1C", fontWeight: 400, marginBottom: 4, transition: "color 0.2s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</h4>
        <p style={{ fontSize: 12, color: "#a8a29e", marginBottom: 14, fontFamily: "'Inter',sans-serif" }}>{product.weight}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 18, fontFamily: "'Inter',sans-serif", color: "#1A1C1C" }}>{formatPrice(product.price)}</span>
            {product.originalPrice && <span style={{ fontSize: 13, color: "#a8a29e", textDecoration: "line-through", marginLeft: 6, fontFamily: "'Inter',sans-serif" }}>{formatPrice(product.originalPrice)}</span>}
          </div>
          <button onClick={(e) => { e.stopPropagation(); addItem(product); }}
            style={{ backgroundColor: P, color: "#fff", width: 36, height: 36, borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(45,90,39,0.25)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
