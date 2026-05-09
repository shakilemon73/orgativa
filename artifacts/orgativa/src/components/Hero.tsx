import { useLocation } from "wouter";

const P = "#2D5A27";

const heroProducts = [
  {
    name: "Wild Forest Honey",
    price: "৳2,400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7",
  },
  {
    name: "Cold-Pressed Oil",
    price: "৳1,850",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GzOFWh1pgalQi48-L6jXrnrBdcvDxK-Gb2S8CCtBZFhvlX6tSY2Kz_j7uleHESVRHEh2qnBrg-_pdX-Ks_uVdKF5QPfZpif5WE-0yV3F0MmXlPDL9MqfTONTNjX7iazXEden3BKL14y5eckX2gd8w4dug-rDpGiPJIq0JpnVgtv8zQNZ2mKOn1kg3Iisw4JEuaZNxS0M2pjAGoHHG_zXdz9MCZGlp3pmHyrpaZ0fMr2frPb0LRDYEWVdycoyfZpBlnXXx4gm11UX",
  },
  {
    name: "Premium Pistachios",
    price: "৳3,200",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_9aStLOUy3wxdgtym2iJwX-mmsl6jPJD6ecTZT3ziz2Tj-7pVXrqDCQtEOQ1kzc5XZ9Y9EX1rThCwppLb5Ba6F1-DP_5Gj-P6rlShkJGl9-jVC03jtFGxY5OQAGu5T5uN8a7exjnEslKqzIgo2XojJ3Sut175FRnz4WnEjtZRYIDTFSiYFVbuvsJ9GqCw4_PbgqjDXCx8QA7F61_Axk_Oki0NTEjqUGDoqK2smHnSmqtEy_xZKZrNfTpDdaKzmjBG3-bkpQClACP",
  },
  {
    name: "Hand-Churned Ghee",
    price: "৳2,800",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANdJPuajyHXCp7iaCYfSFlXnopP1beP-KgAbmdmX1lt5SMH_C3_9CLD2By3zJ9krkw5PF9Lml-mSOEcTLSfbSkb3Qf5-BiRlT8A_QYfY28tect19CUj5EWHG5_LMQXowf87L424S9yL1awzpv4dLpT9PrXFkcJypZtLB0Zp5E3ovtK7vzAHW5AcmfLKILDwZsvVPYSXiuRO1Yn4MUTCCmm7gzOYg-sd9yHviieYhyrn2p93b--_W8qcR-J1-6HWrVbTZqUfedVRsuE",
  },
];

export default function Hero() {
  const [, navigate] = useLocation();

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0B2013 0%, #1a3a1e 50%, #2D5A27 100%)",
        padding: "0 48px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -80, right: "30%", width: 400, height: 400, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: "15%", width: 300, height: 300, borderRadius: "50%", backgroundColor: "rgba(45,90,39,0.3)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 64, minHeight: 480, position: "relative", zIndex: 1 }}>

        {/* Left: Copy */}
        <div style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "6px 16px", width: "fit-content" }}>
            <span style={{ width: 6, height: 6, backgroundColor: "#6daf67", borderRadius: "50%", display: "block", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "'Inter',sans-serif", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Est. 2024 · Pure Sourcing</span>
          </div>

          <div>
            <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,4.5vw,60px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, margin: 0 }}>
              Pure Sourcing.
              <br />Pure Living.
            </h1>
            <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,4.5vw,60px)", color: "#6daf67", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400, fontStyle: "italic", margin: 0, marginTop: 4 }}>
              100% Organic.
            </h1>
          </div>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 440, lineHeight: 1.7, margin: 0 }}>
            Hand-picked from Bangladesh's finest farms — pesticide-free, lab-certified, delivered to your door.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 32 }}>
            {[["500+", "Products"], ["50K+", "Happy Customers"], ["100%", "Certified"]].map(([num, label]) => (
              <div key={label}>
                <p style={{ fontFamily: "'Noto Serif',serif", fontSize: 24, color: "#fff", fontWeight: 700, margin: 0 }}>{num}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "2px 0 0" }}>{label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/category/all")}
              style={{ backgroundColor: "#fff", color: P, border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 14, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#DFF2D8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#fff"; }}>
              Shop Now
            </button>
            <button onClick={() => navigate("/category/all")}
              style={{ backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "14px 28px", fontSize: 14, fontWeight: 500, fontFamily: "'Inter',sans-serif", cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}>
              Explore Categories
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right: Product collage */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: "40px 0", position: "relative" }}>
          {/* Staggered layout: first col top-aligned, second col bottom-aligned */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 32 }}>
            {heroProducts.slice(0, 2).map((p, i) => (
              <HeroProductCard key={i} product={p} onClick={() => navigate("/category/all")} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 32 }}>
            {heroProducts.slice(2, 4).map((p, i) => (
              <HeroProductCard key={i} product={p} onClick={() => navigate("/category/all")} />
            ))}
          </div>

          {/* Floating badge */}
          <div style={{ position: "absolute", bottom: 52, left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", borderRadius: 12, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", whiteSpace: "nowrap", zIndex: 10 }}>
            <span className="material-symbols-outlined fill" style={{ fontSize: 22, color: "#F59E0B" }}>star</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: 0 }}>4.9 / 5.0 Rating</p>
              <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>From 50,000+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroProductCard({ product, onClick }: { product: (typeof heroProducts)[0]; onClick: () => void }) {
  return (
    <div onClick={onClick}
      style={{ backgroundColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all 0.25s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
      <div style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 10, padding: "16px 12px", marginBottom: 12, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: "'Inter',sans-serif", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#6daf67", fontFamily: "'Inter',sans-serif", margin: 0 }}>{product.price}</p>
    </div>
  );
}
