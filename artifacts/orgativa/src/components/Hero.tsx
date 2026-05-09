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

/* ── Decorative botanical SVG — lush tropical leaves ── */
function BotanicalBackground() {
  return (
    <svg
      viewBox="0 0 1280 560"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        {/* Light leaf fill */}
        <linearGradient id="lf1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a8c3e" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2D5A27" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="lf2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6aaf5a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3a7033" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="lf3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2D5A27" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#5aa04e" stopOpacity="0.20" />
        </linearGradient>
      </defs>

      {/* ════════════════════════════════════
          TOP-LEFT  —  large leafy branch
      ════════════════════════════════════ */}

      {/* Main woody stem from top-left corner */}
      <path fill="none" stroke="#2D5A27" strokeWidth="3" strokeLinecap="round" opacity="0.25"
        d="M -30 -20 C 40 30 80 70 120 110 C 160 150 200 160 240 150" />
      {/* Sub-stems */}
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.2"
        d="M 50 40 C 60 10 90 -10 130 -20" />
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.2"
        d="M 95 88 C 100 55 120 30 155 18" />
      <path fill="none" stroke="#2D5A27" strokeWidth="1.5" strokeLinecap="round" opacity="0.18"
        d="M 148 128 C 155 95 175 72 210 62" />

      {/* Big leaf 1 — top-left, pointing up-right */}
      <TropicalLeaf tx={128} ty={-22} rot={40} sc={1.3} grad="lf1" />
      {/* Big leaf 2 */}
      <TropicalLeaf tx={42} ty={30} rot={-15} sc={1.1} grad="lf2" />
      {/* Medium leaf 3 */}
      <TropicalLeaf tx={152} ty={18} rot={65} sc={1.0} grad="lf1" />
      {/* Leaf 4 — sub-stem end */}
      <TropicalLeaf tx={205} ty={60} rot={50} sc={0.9} grad="lf2" />
      {/* Leaf 5 — low on main stem */}
      <TropicalLeaf tx={82} ty={78} rot={20} sc={0.85} grad="lf3" />
      {/* Small accent leaves */}
      <SimpleLeaf tx={-10} ty={55} rot={-30} sc={0.7} />
      <SimpleLeaf tx={170} ty={100} rot={35} sc={0.65} />
      <SimpleLeaf tx={240} ty={145} rot={55} sc={0.6} />


      {/* ════════════════════════════════════
          TOP-RIGHT  —  hanging branch
      ════════════════════════════════════ */}

      <path fill="none" stroke="#2D5A27" strokeWidth="3" strokeLinecap="round" opacity="0.22"
        d="M 1310 -25 C 1240 20 1200 60 1175 110 C 1155 150 1148 180 1140 200" />
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.18"
        d="M 1248 28 C 1210 35 1180 55 1160 80" />
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.18"
        d="M 1200 72 C 1165 75 1148 95 1138 120" />

      {/* Hanging leaves from top-right */}
      <TropicalLeaf tx={1282} ty={-15} rot={-145} sc={1.2} grad="lf1" />
      <TropicalLeaf tx={1240} ty={20} rot={-120} sc={1.1} grad="lf3" />
      <TropicalLeaf tx={1200} ty={55} rot={-100} sc={1.0} grad="lf2" />
      <TropicalLeaf tx={1158} ty={78} rot={-80} sc={0.9} grad="lf1" />
      <TropicalLeaf tx={1140} ty={118} rot={-65} sc={0.85} grad="lf2" />
      <SimpleLeaf tx={1175} ty={150} rot={-55} sc={0.7} />
      <SimpleLeaf tx={1142} ty={185} rot={-40} sc={0.6} />


      {/* ════════════════════════════════════
          BOTTOM-LEFT  —  rising stems
      ════════════════════════════════════ */}

      <path fill="none" stroke="#2D5A27" strokeWidth="3" strokeLinecap="round" opacity="0.22"
        d="M -25 590 C 30 530 70 490 110 450 C 148 412 180 390 210 370" />
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.18"
        d="M 55 528 C 30 490 15 460 10 430" />
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.18"
        d="M 108 462 C 78 435 62 408 58 382" />

      <TropicalLeaf tx={10} ty={425} rot={220} sc={1.1} grad="lf1" />
      <TropicalLeaf tx={55} ty={470} rot={200} sc={0.95} grad="lf3" />
      <TropicalLeaf tx={95} ty={440} rot={185} sc={1.0} grad="lf2" />
      <TropicalLeaf tx={170} ty={378} rot={170} sc={0.9} grad="lf1" />
      <TropicalLeaf tx={50} ty={510} rot={230} sc={0.8} grad="lf2" />
      <SimpleLeaf tx={210} ty={355} rot={155} sc={0.65} />
      <SimpleLeaf tx={135} ty={410} rot={195} sc={0.7} />


      {/* ════════════════════════════════════
          BOTTOM-RIGHT  —  lush cluster
      ════════════════════════════════════ */}

      <path fill="none" stroke="#2D5A27" strokeWidth="3" strokeLinecap="round" opacity="0.22"
        d="M 1310 590 C 1245 535 1205 492 1175 452 C 1148 415 1135 385 1122 360" />
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.18"
        d="M 1238 528 C 1258 492 1270 465 1272 438" />
      <path fill="none" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" opacity="0.18"
        d="M 1182 468 C 1205 440 1215 415 1212 392" />

      <TropicalLeaf tx={1272} ty={432} rot={-30} sc={1.1} grad="lf3" />
      <TropicalLeaf tx={1238} ty={478} rot={-20} sc={1.0} grad="lf1" />
      <TropicalLeaf tx={1188} ty={452} rot={-10} sc={0.95} grad="lf2" />
      <TropicalLeaf tx={1125} ty={360} rot={10} sc={0.9} grad="lf1" />
      <TropicalLeaf tx={1210} ty={390} rot={-45} sc={0.85} grad="lf3" />
      <SimpleLeaf tx={1295} ty={510} rot={-25} sc={0.7} />
      <SimpleLeaf tx={1165} ty={500} rot={5} sc={0.65} />


      {/* ════════════════════════════════════
          MID SCATTERED — small accent leaves
      ════════════════════════════════════ */}
      <SimpleLeaf tx={380} ty={18} rot={55} sc={0.6} />
      <SimpleLeaf tx={520} ty={8} rot={30} sc={0.5} />
      <SimpleLeaf tx={760} ty={14} rot={-40} sc={0.55} />
      <SimpleLeaf tx={910} ty={22} rot={-20} sc={0.5} />
      <SimpleLeaf tx={420} ty={535} rot={220} sc={0.55} />
      <SimpleLeaf tx={640} ty={545} rot={200} sc={0.5} />
      <SimpleLeaf tx={860} ty={530} rot={175} sc={0.52} />

      {/* Tiny pollen dots */}
      {([
        [300,45],[460,30],[620,22],[780,38],[960,28],
        [340,520],[500,540],[700,535],[920,520],[1080,510],
      ] as [number,number][]).map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={2.2} fill="#3a7033" opacity="0.12" />
      ))}
    </svg>
  );
}

/**
 * A realistic tropical leaf with midrib + lateral veins.
 * The leaf base is at (0,0), tip points upward along -Y.
 */
function TropicalLeaf({ tx, ty, rot, sc, grad }: {
  tx: number; ty: number; rot: number; sc: number; grad: string;
}) {
  // Leaf outline: wide oval with pointed tip, notched base
  const outline = "M 0 0 C -8 -8 -28 -28 -32 -55 C -34 -78 -22 -105 0 -120 C 22 -105 34 -78 32 -55 C 28 -28 8 -8 0 0 Z";
  // Midrib
  const midrib = "M 0 0 L 0 -120";
  // Lateral veins (pairs)
  const veins = [
    "M 0 -25 C -14 -30 -22 -35 -28 -42",
    "M 0 -25 C 14 -30 22 -35 28 -42",
    "M 0 -45 C -16 -52 -25 -58 -30 -68",
    "M 0 -45 C 16 -52 25 -58 30 -68",
    "M 0 -65 C -15 -72 -22 -80 -26 -90",
    "M 0 -65 C 15 -72 22 -80 26 -90",
    "M 0 -83 C -10 -90 -15 -98 -16 -106",
    "M 0 -83 C 10 -90 15 -98 16 -106",
  ];
  return (
    <g transform={`translate(${tx},${ty}) rotate(${rot}) scale(${sc})`}>
      {/* Leaf body */}
      <path d={outline} fill={`url(#${grad})`} />
      {/* Leaf border */}
      <path d={outline} fill="none" stroke="#2D5A27" strokeWidth="0.8" opacity="0.35" />
      {/* Midrib */}
      <path d={midrib} fill="none" stroke="#2D5A27" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Veins */}
      {veins.map((v, i) => (
        <path key={i} d={v} fill="none" stroke="#2D5A27" strokeWidth="0.6" opacity="0.2" strokeLinecap="round" />
      ))}
    </g>
  );
}

/**
 * A smaller, simpler oval accent leaf.
 */
function SimpleLeaf({ tx, ty, rot, sc }: { tx: number; ty: number; rot: number; sc: number }) {
  return (
    <g transform={`translate(${tx},${ty}) rotate(${rot}) scale(${sc})`}>
      <path d="M 0 0 C -10 -8 -18 -22 -16 -38 C -14 -52 -6 -60 0 -62 C 6 -60 14 -52 16 -38 C 18 -22 10 -8 0 0 Z"
        fill="#3a7033" opacity="0.18" />
      <path d="M 0 0 C -10 -8 -18 -22 -16 -38 C -14 -52 -6 -60 0 -62 C 6 -60 14 -52 16 -38 C 18 -22 10 -8 0 0 Z"
        fill="none" stroke="#2D5A27" strokeWidth="0.7" opacity="0.28" />
      <path d="M 0 0 L 0 -62" fill="none" stroke="#2D5A27" strokeWidth="0.6" opacity="0.22" strokeLinecap="round" />
      <path d="M 0 -18 C -8 -22 -12 -28 -14 -34" fill="none" stroke="#2D5A27" strokeWidth="0.5" opacity="0.18" strokeLinecap="round" />
      <path d="M 0 -18 C 8 -22 12 -28 14 -34" fill="none" stroke="#2D5A27" strokeWidth="0.5" opacity="0.18" strokeLinecap="round" />
      <path d="M 0 -36 C -7 -40 -10 -46 -11 -52" fill="none" stroke="#2D5A27" strokeWidth="0.5" opacity="0.15" strokeLinecap="round" />
      <path d="M 0 -36 C 7 -40 10 -46 11 -52" fill="none" stroke="#2D5A27" strokeWidth="0.5" opacity="0.15" strokeLinecap="round" />
    </g>
  );
}
