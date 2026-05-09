import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { icon: "shopping_basket", label: "Grocery", slug: "grocery" },
  { icon: "spa", label: "Wellness", slug: "wellness" },
  { icon: "nutrition", label: "Dry Fruit", slug: "dry-fruits" },
  { icon: "hive", label: "Honey", slug: "honey" },
  { icon: "", label: "Spices", slug: "spices" },
  { icon: "", label: "Tea & Coffee", slug: "tea-coffee" },
  { icon: "", label: "Grains", slug: "grains" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [, navigate] = useLocation();

  return (
    <header
      style={{
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid #EEEEEE",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 64px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 0",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <div style={{ flexShrink: 0 }}>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); }}
              style={{
                fontSize: "24px",
                fontFamily: "'Noto Serif', serif",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#2D5A27",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "30px", color: "#2D5A27" }}>eco</span>
              Orgativa
            </a>
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: "576px", padding: "0 32px", position: "relative" }}>
            <input
              type="text"
              placeholder="Search for pure essentials..."
              style={{
                width: "100%",
                backgroundColor: "#f3f3f4",
                border: "none",
                outline: "none",
                padding: "10px 48px",
                fontSize: "14px",
                borderRadius: "999px",
                color: "#1A1C1C",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                boxShadow: "0 0 0 1px rgba(195,200,193,0.3)",
              }}
            />
            <span className="material-symbols-outlined" style={{ position: "absolute", left: "80px", top: "50%", transform: "translateY(-50%)", color: "#a8a29e", fontSize: "20px" }}>search</span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginRight: "16px" }}>
              <IconBtn aria-label="Favorites" icon="favorite" />
              <button
                aria-label="Cart"
                onClick={() => navigate("/cart")}
                style={{ padding: "8px", borderRadius: "50%", background: "none", border: "none", cursor: "pointer", color: "#1A1C1C", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#EEEEEE")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>shopping_basket</span>
                {totalItems > 0 && (
                  <span style={{ position: "absolute", top: "4px", right: "4px", backgroundColor: "#2D5A27", color: "white", fontSize: "9px", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: 700 }}>
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
              <IconBtn aria-label="Account" icon="person" />
            </div>
            <button
              onClick={() => navigate("/category/all")}
              style={{ backgroundColor: "#2D5A27", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(45,90,39,0.2)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(45,90,39,0.3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(45,90,39,0.2)"; }}
            >
              Shop Categories
            </button>
          </div>
        </div>

        {/* Sub-nav */}
        <nav style={{ backgroundColor: "#2D5A27", margin: "0 -64px", padding: "0 64px" }}>
          <ul style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", padding: "12px 0", listStyle: "none" }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink icon={link.icon} label={link.label} slug={link.slug} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function IconBtn({ icon, "aria-label": label }: { icon: string; "aria-label": string }) {
  return (
    <button aria-label={label} style={{ padding: "8px", borderRadius: "50%", background: "none", border: "none", cursor: "pointer", color: "#1A1C1C", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#EEEEEE")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}>
      <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>{icon}</span>
    </button>
  );
}

function NavLink({ icon, label, slug }: { icon: string; label: string; slug: string }) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();
  return (
    <a href={`/category/${slug}`}
      onClick={(e) => { e.preventDefault(); navigate(`/category/${slug}`); }}
      style={{ display: "flex", alignItems: "center", gap: "8px", color: "white", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", textDecoration: "none", borderBottom: hovered ? "2px solid rgba(255,255,255,0.4)" : "2px solid transparent", paddingBottom: "6px", transition: "border-color 0.2s", fontFamily: "'Inter', sans-serif" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: "18px", opacity: 0.9 }}>{icon}</span>}
      <span>{label}</span>
    </a>
  );
}
