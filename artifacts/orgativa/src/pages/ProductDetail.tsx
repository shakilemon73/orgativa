import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { formatPrice } from "@/data/products";
import { useProduct } from "@/lib/supabase-hooks";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useResponsive } from "@/hooks/use-responsive";

const P = "#2D5A27";

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
  const { data: product, loading } = useProduct(slug ?? "");
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  if (loading) {
    return (
      <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
        <Header />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 40, color: "#2D5A27", animation: "spin 1s linear infinite" }}>progress_activity</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
        <Header />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 30 }}>পণ্য পাওয়া যায়নি</h2>
          <button onClick={() => navigate("/")} style={{ marginTop: 20, background: P, color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>হোমে ফিরুন</button>
        </div>
        <Footer />
      </div>
    );
  }

  const related: import("@/data/products").Product[] = [];
  // Note: related products are not loaded here to keep this page simple
  const px = isMobile ? "16px" : isTablet ? "24px" : "64px";

  function handleAddToCart() {
    addItem(product!, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <Header />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${px}` }}>

        {/* Breadcrumb */}
        <nav style={{ padding: "18px 0", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {[
            { label: "হোম", href: "/" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.name, href: null },
          ].map((crumb, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {crumb.href ? (
                <a href={crumb.href} onClick={(e) => { e.preventDefault(); navigate(crumb.href!); }}
                  style={{ fontSize: 12, color: P, textDecoration: "none", fontFamily: "'Inter', sans-serif" }}>
                  {crumb.label}
                </a>
              ) : (
                <span style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: isMobile ? 140 : 300 }}>{crumb.label}</span>
              )}
              {i < arr.length - 1 && <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#C3C8C1" }}>chevron_right</span>}
            </span>
          ))}
        </nav>

        {/* Product layout */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr", gap: isMobile ? 24 : 56, paddingBottom: 64 }}>

          {/* Image gallery */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E8E8E8", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 28 : 48, position: "relative" }}>
              {product.badge && (
                <div style={{ position: "absolute", top: 16, left: 16, backgroundColor: P, color: "#fff", padding: "3px 10px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
                  {product.badge}
                </div>
              )}
              {discount && (
                <div style={{ position: "absolute", top: 16, right: 16, backgroundColor: "#D64545", color: "#fff", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                  -{discount}% ছাড়
                </div>
              )}
              <img src={product.images[activeImg]} alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "contain", transition: "opacity 0.3s" }} />
            </div>
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: 10 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, borderRadius: 8, overflow: "hidden", border: i === activeImg ? `2px solid ${P}` : "2px solid #E8E8E8", background: "#F3F3F4", padding: 7, cursor: "pointer" }}>
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 28, paddingTop: isMobile ? 0 : 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: P, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>{product.category}</span>
                <span style={{ width: 1, height: 12, backgroundColor: "#C3C8C1" }} />
                <span style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 13 }}>location_on</span>
                  {product.origin}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Noto Serif', serif", fontSize: isMobile ? 26 : 40, color: "#1A1C1C", lineHeight: 1.2, fontWeight: 400, marginBottom: 14 }}>
                {product.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                <StarRating rating={product.rating} size={isMobile ? 15 : 18} />
                <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter', sans-serif" }}>({product.reviews} যাচাইকৃত রিভিউ)</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: "#1A1C1C" }}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: isMobile ? 16 : 20, color: "#a8a29e", textDecoration: "line-through", fontFamily: "'Inter', sans-serif" }}>{formatPrice(product.originalPrice)}</span>
                    <span style={{ fontSize: 12, backgroundColor: "#DFF2D8", color: P, padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{discount}% ছাড়</span>
                  </>
                )}
              </div>
              <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>{product.weight}</p>
            </div>

            <p style={{ fontSize: isMobile ? 14 : 16, color: "#434843", lineHeight: 1.7, fontFamily: "'Inter', sans-serif", borderLeft: `3px solid ${P}`, paddingLeft: 16 }}>
              {product.description}
            </p>

            <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: isMobile ? 16 : 22, border: "1px solid #E8E8E8" }}>
              <h4 style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", color: "#1A1C1C", marginBottom: 14, fontFamily: "'Inter', sans-serif" }}>পণ্যের বিশেষত্ব</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {product.highlights.map((h) => (
                  <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span className="material-symbols-outlined fill" style={{ fontSize: 17, color: P, flexShrink: 0, marginTop: 1 }}>check_circle</span>
                    <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter', sans-serif" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Qty + buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1C1C", fontFamily: "'Inter', sans-serif" }}>পরিমাণ</span>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #E8E8E8", borderRadius: 8, overflow: "hidden", backgroundColor: "#fff" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>remove</span>
                  </button>
                  <span style={{ width: 44, textAlign: "center", fontSize: 15, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}
                    style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                  </button>
                </div>
                <span style={{ fontSize: 12, color: P, fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>verified</span>
                  স্টকে আছে
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, flexDirection: isMobile ? "column" : "row" }}>
                <button onClick={handleAddToCart}
                  style={{ flex: 1, backgroundColor: added ? "#1a4016" : P, color: "#fff", border: "none", borderRadius: 10, padding: "15px 20px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.3s" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 19 }}>{added ? "check" : "add_shopping_cart"}</span>
                  {added ? "ঝুড়িতে যোগ হয়েছে!" : "ঝুড়িতে যোগ করুন"}
                </button>
                <button onClick={() => { addItem(product, qty); navigate("/checkout"); }}
                  style={{ flex: 1, backgroundColor: "#1A1C1C", color: "#fff", border: "none", borderRadius: 10, padding: "15px 20px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", letterSpacing: "0.04em" }}>
                  এখনই কিনুন
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: isMobile ? 8 : 12 }}>
              {[
                { icon: "local_shipping", label: "বিনামূল্যে ডেলিভারি", sub: "৳১,০০০+ অর্ডারে" },
                { icon: "replay", label: "সহজ রিটার্ন", sub: "৭ দিনের নীতি" },
                { icon: "verified_user", label: "খাঁটি পণ্য", sub: "১০০% অর্গানিক" },
              ].map((b) => (
                <div key={b.label} style={{ backgroundColor: "#fff", borderRadius: 10, padding: isMobile ? "10px 8px" : "14px 12px", border: "1px solid #E8E8E8", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, textAlign: "center" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: isMobile ? 18 : 22, color: P }}>{b.icon}</span>
                  <span style={{ fontSize: isMobile ? 10 : 12, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter', sans-serif", lineHeight: 1.2 }}>{b.label}</span>
                  <span style={{ fontSize: 10, color: "#737973", fontFamily: "'Inter', sans-serif" }}>{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section style={{ paddingBottom: 72 }}>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 11, color: P, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>আরও দেখুন</span>
              <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: isMobile ? 22 : 32, color: "#1A1C1C", fontWeight: 400, marginTop: 4 }}>{product.category} থেকে আরও পণ্য</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: isMobile ? 12 : 20 }}>
              {related.map((p) => <RelatedCard key={p.id} product={p} compact={isMobile} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function RelatedCard({ product, compact }: { product: import("@/data/products").Product; compact?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();
  return (
    <div className="hover-lift" style={{ backgroundColor: "#fff", borderRadius: compact ? 12 : 14, overflow: "hidden", border: "1px solid #E8E8E8", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.slug}`)}>
      <div style={{ aspectRatio: "1/1", backgroundColor: "#F3F3F4", padding: compact ? 16 : 24, overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s" }} />
      </div>
      <div style={{ padding: compact ? "10px 12px 12px" : "14px 18px" }}>
        <StarRating rating={product.rating} size={12} />
        <h4 style={{ fontFamily: "'Noto Serif', serif", fontSize: compact ? 13 : 16, color: hovered ? P : "#1A1C1C", fontWeight: 400, margin: "4px 0 10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</h4>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: compact ? 14 : 16, fontFamily: "'Inter', sans-serif" }}>{formatPrice(product.price)}</span>
          <button onClick={(e) => { e.stopPropagation(); addItem(product); }}
            style={{ backgroundColor: P, color: "#fff", width: compact ? 30 : 34, height: compact ? 30 : 34, borderRadius: 6, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
