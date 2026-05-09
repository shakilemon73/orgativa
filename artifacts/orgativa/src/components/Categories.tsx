const categories = [
  {
    label: "Grocery",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
  },
  {
    label: "Wellness",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z",
  },
  {
    label: "Dry Fruits",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OyRQIUdiUI7it70igzeO1DTJ9YVekCu-ry2N4leQLGGJ2HnFGn6XSMYhcje8nPa_PoQ5FB6g88WYGzb02d37Zq9ir4WXr8GE9D-K1PzV5rUZptriy8g_Vu4EfEvRPZ-YZGgJASwN0dK16Z1y_ObdW6cjCibodpBPVuYhQfTFQZLQEezNI7wMDjY6Dt7wMv6J-Jz9fOqlQo4bB9DLKVJNyleZ6iXTM_vVJPgDhWXmX8PxwfdNM2TBvoAtMbDolXEu0eaewM9PD8WT",
  },
  {
    label: "Honey",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOuWkZmVQOm9mTIlZMs0yKmUQgzUb9t2X-H8Bqcw_jMA19Xg3r9RxZHueHSssW9BEdAsoBE-1ArJfAXM1-bY2LWvli8I6ORJfLjtTxFOojBApcyYIQfdjZ5uddeHETIb79GEcGTw-qqVHRMZ30YjLwjApQcm3xan0Sxjj1_IilIis3b8FT5kKBYije_rX2FLVkWZC5ycakZwHeoev35K-uaTKNMf54GkvnprZvESneoKbefsticw0Q_sGc-cIk2NBSACdii1gSx",
  },
];

export default function Categories() {
  return (
    <section style={{ marginTop: "120px" }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "64px",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#2D5A27",
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.15em",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Nature's Best
        </span>
        <h2
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "40px",
            color: "#1A1C1C",
            textAlign: "center",
            lineHeight: 1.2,
            fontWeight: 400,
          }}
        >
          Curated Collections
        </h2>
        <div
          style={{
            width: "48px",
            height: "2px",
            backgroundColor: "rgba(45,90,39,0.4)",
          }}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.label} label={cat.label} image={cat.image} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ label, image }: { label: string; image: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          aspectRatio: "4 / 5",
          overflow: "hidden",
          borderRadius: "8px",
          marginBottom: "20px",
          position: "relative",
          backgroundColor: "#fafaf9",
          boxShadow: hovered
            ? "0 8px 24px rgba(0,0,0,0.1)"
            : "0 2px 12px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.5s",
        }}
      >
        <img
          src={image}
          alt={label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "32px",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 4px",
        }}
      >
        <h3
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "24px",
            color: hovered ? "#2D5A27" : "#1A1C1C",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
        >
          {label}
        </h3>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: hovered ? "1px solid #2D5A27" : "1px solid #C3C8C1",
            backgroundColor: hovered ? "#2D5A27" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hovered ? "white" : "#1A1C1C",
            transition: "all 0.2s",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
