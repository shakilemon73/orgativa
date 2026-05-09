import { useState } from "react";
import { useLocation } from "wouter";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

const P = "#2D5A27";

/* ── Tab definitions ── */
const TABS = [
  {
    id: "top-sellers",
    icon: "local_fire_department",
    label: "Top Sellers",
    accent: "#E63946",
    accentBg: "#FEF2F2",
    badge: "HOT",
    description: "Most purchased this week",
    sort: () => [...products].sort((a, b) => b.reviews - a.reviews),
  },
  {
    id: "featured",
    icon: "workspace_premium",
    label: "Featured",
    accent: "#D97706",
    accentBg: "#FFFBEB",
    badge: "PICK",
    description: "Editor's curated selection",
    sort: () =>
      [...products].sort((a, b) => {
        const order = ["Best Seller", "Premium", "Artisanal", "Organic", "Wellness", "Aged"];
        return (order.indexOf(a.badge ?? "") - order.indexOf(b.badge ?? "")) || b.rating - a.rating;
      }),
  },
  {
    id: "promotions",
    icon: "sell",
    label: "Promotions",
    accent: "#7C3AED",
    accentBg: "#F5F3FF",
    badge: "SALE",
    description: "Best deals right now",
    sort: () =>
      [...products]
        .filter((p) => p.originalPrice)
        .sort((a, b) => {
          const discA = a.originalPrice! - a.price;
          const discB = b.originalPrice! - b.price;
          return discB - discA;
        })
        .concat(products.filter((p) => !p.originalPrice)),
  },
] as const;

const RANK_STYLES: Record<number, { bg: string; color: string; border: string; label: string }> = {
  1: { bg: "#FEF08A", color: "#92400E", border: "#FCD34D", label: "🥇" },
  2: { bg: "#E2E8F0", color: "#334155", border: "#CBD5E1", label: "🥈" },
  3: { bg: "#FED7AA", color: "#9A3412", border: "#FDBA74", label: "🥉" },
};

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState<string>("top-sellers");
  const tab = TABS.find((t) => t.id === activeTab)!;
  const ranked = tab.sort().slice(0, 6);
  const top = ranked[0];
  const rest = ranked.slice(1, 6);

  return (
    <section style={{ marginTop: 80 }}>
      {/* ── Section header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: tab.accent }}>trending_up</span>
            <span style={{ fontSize: 11, color: tab.accent, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Inter',sans-serif" }}>Trending Now</span>
          </div>
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 32, color: "#0D1F0B", fontWeight: 400, margin: 0, lineHeight: 1.2 }}>
            What Everyone's Buying
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, backgroundColor: "#F4F7F3", padding: 5, borderRadius: 14, border: "1px solid #E2EDE0" }}>
          {TABS.map((t) => {
            const active = t.id === activeTab;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "9px 18px", borderRadius: 10,
                  backgroundColor: active ? "#fff" : "transparent",
                  border: "none",
                  boxShadow: active ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "'Inter',sans-serif",
                }}>
                <span className="material-symbols-outlined"
                  style={{ fontSize: 16, color: active ? t.accent : "#8FA888" }}>
                  {t.icon}
                </span>
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? "#0D1F0B" : "#6B7B6A", whiteSpace: "nowrap" }}>
                  {t.label}
                </span>
                {active && (
                  <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", backgroundColor: t.accent, borderRadius: 4, padding: "1px 6px", letterSpacing: "0.08em" }}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab description ── */}
      <p style={{ fontSize: 13, color: "#8FA888", fontFamily: "'Inter',sans-serif", margin: "0 0 24px", display: "flex", alignItems: "center", gap: 6 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>info</span>
        {tab.description}
      </p>

      {/* ── Main content: spotlight + ranked list ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20 }}>

        {/* LEFT — #1 Spotlight */}
        <SpotlightCard product={top} rank={1} tab={tab} />

        {/* RIGHT — Ranked rows #2–#6 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rest.map((p, i) => (
            <RankedRow key={p.id} product={p} rank={i + 2} tab={tab} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── #1 Spotlight card ── */
function SpotlightCard({ product: p, rank, tab }: { product: (typeof products)[0]; rank: number; tab: typeof TABS[number] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();
  const rs = RANK_STYLES[rank];
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : null;

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div onClick={() => navigate(`/products/${p.slug}`)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#fff", borderRadius: 18, overflow: "hidden",
        border: `1.5px solid ${hovered ? tab.accent + "40" : "#E8EDE7"}`,
        cursor: "pointer", transition: "all 0.25s",
        boxShadow: hovered ? `0 16px 48px ${tab.accent}18` : "0 2px 12px rgba(0,0,0,0.05)",
        display: "flex", flexDirection: "column",
      }}>

      {/* Image area */}
      <div style={{ position: "relative", backgroundColor: "#F4F9F2", padding: "40px 32px 32px", flexShrink: 0 }}>

        {/* Rank badge */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          backgroundColor: rs?.bg ?? tab.accentBg,
          border: `1.5px solid ${rs?.border ?? tab.accent + "40"}`,
          color: rs?.color ?? tab.accent,
          borderRadius: 10, padding: "5px 12px",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{rs?.label ?? "🏅"}</span>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif" }}>RANK #{rank}</span>
        </div>

        {/* Hot/Sale badge */}
        {discount && (
          <div style={{ position: "absolute", top: 16, right: 16, backgroundColor: tab.accent, color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 800, fontFamily: "'Inter',sans-serif" }}>
            -{discount}% OFF
          </div>
        )}

        <img src={p.image} alt={p.name}
          style={{ width: "100%", height: 200, objectFit: "contain", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s ease" }} />
      </div>

      {/* Info */}
      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <StarRow rating={p.rating} />
          <span style={{ fontSize: 11, color: "#A5B3A3", fontFamily: "'Inter',sans-serif" }}>({p.reviews.toLocaleString()} reviews)</span>
        </div>
        <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, color: hovered ? P : "#0D1F0B", fontWeight: 400, margin: "0 0 4px", transition: "color 0.2s" }}>{p.name}</h3>
        <p style={{ fontSize: 12, color: "#8FA888", fontFamily: "'Inter',sans-serif", margin: "0 0 16px" }}>{p.weight} · {p.origin}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#0D1F0B", fontFamily: "'Inter',sans-serif" }}>{formatPrice(p.price)}</span>
            {p.originalPrice && (
              <span style={{ fontSize: 13, color: "#C3C8C1", textDecoration: "line-through", marginLeft: 8, fontFamily: "'Inter',sans-serif" }}>{formatPrice(p.originalPrice)}</span>
            )}
          </div>
          <button onClick={handleAdd}
            style={{
              backgroundColor: added ? "#1a4016" : tab.accent,
              color: "#fff", border: "none", borderRadius: 10,
              padding: "10px 20px", fontSize: 13, fontWeight: 700,
              fontFamily: "'Inter',sans-serif", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 7,
              transition: "all 0.2s",
              boxShadow: `0 4px 14px ${tab.accent}40`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
            <span className="material-symbols-outlined" style={{ fontSize: 17 }}>{added ? "check" : "add_shopping_cart"}</span>
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Ranked row for #2–#6 ── */
function RankedRow({ product: p, rank, tab }: { product: (typeof products)[0]; rank: number; tab: typeof TABS[number] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const { addItem } = useCart();
  const rs = RANK_STYLES[rank];
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : null;

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div onClick={() => navigate(`/products/${p.slug}`)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#fff", borderRadius: 14,
        border: `1.5px solid ${hovered ? tab.accent + "35" : "#E8EDE7"}`,
        padding: "14px 18px", display: "flex", alignItems: "center", gap: 16,
        cursor: "pointer", transition: "all 0.2s",
        boxShadow: hovered ? `0 6px 24px ${tab.accent}14` : "none",
      }}>

      {/* Rank number */}
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        backgroundColor: rs?.bg ?? "#F4F7F3",
        border: `1.5px solid ${rs?.border ?? "#E2EDE0"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {rs ? (
          <span style={{ fontSize: 18, lineHeight: 1 }}>{rs.label}</span>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 800, color: "#8FA888", fontFamily: "'Inter',sans-serif" }}>#{rank}</span>
        )}
      </div>

      {/* Thumbnail */}
      <div style={{ width: 56, height: 56, borderRadius: 10, backgroundColor: "#F4F9F2", flexShrink: 0, overflow: "hidden", padding: 6 }}>
        <img src={p.image} alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "contain", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.3s" }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: hovered ? P : "#0D1F0B", fontFamily: "'Inter',sans-serif", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.2s" }}>{p.name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StarRow rating={p.rating} size={11} />
          <span style={{ fontSize: 10, color: "#A5B3A3", fontFamily: "'Inter',sans-serif" }}>({p.reviews})</span>
        </div>
      </div>

      {/* Price + discount */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
          {discount && (
            <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", backgroundColor: tab.accent, borderRadius: 4, padding: "1px 6px", fontFamily: "'Inter',sans-serif" }}>-{discount}%</span>
          )}
          <span style={{ fontSize: 15, fontWeight: 700, color: "#0D1F0B", fontFamily: "'Inter',sans-serif" }}>{formatPrice(p.price)}</span>
        </div>
        {p.originalPrice && (
          <span style={{ fontSize: 11, color: "#C3C8C1", textDecoration: "line-through", fontFamily: "'Inter',sans-serif" }}>{formatPrice(p.originalPrice)}</span>
        )}
      </div>

      {/* Add button */}
      <button onClick={handleAdd}
        style={{
          width: 36, height: 36, borderRadius: 8, border: "none",
          backgroundColor: added ? "#1a4016" : hovered ? tab.accent : "#F4F7F3",
          color: hovered || added ? "#fff" : "#8FA888",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s", flexShrink: 0,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.12)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
        <span className="material-symbols-outlined" style={{ fontSize: 17 }}>{added ? "check" : "add"}</span>
      </button>
    </div>
  );
}

function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`material-symbols-outlined${s <= rating ? " fill" : ""}`}
          style={{ fontSize: size, color: s <= rating ? "#F59E0B" : "#E2E8E2" }}>star</span>
      ))}
    </div>
  );
}
