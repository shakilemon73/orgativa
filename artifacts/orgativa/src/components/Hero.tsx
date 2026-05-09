import { useLocation } from "wouter";

const P = "#2D5A27";

const heroProducts = [
  {
    name: "Wild Forest Honey",
    price: "৳2,400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7",
    badge: "Best Seller",
  },
  {
    name: "Premium Pistachios",
    price: "৳3,200",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_9aStLOUy3wxdgtym2iJwX-mmsl6jPJD6ecTZT3ziz2Tj-7pVXrqDCQtEOQ1kzc5XZ9Y9EX1rThCwppLb5Ba6F1-DP_5Gj-P6rlShkJGl9-jVC03jtFGxY5OQAGu5T5uN8a7exjnEslKqzIgo2XojJ3Sut175FRnz4WnEjtZRYIDTFSiYFVbuvsJ9GqCw4_PbgqjDXCx8QA7F61_Axk_Oki0NTEjqUGDoqK2smHnSmqtEy_xZKZrNfTpDdaKzmjBG3-bkpQClACP",
    badge: "Premium",
  },
  {
    name: "Cold-Pressed Oil",
    price: "৳1,850",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GzOFWh1pgalQi48-L6jXrnrBdcvDxK-Gb2S8CCtBZFhvlX6tSY2Kz_j7uleHESVRHEh2qnBrg-_pdX-Ks_uVdKF5QPfZpif5WE-0yV3F0MmXlPDL9MqfTONTNjX7iazXEden3BKL14y5eckX2gd8w4dug-rDpGiPJIq0JpnVgtv8zQNZ2mKOn1kg3Iisw4JEuaZNxS0M2pjAGoHHG_zXdz9MCZGlp3pmHyrpaZ0fMr2frPb0LRDYEWVdycoyfZpBlnXXx4gm11UX",
    badge: "Organic",
  },
  {
    name: "Hand-Churned Ghee",
    price: "৳2,800",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANdJPuajyHXCp7iaCYfSFlXnopP1beP-KgAbmdmX1lt5SMH_C3_9CLD2By3zJ9krkw5PF9Lml-mSOEcTLSfbSkb3Qf5-BiRlT8A_QYfY28tect19CUj5EWHG5_LMQXowf87L424S9yL1awzpv4dLpT9PrXFkcJypZtLB0Zp5E3ovtK7vzAHW5AcmfLKILDwZsvVPYSXiuRO1Yn4MUTCCmm7gzOYg-sd9yHviieYhyrn2p93b--_W8qcR-J1-6HWrVbTZqUfedVRsuE",
    badge: "Artisanal",
  },
];

export default function Hero() {
  const [, navigate] = useLocation();

  return (
    <section style={{ backgroundColor: "#FAFDF7", position: "relative", overflow: "hidden", borderBottom: "1px solid #E8F0E5" }}>

      {/* ── Botanical SVG background ── */}
      <BotanicalBackground />

      {/* ── Main content grid ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", minHeight: 520, position: "relative", zIndex: 2 }}>

        {/* LEFT — Copy */}
        <div style={{ paddingTop: 56, paddingBottom: 56 }}>

          {/* Eyebrow pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#E8F5E3", border: "1.5px solid #C2E0BB", borderRadius: 999, padding: "6px 14px 6px 10px", marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 20, height: 20, lineHeight: "20px", textAlign: "center", fontSize: 14 }}>🌿</span>
            <span style={{ fontSize: 11, color: P, fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Est. 2024 · Pure Sourcing</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(38px,4.2vw,58px)", color: "#0D1F0B", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, margin: "0 0 8px" }}>
            Pure Sourcing.<br />Pure Living.
          </h1>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(38px,4.2vw,58px)", color: P, lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 600, fontStyle: "italic", margin: "0 0 24px" }}>
            100% Organic.
          </h1>

          {/* Body */}
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#4A5548", maxWidth: 420, lineHeight: 1.75, margin: "0 0 32px" }}>
            Hand-picked from Bangladesh's finest farms — pesticide-free, lab-certified, and delivered fresh to your kitchen.
          </p>

          {/* Trust micro-badges */}
          <div style={{ display: "flex", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
            {[
              { icon: "✔", text: "Pesticide Free" },
              { icon: "🏅", text: "Lab Certified" },
              { icon: "🚚", text: "Free Delivery" },
            ].map(({ icon, text }) => (
              <span key={text} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#3A5237", fontFamily: "'Inter',sans-serif", backgroundColor: "#fff", border: "1px solid #D7EDCF", borderRadius: 8, padding: "5px 12px" }}>
                <span style={{ fontSize: 13 }}>{icon}</span>{text}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 0, marginBottom: 40, borderLeft: `3px solid ${P}`, paddingLeft: 20 }}>
            {[["500+", "Products"], ["50K+", "Customers"], ["100%", "Certified"]].map(([num, label], i) => (
              <div key={label} style={{ paddingRight: 28, borderRight: i < 2 ? "1px solid #D7EDCF" : "none", marginRight: i < 2 ? 28 : 0 }}>
                <p style={{ fontFamily: "'Noto Serif',serif", fontSize: 26, color: P, fontWeight: 700, margin: 0, lineHeight: 1 }}>{num}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#8FA888", textTransform: "uppercase", letterSpacing: "0.1em", margin: "4px 0 0" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => navigate("/category/all")}
              style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 14, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: "pointer", letterSpacing: "0.04em", boxShadow: "0 4px 18px rgba(45,90,39,0.35)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1a4016"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = P; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Shop Now
            </button>
            <button onClick={() => navigate("/category/all")}
              style={{ backgroundColor: "transparent", color: P, border: `1.5px solid ${P}`, borderRadius: 10, padding: "14px 28px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 7, transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#E8F5E3"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
              Explore Categories
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>arrow_forward</span>
            </button>
          </div>
        </div>

        {/* RIGHT — Product collage */}
        <div style={{ paddingTop: 32, paddingBottom: 32, position: "relative" }}>

          {/* Decorative ring behind the collage */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, #E8F5E3 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, position: "relative", zIndex: 1 }}>
            {/* Column 1 — top-offset */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 28 }}>
              {heroProducts.slice(0, 2).map((p, i) => (
                <ProductTile key={i} product={p} onClick={() => navigate("/category/all")} />
              ))}
            </div>
            {/* Column 2 — bottom-offset */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 28 }}>
              {heroProducts.slice(2, 4).map((p, i) => (
                <ProductTile key={i} product={p} onClick={() => navigate("/category/all")} />
              ))}
            </div>
          </div>

          {/* Floating rating badge */}
          <div style={{ position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", borderRadius: 14, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(45,90,39,0.15)", border: "1px solid #E8F0E5", whiteSpace: "nowrap", zIndex: 10 }}>
            <div style={{ display: "flex", gap: 1 }}>
              {[1, 2, 3, 4, 5].map((s) => <span key={s} className="material-symbols-outlined fill" style={{ fontSize: 14, color: "#F59E0B" }}>star</span>)}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: 0 }}>4.9 / 5.0 Rating</p>
              <p style={{ fontSize: 10, color: "#8FA888", fontFamily: "'Inter',sans-serif", margin: 0 }}>50,000+ verified reviews</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom accent strip ── */}
      <div style={{ backgroundColor: P, padding: "11px 48px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {[
            { icon: "eco", text: "100% Organically Grown" },
            { icon: "science", text: "Lab-Tested & Certified" },
            { icon: "local_shipping", text: "Free Delivery over ৳1,000" },
            { icon: "handshake", text: "Direct from Farmers" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#9ACA94" }}>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "'Inter',sans-serif", letterSpacing: "0.03em" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

/* ── Product tile component ── */
function ProductTile({ product, onClick }: { product: typeof heroProducts[0]; onClick: () => void }) {
  return (
    <div onClick={onClick}
      style={{ backgroundColor: "#fff", border: "1px solid #E8F0E5", borderRadius: 16, padding: "16px", cursor: "pointer", boxShadow: "0 2px 12px rgba(45,90,39,0.07)", transition: "all 0.25s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(45,90,39,0.14)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(45,90,39,0.07)"; }}>
      <div style={{ backgroundColor: "#F3F9F1", borderRadius: 10, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 12, padding: "12px" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <span style={{ display: "inline-block", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: P, backgroundColor: "#E8F5E3", borderRadius: 4, padding: "2px 7px", marginBottom: 5, fontFamily: "'Inter',sans-serif" }}>{product.badge}</span>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
      <p style={{ fontSize: 14, fontWeight: 700, color: P, fontFamily: "'Inter',sans-serif", margin: 0 }}>{product.price}</p>
    </div>
  );
}

/* ── Decorative botanical SVG ── */
function BotanicalBackground() {
  return (
    <svg
      viewBox="0 0 1280 520"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <style>{`
          .leaf { fill: none; stroke: #2D5A27; stroke-width: 1; opacity: 0.12; }
          .leaf-fill { fill: #2D5A27; opacity: 0.05; }
          .branch { fill: none; stroke: #2D5A27; stroke-width: 1.2; opacity: 0.1; stroke-linecap: round; }
          .dot { fill: #2D5A27; opacity: 0.08; }
        `}</style>
      </defs>

      {/* === TOP-LEFT LARGE BRANCH === */}
      {/* Main stem */}
      <path className="branch" d="M -10 120 Q 80 80 160 140 Q 220 180 260 160" />
      {/* Sub-branches */}
      <path className="branch" d="M 60 100 Q 90 60 130 50" />
      <path className="branch" d="M 110 120 Q 140 85 175 75" />
      <path className="branch" d="M 160 140 Q 185 100 215 90" />

      {/* Leaf cluster top-left */}
      <LeafGroup x={130} y={45} rotate={-30} scale={1} />
      <LeafGroup x={175} y={70} rotate={20} scale={0.8} />
      <LeafGroup x={55} y={90} rotate={-60} scale={0.9} />
      <LeafGroup x={215} y={85} rotate={10} scale={0.75} />

      {/* === TOP-RIGHT HANGING BRANCH === */}
      <path className="branch" d="M 1100 -10 Q 1150 40 1180 100 Q 1200 150 1240 160" />
      <path className="branch" d="M 1120 30 Q 1090 65 1070 90" />
      <path className="branch" d="M 1145 70 Q 1115 100 1100 130" />
      <path className="branch" d="M 1180 100 Q 1145 120  1130 155" />
      <LeafGroup x={1065} y={95} rotate={150} scale={0.85} />
      <LeafGroup x={1098} y={133} rotate={130} scale={0.75} />
      <LeafGroup x={1125} y={155} rotate={160} scale={0.9} />
      <LeafGroup x={1115} y={25} rotate={100} scale={0.7} />

      {/* === BOTTOM-LEFT RISING STEMS === */}
      <path className="branch" d="M -10 480 Q 50 430 100 400 Q 150 370 180 330" />
      <path className="branch" d="M 80 420 Q 55 380 30 360" />
      <path className="branch" d="M 130 385 Q 100 355 85 330" />
      <LeafGroup x={30} y={360} rotate={200} scale={0.8} />
      <LeafGroup x={85} y={330} rotate={220} scale={0.7} />
      <LeafGroup x={180} y={325} rotate={180} scale={0.95} />

      {/* === BOTTOM-RIGHT BOTANICAL === */}
      <path className="branch" d="M 1290 520 Q 1230 470 1190 420 Q 1155 380 1120 370" />
      <path className="branch" d="M 1210 450 Q 1240 410 1260 390" />
      <path className="branch" d="M 1165 400 Q 1195 370 1215 350" />
      <LeafGroup x={1260} y={385} rotate={-20} scale={0.7} />
      <LeafGroup x={1215} y={348} rotate={-45} scale={0.8} />
      <LeafGroup x={1120} y={368} rotate={250} scale={0.9} />

      {/* === CENTER SEPARATOR — subtle fern-like divider === */}
      <path className="branch" d="M 625 0 Q 635 80 630 180 Q 625 280 635 380 Q 640 440 630 520" opacity="0.07" strokeDasharray="4 6" />

      {/* === SCATTERED LEAVES across mid-field === */}
      <LeafGroup x={400} y={30} rotate={70} scale={0.55} />
      <LeafGroup x={820} y={40} rotate={110} scale={0.5} />
      <LeafGroup x={350} y={490} rotate={230} scale={0.6} />
      <LeafGroup x={900} y={480} rotate={310} scale={0.55} />

      {/* === SMALL FLOATING DOTS (pollen/seeds) === */}
      {[
        [200, 60], [320, 90], [480, 45], [700, 30], [850, 70], [1000, 55],
        [270, 460], [450, 500], [780, 490], [1050, 470],
      ].map(([cx, cy], i) => (
        <circle key={i} className="dot" cx={cx} cy={cy} r={2.5} />
      ))}
      {[
        [240, 75], [380, 55], [600, 50], [760, 60], [930, 45],
        [310, 480], [500, 510], [840, 505], [1090, 490],
      ].map(([cx, cy], i) => (
        <circle key={`s${i}`} className="dot" cx={cx} cy={cy} r={1.5} />
      ))}

      {/* === SMALL ACCENT LEAVES scattered === */}
      <SmallLeaf x={305} y={35} rotate={40} />
      <SmallLeaf x={960} y={55} rotate={-30} />
      <SmallLeaf x={430} y={490} rotate={210} />
      <SmallLeaf x={850} y={475} rotate={160} />
      <SmallLeaf x={200} y={260} rotate={80} />
      <SmallLeaf x={1060} y={250} rotate={-70} />
    </svg>
  );
}

/* Renders a cluster of 3 organic leaves around a point */
function LeafGroup({ x, y, rotate, scale }: { x: number; y: number; rotate: number; scale: number }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${s})`}>
      {/* Centre leaf */}
      <path className="leaf-fill" d="M 0 0 C -6 -18 -4 -32 0 -38 C 4 -32 6 -18 0 0 Z" />
      <path className="leaf" d="M 0 0 C -6 -18 -4 -32 0 -38 C 4 -32 6 -18 0 0 Z" />
      <line className="branch" x1="0" y1="0" x2="0" y2="-38" style={{ opacity: 0.15 }} />
      {/* Left leaf */}
      <g transform="rotate(-35) translate(2,0)">
        <path className="leaf-fill" d="M 0 0 C -5 -14 -3 -24 0 -28 C 3 -24 5 -14 0 0 Z" />
        <path className="leaf" d="M 0 0 C -5 -14 -3 -24 0 -28 C 3 -24 5 -14 0 0 Z" />
      </g>
      {/* Right leaf */}
      <g transform="rotate(35) translate(-2,0)">
        <path className="leaf-fill" d="M 0 0 C -5 -14 -3 -24 0 -28 C 3 -24 5 -14 0 0 Z" />
        <path className="leaf" d="M 0 0 C -5 -14 -3 -24 0 -28 C 3 -24 5 -14 0 0 Z" />
      </g>
    </g>
  );
}

/* Single small accent leaf */
function SmallLeaf({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <ellipse className="leaf-fill" cx="0" cy="-10" rx="5" ry="11" />
      <ellipse className="leaf" cx="0" cy="-10" rx="5" ry="11" />
      <line className="branch" x1="0" y1="0" x2="0" y2="-20" style={{ opacity: 0.12 }} />
    </g>
  );
}
