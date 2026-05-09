import { useLocation } from "wouter";

const P = "#2D5A27";

const promos = [
  {
    label: "Flash Deal",
    tag: "30% OFF",
    tagColor: "#D64545",
    title: "Sundarbans Honey",
    sub: "Limited stock · Ends tonight",
    icon: "hive",
    bg: "linear-gradient(135deg, #FFF7ED 0%, #FEE2A0 100%)",
    border: "#F59E0B30",
    slug: "honey",
  },
  {
    label: "New Arrival",
    tag: "Fresh",
    tagColor: P,
    title: "Sylhet Green Tea",
    sub: "First-flush spring harvest",
    icon: "local_cafe",
    bg: "linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)",
    border: "#2D5A2730",
    slug: "tea-coffee",
  },
  {
    label: "Best Seller",
    tag: "#1",
    tagColor: "#7C3AED",
    title: "Rajshahi Mustard Oil",
    sub: "Cold-pressed, stone-ground",
    icon: "oil_barrel",
    bg: "linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)",
    border: "#7C3AED30",
    slug: "grocery",
  },
];

export default function PromoStrip() {
  const [, navigate] = useLocation();
  return (
    <section style={{ marginTop: 80 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {promos.map((p) => (
          <PromoCard key={p.title} promo={p} onClick={() => navigate(`/category/${p.slug}`)} />
        ))}
      </div>
    </section>
  );
}

function PromoCard({ promo, onClick }: { promo: typeof promos[0]; onClick: () => void }) {
  return (
    <div onClick={onClick}
      style={{ background: promo.bg, border: `1px solid ${promo.border}`, borderRadius: 16, padding: "24px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20, transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 28, color: promo.tagColor }}>{promo.icon}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: promo.tagColor, fontFamily: "'Inter',sans-serif" }}>{promo.label}</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: promo.tagColor, backgroundColor: `${promo.tagColor}18`, borderRadius: 4, padding: "1px 6px", fontFamily: "'Inter',sans-serif" }}>{promo.tag}</span>
        </div>
        <p style={{ fontSize: 16, fontFamily: "'Noto Serif',serif", fontWeight: 400, color: "#1A1C1C", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{promo.title}</p>
        <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>{promo.sub}</p>
      </div>
      <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#C3C8C1", flexShrink: 0 }}>chevron_right</span>
    </div>
  );
}
