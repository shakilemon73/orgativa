const items = [
  {
    icon: "verified_user",
    title: "Zero Additives",
    desc: "Strict lab testing ensures purity in every single drop.",
  },
  {
    icon: "tune",
    title: "Artisanal Sourcing",
    desc: "Directly from the world's most sustainable small-batch farms.",
  },
  {
    icon: "eco",
    title: "Planet Positive",
    desc: "Committed to plastic-free packaging and carbon-neutral delivery.",
  },
];

export default function TrustBanner() {
  return (
    <div
      style={{
        backgroundColor: "#EEEEEE",
        padding: "80px 64px",
        borderTop: "1px solid #E8E8E8",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "64px",
        }}
      >
        {items.map((item) => (
          <TrustItem key={item.title} icon={item.icon} title={item.title} desc={item.desc} />
        ))}
      </div>
    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "16px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: hovered ? "rgba(45,90,39,0.08)" : "white",
          border: "1px solid rgba(45,90,39,0.1)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          transition: "background 0.2s",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "30px", color: "#2D5A27" }}>
          {icon}
        </span>
      </div>
      <h4
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          fontWeight: 700,
          color: "#1A1C1C",
          letterSpacing: "0.1em",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "14px",
          color: "rgba(67,72,67,0.7)",
          maxWidth: "260px",
          lineHeight: 1.6,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

import { useState } from "react";
