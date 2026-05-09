const shopLinks = ["Grocery", "Wellness", "Dry Fruits", "Honey"];
const companyLinks = ["Our Sourcing", "Sustainability", "Artisans", "Impact"];
const legalLinks = ["Privacy Policy", "Terms of Service", "Shipping & Returns"];

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        paddingTop: "80px",
        paddingBottom: "40px",
        paddingLeft: "64px",
        paddingRight: "64px",
        backgroundColor: "#0B2013",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: "80px",
            flexWrap: "wrap",
          }}
        >
          {/* Brand col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <a
              href="#"
              style={{
                fontSize: "28px",
                fontFamily: "'Noto Serif', serif",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "#2D5A27" }}>
                eco
              </span>
              Orgativa
            </a>
            <p
              style={{
                color: "#a8a29e",
                fontSize: "18px",
                lineHeight: 1.6,
                maxWidth: "320px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Sourcing the world's most authentic organic essentials for the discerning palate.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {["language", "mail"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
            }}
          >
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "#737373",
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            © 2024 Orgativa. Crafted for conscious living.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h5
        style={{
          fontSize: "11px",
          color: "#2D5A27",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {title}
      </h5>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              style={{
                color: "#a8a29e",
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#a8a29e";
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
