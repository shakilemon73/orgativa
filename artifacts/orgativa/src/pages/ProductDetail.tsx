import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const P = "#2D5A27";
const BG = "#F9F9F9";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`material-symbols-outlined${s <= rating ? " fill" : ""}`}
          style={{ fontSize: size, color: s <= rating ? P : "#C3C8C1" }}>star</span>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
        <Header />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 64px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 32 }}>Product not found</h2>
          <button onClick={() => navigate("/")} style={{ marginTop: 24, background: P, color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  function handleAddToCart() {
    addItem(product!, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
      <Header />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        {/* Breadcrumb */}
        <nav style={{ padding: "24px 0", display: "flex", alignItems: "center", gap: 8 }}>
          {[
            { label: "Home", href: "/" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.name, href: null },
          ].map((crumb, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {crumb.href ? (
                <a href={crumb.href} onClick={(e) => { e.preventDefault(); navigate(crumb.href!); }}
                  style={{ fontSize: 13, color: P, textDecoration: "none", fontFamily: "'Inter', sans-serif" }}>
                  {crumb.label}
                </a>
              ) : (
                <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter', sans-serif" }}>{crumb.label}</span>
              )}
              {i < arr.length - 1 && <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#C3C8C1" }}>chevron_right</span>}
            </span>
          ))}
        </nav>

        {/* Product Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, paddingBottom: 80 }}>
          {/* Image Gallery */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              backgroundColor: "#fff", borderRadius: 16, overflow: "hidden",
              border: "1px solid #E8E8E8", aspectRatio: "1/1",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 48, position: "relative",
            }}>
              {product.badge && (
                <div style={{ position: "absolute", top: 20, left: 20, backgroundColor: P, color: "#fff", padding: "4px 12px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
                  {product.badge}
                </div>
              )}
              <img src={product.images[activeImg]} alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "contain", transition: "opacity 0.3s" }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: 12 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    style={{ width: 80, height: 80, borderRadius: 8, overflow: "hidden", border: i === activeImg ? `2px solid ${P}` : "2px solid #E8E8E8", background: "#F3F3F4", padding: 8, cursor: "pointer", transition: "border 0.2s" }}>
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingTop: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: P, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>{product.category}</span>
                <span style={{ width: 1, height: 12, backgroundColor: "#C3C8C1" }} />
                <span style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
                  {product.origin}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Noto Serif', serif", fontSize: 40, color: "#1A1C1C", lineHeight: 1.2, fontWeight: 400, marginBottom: 16 }}>
                {product.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <StarRating rating={product.rating} size={18} />
                <span style={{ fontSize: 14, color: "#737973", fontFamily: "'Inter', sans-serif" }}>({product.reviews} verified reviews)</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 36, fontWeight: 700, color: "#1A1C1C" }}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: 20, color: "#a8a29e", textDecoration: "line-through", fontFamily: "'Inter', sans-serif" }}>{formatPrice(product.originalPrice)}</span>
                    <span style={{ fontSize: 13, backgroundColor: "#DFF2D8", color: P, padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{discount}% OFF</span>
                  </>
                )}
              </div>
              <p style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>{product.weight}</p>
            </div>

            {/* Description */}
            <p style={{ fontSize: 16, color: "#434843", lineHeight: 1.7, fontFamily: "'Inter', sans-serif", borderLeft: `3px solid ${P}`, paddingLeft: 16 }}>
              {product.description}
            </p>

            {/* Highlights */}
            <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 24, border: "1px solid #E8E8E8" }}>
              <h4 style={{ fontSize: 12, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", color: "#1A1C1C", marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>Product Highlights</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {product.highlights.map((h) => (
                  <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span className="material-symbols-outlined fill" style={{ fontSize: 18, color: P, flexShrink: 0, marginTop: 1 }}>check_circle</span>
                    <span style={{ fontSize: 14, color: "#434843", fontFamily: "'Inter', sans-serif" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1C1C", fontFamily: "'Inter', sans-serif" }}>Quantity</span>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #E8E8E8", borderRadius: 8, overflow: "hidden", backgroundColor: "#fff" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", fontSize: 18, color: "#434843", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>remove</span>
                  </button>
                  <span style={{ width: 48, textAlign: "center", fontSize: 16, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}
                    style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", fontSize: 18, color: "#434843", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
                  </button>
                </div>
                <span style={{ fontSize: 13, color: P, fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                  In stock
                </span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={handleAddToCart}
                  style={{ flex: 1, backgroundColor: added ? "#1a4016" : P, color: "#fff", border: "none", borderRadius: 10, padding: "16px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.3s", letterSpacing: "0.05em" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{added ? "check" : "add_shopping_cart"}</span>
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button onClick={() => { addItem(product, qty); navigate("/checkout"); }}
                  style={{ flex: 1, backgroundColor: "#1A1C1C", color: "#fff", border: "none", borderRadius: 10, padding: "16px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", letterSpacing: "0.05em", transition: "opacity 0.2s" }}>
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { icon: "local_shipping", label: "Free Delivery", sub: "Over ৳1,000" },
                { icon: "replay", label: "Easy Returns", sub: "7-day policy" },
                { icon: "verified_user", label: "Authentic", sub: "100% organic" },
              ].map((b) => (
                <div key={b.label} style={{ backgroundColor: "#fff", borderRadius: 10, padding: "14px 12px", border: "1px solid #E8E8E8", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: P }}>{b.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter', sans-serif" }}>{b.label}</span>
                  <span style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter', sans-serif" }}>{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section style={{ paddingBottom: 96 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 40 }}>
              <span style={{ fontSize: 12, color: P, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>You May Also Like</span>
              <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 32, color: "#1A1C1C", fontWeight: 400 }}>More from {product.category}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function RelatedCard({ product }: { product: (typeof products)[0] }) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();
  return (
    <div className="hover-lift" style={{ backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #E8E8E8", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.slug}`)}>
      <div style={{ aspectRatio: "1/1", backgroundColor: "#F3F3F4", padding: 24, position: "relative", overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s" }} />
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 2, marginBottom: 6 }}><StarRating rating={product.rating} size={13} /></div>
        <h4 style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, color: hovered ? P : "#1A1C1C", fontWeight: 400, marginBottom: 4, transition: "color 0.2s" }}>{product.name}</h4>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 16, fontFamily: "'Inter', sans-serif" }}>{formatPrice(product.price)}</span>
          <button onClick={(e) => { e.stopPropagation(); addItem(product); }}
            style={{ backgroundColor: P, color: "#fff", width: 34, height: 34, borderRadius: 6, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
