export default function Hero() {
  return (
    <section
      style={{
        marginTop: "64px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "64px",
        padding: "48px 0",
        position: "relative",
        flexWrap: "wrap",
      }}
    >
      {/* Decorative bg */}
      <div
        style={{
          position: "absolute",
          left: "-64px",
          top: 0,
          zIndex: -1,
          pointerEvents: "none",
          opacity: 0.08,
          userSelect: "none",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "240px", color: "#2D5A27", transform: "rotate(-15deg)", display: "block" }}
        >
          eco
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: "-80px",
          bottom: 0,
          zIndex: -1,
          pointerEvents: "none",
          opacity: 0.06,
          userSelect: "none",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "320px", color: "#2D5A27", transform: "rotate(165deg)", display: "block" }}
        >
          eco
        </span>
      </div>

      {/* Left content */}
      <div style={{ flex: 1, minWidth: "320px", display: "flex", flexDirection: "column", gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "rgba(45,90,39,0.4)",
                display: "block",
              }}
            />
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
              Est. 2024 • Pure Sourcing
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              color: "#1A1C1C",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Pure Sourcing. Pure Living.
            <br />
            <span style={{ color: "#2D5A27", fontStyle: "italic" }}>
              100% Organic Essentials
            </span>
          </h1>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              color: "#434843",
              maxWidth: "480px",
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Experience the quiet luxury of nature's finest staples, hand-picked and delivered fresh to your discerning kitchen.
          </p>

          {/* Trust signals */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              paddingTop: "32px",
              borderTop: "1px solid #EEEEEE",
            }}
          >
            {[
              { icon: "verified", label: "Certified Organic" },
              { icon: "energy_savings_leaf", label: "Pesticide Free" },
              { icon: "spa", label: "Nutrient Dense" },
            ].map((item) => (
              <TrustSignal key={item.label} icon={item.icon} label={item.label} />
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <button
            style={{
              backgroundColor: "#2D5A27",
              color: "white",
              padding: "16px 40px",
              fontSize: "14px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              borderRadius: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(45,90,39,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Shop Collections
          </button>
          <a
            href="#"
            style={{
              fontSize: "14px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#2D5A27",
              fontWeight: 500,
              textDecoration: "none",
              borderBottom: "1px solid rgba(45,90,39,0.2)",
              paddingBottom: "4px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = "#2D5A27";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(45,90,39,0.2)";
            }}
          >
            Our Story
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* Right image */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 20px 40px -12px rgba(45,90,39,0.12)",
          aspectRatio: "1.1 / 1",
        }}
      >
        <img
          src="https://lh3.googleusercontent.com/aida/ADBb0ujky7pqsHKf6mY7mM2niJDtET3viqWJNTQ0cspNybryfu0jxR0tTnfcUhzI_gBa-RqrV7HBk7if272TrTPMmXSQVbr2Q1nesbkasL0nK6jtV3jt1F2Z8YGVvU5IVtI0uc_cT9_8NNa3y2MBiChBBINPKAPGnATo18dULnUrMyLDKSa7pQmQgPcSwbo6Ejjk7vbNjE5erLBG7BA-33UxUdIHZOJd93Nk0iBOYP1EKpH3UCGkWaZNoJx71_RShNFE9TUYv8cwkH6L47M"
          alt="Premium organic product arrangement"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: "scale(1.1) translateX(16px)",
            transition: "transform 1.5s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.15) translateX(16px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.1) translateX(16px)";
          }}
        />
      </div>
    </section>
  );
}

function TrustSignal({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
      <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#2D5A27" }}>
        {icon}
      </span>
      <span
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#434843",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}
