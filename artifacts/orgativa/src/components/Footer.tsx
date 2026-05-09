import { useLocation } from "wouter";

const P = "#2D5A27";

const shopLinks = [
  { label: "Grocery", slug: "grocery" },
  { label: "Wellness", slug: "wellness" },
  { label: "Dry Fruits", slug: "dry-fruits" },
  { label: "Honey", slug: "honey" },
  { label: "Spices", slug: "spices" },
  { label: "Tea & Coffee", slug: "tea-coffee" },
];
const companyLinks = ["Our Sourcing", "Sustainability", "Artisans", "Impact", "Blog"];
const legalLinks = ["Privacy Policy", "Terms of Service", "Shipping & Returns", "Refund Policy"];

export default function Footer() {
  const [, navigate] = useLocation();
  return (
    <footer style={{ backgroundColor: "#0B2013", color: "#fff" }}>
      {/* Newsletter strip */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "40px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 24, fontWeight: 400, color: "#fff", margin: "0 0 6px" }}>Stay in the know</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter',sans-serif", margin: 0 }}>New arrivals, seasonal picks & exclusive offers — direct to your inbox.</p>
          </div>
          <div style={{ display: "flex", gap: 0, maxWidth: 420, flex: 1, minWidth: 280 }}>
            <input type="email" placeholder="your@email.com"
              style={{ flex: 1, padding: "13px 18px", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "8px 0 0 8px", color: "#fff", fontSize: 14, fontFamily: "'Inter',sans-serif", outline: "none" }} />
            <button style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: "0 8px 8px 0", padding: "13px 24px", fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ padding: "60px 64px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
                style={{ fontFamily: "'Noto Serif',serif", fontSize: 26, fontWeight: 700, color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 26, color: "#6daf67" }}>eco</span>
                Orgativa
              </a>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter',sans-serif", lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
                Bangladesh's premium source for certified organic groceries, wellness products, and farm-fresh essentials.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { icon: "language", label: "Website" },
                  { icon: "mail", label: "Email" },
                  { icon: "phone", label: "Phone" },
                ].map(({ icon, label }) => (
                  <a key={icon} href="#" aria-label={label}
                    style={{ width: 38, height: 38, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 17 }}>{icon}</span>
                  </a>
                ))}
              </div>
              {/* BD Address */}
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 4 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#6daf67", marginTop: 2, flexShrink: 0 }}>location_on</span>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter',sans-serif", lineHeight: 1.6, margin: 0 }}>
                  House 12, Road 5, Block C<br />Bashundhara R/A, Dhaka-1229
                </p>
              </div>
            </div>

            <FooterCol title="Shop" links={shopLinks.map((s) => s.label)} onLink={(label) => { const slug = shopLinks.find((s) => s.label === label)?.slug ?? "all"; navigate(`/category/${slug}`); }} />
            <FooterCol title="Company" links={companyLinks} />
            <FooterCol title="Legal" links={legalLinks} />
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter',sans-serif", margin: 0 }}>
              © 2024 Orgativa. Crafted for conscious living in Bangladesh.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["bKash", "Nagad", "Rocket", "COD"].map((m) => (
                <span key={m} style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter',sans-serif", backgroundColor: "rgba(255,255,255,0.06)", padding: "4px 10px", borderRadius: 4 }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, onLink }: { title: string; links: string[]; onLink?: (l: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h5 style={{ fontSize: 11, color: "#6daf67", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, fontFamily: "'Inter',sans-serif", margin: 0 }}>{title}</h5>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((link) => (
          <li key={link}>
            <a href="#" onClick={(e) => { e.preventDefault(); onLink?.(link); }}
              style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter',sans-serif", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
