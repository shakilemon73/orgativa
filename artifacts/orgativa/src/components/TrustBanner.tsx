const P = "#2D5A27";

const items = [
  { icon: "local_shipping", title: "Free Delivery", desc: "On all orders over ৳1,000 within Bangladesh", color: "#2D5A27" },
  { icon: "verified_user", title: "100% Authentic", desc: "Lab-tested, certified organic. No compromise.", color: "#7C3AED" },
  { icon: "replay", title: "Easy 7-Day Returns", desc: "Not happy? Return hassle-free, no questions asked.", color: "#0891B2" },
  { icon: "support_agent", title: "24/7 Support", desc: "WhatsApp & phone support in Bangla and English.", color: "#D64545" },
];

export default function TrustBanner() {
  return (
    <div style={{ backgroundColor: "#fff", borderTop: "1px solid #EEEEEE", borderBottom: "1px solid #EEEEEE", padding: "40px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {items.map((item) => (
          <TrustItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function TrustItem({ item }: { item: typeof items[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: item.color }}>{item.icon}</span>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: "0 0 3px" }}>{item.title}</p>
        <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
      </div>
    </div>
  );
}
