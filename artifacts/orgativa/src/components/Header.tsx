import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";

const P = "#2D5A27";

const navLinks = [
  { icon: "shopping_basket", label: "Grocery", slug: "grocery" },
  { icon: "spa", label: "Wellness", slug: "wellness" },
  { icon: "nutrition", label: "Dry Fruit", slug: "dry-fruits" },
  { icon: "hive", label: "Honey", slug: "honey" },
  { icon: "local_fire_department", label: "Spices", slug: "spices" },
  { icon: "coffee", label: "Tea & Coffee", slug: "tea-coffee" },
  { icon: "grain", label: "Grains", slug: "grains" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [, navigate] = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header style={{ backgroundColor: "#fff", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 0 #EEEEEE" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        {/* Main header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "14px 0" }}>

          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
            style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700, color: P, display: "flex", alignItems: "center", gap: 6, textDecoration: "none", flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 26, color: P }}>eco</span>
            Orgativa
          </a>

          {/* Search — grows to fill space */}
          <div style={{ flex: 1, maxWidth: 580, position: "relative" }}>
            <span className="material-symbols-outlined"
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 20, color: searchFocused ? P : "#a8a29e", transition: "color 0.2s", pointerEvents: "none" }}>
              search
            </span>
            <input type="text" placeholder="Search organic products, brands..."
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              style={{ width: "100%", padding: "11px 16px 11px 44px", backgroundColor: searchFocused ? "#fff" : "#F3F3F4", border: `1.5px solid ${searchFocused ? P : "transparent"}`, borderRadius: 10, fontSize: 14, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", outline: "none", transition: "border 0.2s, background 0.2s", boxSizing: "border-box" }} />
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
            {/* Wishlist */}
            <HeaderIconBtn icon="favorite_border" label="Wishlist" />

            {/* Cart */}
            <button onClick={() => navigate("/cart")} aria-label="Cart"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px 8px 10px", borderRadius: 10, backgroundColor: "#F3F3F4", border: "none", cursor: "pointer", transition: "background 0.2s", position: "relative" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#DFF2D8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F3F3F4"; }}>
              <div style={{ position: "relative" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#434843" }}>shopping_basket</span>
                {totalItems > 0 && (
                  <span style={{ position: "absolute", top: -5, right: -5, backgroundColor: P, color: "#fff", fontSize: "9px", width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 10, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0, lineHeight: 1 }}>My Cart</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: "2px 0 0" }}>
                  {totalItems === 0 ? "Empty" : `${totalItems} item${totalItems > 1 ? "s" : ""}`}
                </p>
              </div>
            </button>

            {/* Account */}
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px 8px 10px", borderRadius: 10, backgroundColor: P, border: "none", cursor: "pointer", marginLeft: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#fff" }}>person</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", fontFamily: "'Inter',sans-serif", margin: 0, lineHeight: 1 }}>Sign In</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Inter',sans-serif", margin: "2px 0 0" }}>Account</p>
              </div>
            </button>
          </div>
        </div>

        {/* Category nav */}
        <nav style={{ backgroundColor: P, margin: "0 -48px", padding: "0 48px" }}>
          <ul style={{ display: "flex", alignItems: "center", gap: 4, padding: "0", listStyle: "none", margin: 0, overflowX: "auto" }}>
            <li style={{ flexShrink: 0 }}>
              <button onClick={() => navigate("/category/all")}
                style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", padding: "11px 16px", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap", borderRadius: 0, transition: "background 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.15)"; }}>
                <span className="material-symbols-outlined" style={{ fontSize: 17 }}>grid_view</span>
                All Categories
              </button>
            </li>
            <li style={{ width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
            {navLinks.map((link) => (
              <li key={link.slug} style={{ flexShrink: 0 }}>
                <NavItem link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function HeaderIconBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <button aria-label={label}
      style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F3F3F4"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
      <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#434843" }}>{icon}</span>
    </button>
  );
}

function NavItem({ link }: { link: typeof navLinks[0] }) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();
  return (
    <a href={`/category/${link.slug}`}
      onClick={(e) => { e.preventDefault(); navigate(`/category/${link.slug}`); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", padding: "11px 14px", backgroundColor: hovered ? "rgba(255,255,255,0.12)" : "transparent", transition: "background 0.15s", whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif" }}>
      {link.icon && <span className="material-symbols-outlined" style={{ fontSize: 16, opacity: 0.85 }}>{link.icon}</span>}
      {link.label}
    </a>
  );
}
