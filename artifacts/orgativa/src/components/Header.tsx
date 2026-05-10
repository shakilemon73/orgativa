import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";

const P = "#2D5A27";
const P_DARK = "#1a4016";
const P_LIGHT = "#E8F5E3";

const navLinks = [
  { icon: "shopping_basket", label: "মুদিখানা", slug: "grocery" },
  { icon: "spa", label: "স্বাস্থ্য", slug: "wellness" },
  { icon: "nutrition", label: "শুকনো ফল", slug: "dry-fruits" },
  { icon: "hive", label: "মধু", slug: "honey" },
  { icon: "local_fire_department", label: "মশলা", slug: "spices" },
  { icon: "coffee", label: "চা ও কফি", slug: "tea-coffee" },
  { icon: "grain", label: "শস্য", slug: "grains" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      backgroundColor: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "0 1px 0 #EEF2ED",
      transition: "box-shadow 0.3s ease",
    }}>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, height: 72 }}>

          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
            style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0, userSelect: "none" }}>
            <div style={{ width: 36, height: 36, backgroundColor: P, borderRadius: "12px 4px 12px 4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#fff" }}>eco</span>
            </div>
            <div>
              <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 700, color: "#0D1F0B", letterSpacing: "-0.02em", lineHeight: 1 }}>অর্গাটিভা</span>
              <p style={{ fontSize: 9, color: "#8FA888", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>বিশুদ্ধ অর্গানিক</p>
            </div>
          </a>

          <div style={{ width: 1, height: 32, backgroundColor: "#E8EDE7", flexShrink: 0 }} />

          <div style={{
            flex: 1, maxWidth: 540, position: "relative",
            backgroundColor: searchFocused ? "#fff" : "#F4F7F3",
            border: searchFocused ? `2px solid ${P}` : "2px solid transparent",
            borderRadius: 12, display: "flex", alignItems: "center", transition: "all 0.2s",
            boxShadow: searchFocused ? "0 0 0 4px rgba(45,90,39,0.1)" : "none",
          }}>
            <span className="material-symbols-outlined"
              style={{ position: "absolute", left: 13, fontSize: 20, color: searchFocused ? P : "#A5B3A3", transition: "color 0.2s", pointerEvents: "none" }}>
              search
            </span>
            <input type="text" placeholder="পণ্য, বিভাগ, ব্র্যান্ড খুঁজুন…"
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              style={{ width: "100%", padding: "11px 40px 11px 44px", background: "transparent", border: "none", fontSize: 14, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", outline: "none", boxSizing: "border-box" }} />
            <span style={{ position: "absolute", right: 12, fontSize: 10, color: "#A5B3A3", fontFamily: "'Inter',sans-serif", backgroundColor: "#E8EDE7", padding: "2px 7px", borderRadius: 4, fontWeight: 600, display: searchFocused ? "none" : "block" }}>⌘K</span>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ActionButton icon="favorite_border" label="পছন্দতালিকা" onClick={() => {}} />
            <ActionButton icon="person_outline" label="অ্যাকাউন্ট" onClick={() => {}} />
            <div style={{ width: 1, height: 28, backgroundColor: "#E8EDE7" }} />

            <button onClick={() => navigate("/cart")} aria-label={`ঝুড়ি, ${totalItems}টি পণ্য`}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                backgroundColor: totalItems > 0 ? P : "#F4F7F3",
                border: totalItems > 0 ? "none" : "1.5px solid #D7E8D4",
                borderRadius: 12, padding: "9px 16px 9px 12px",
                cursor: "pointer", transition: "all 0.25s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = totalItems > 0 ? P_DARK : P_LIGHT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = totalItems > 0 ? P : "#F4F7F3"; }}>
              <div style={{ position: "relative" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: totalItems > 0 ? "#fff" : "#4A5548" }}>shopping_basket</span>
                {totalItems > 0 && (
                  <span style={{ position: "absolute", top: -6, right: -6, backgroundColor: "#E63946", color: "#fff", fontSize: 9, fontWeight: 800, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif", border: `1.5px solid ${totalItems > 0 ? P : "#fff"}` }}>
                    {totalItems > 9 ? "৯+" : totalItems}
                  </span>
                )}
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 10, color: totalItems > 0 ? "rgba(255,255,255,0.65)" : "#8FA888", fontFamily: "'Inter',sans-serif", margin: 0, lineHeight: 1 }}>আমার ঝুড়ি</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: totalItems > 0 ? "#fff" : "#0D1F0B", fontFamily: "'Inter',sans-serif", margin: "2px 0 0", lineHeight: 1 }}>
                  {totalItems === 0 ? "খালি" : `${totalItems}টি পণ্য`}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: P, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <nav>
            <ul style={{ display: "flex", alignItems: "center", gap: 0, padding: 0, margin: 0, listStyle: "none", overflowX: "auto" }}>
              <li>
                <button onClick={() => navigate("/category/all")}
                  style={{ display: "flex", alignItems: "center", gap: 7, color: "#fff", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", background: "rgba(255,255,255,0.14)", border: "none", cursor: "pointer", padding: "11px 18px", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap", transition: "background 0.15s", borderRight: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.22)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>grid_view</span>
                  সব
                </button>
              </li>
              {navLinks.map((link) => (
                <NavItem key={link.slug} link={link} currentPath={location} />
              ))}
              <li style={{ marginLeft: "auto", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#6daf67", display: "block", flexShrink: 0, boxShadow: "0 0 0 2px rgba(109,175,103,0.35)" }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "'Inter',sans-serif", fontWeight: 600, whiteSpace: "nowrap" }}>৫০০+ অর্গানিক পণ্য</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function ActionButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button aria-label={label} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: 40, height: 40, borderRadius: 10, border: "1.5px solid", borderColor: hovered ? "#C2D9BC" : "transparent", backgroundColor: hovered ? P_LIGHT : "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", gap: 0 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 21, color: hovered ? P : "#4A5548", transition: "color 0.2s" }}>{icon}</span>
    </button>
  );
}

function NavItem({ link, currentPath }: { link: typeof navLinks[0]; currentPath: string }) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();
  const active = currentPath === `/category/${link.slug}`;
  return (
    <li>
      <a href={`/category/${link.slug}`}
        onClick={(e) => { e.preventDefault(); navigate(`/category/${link.slug}`); }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ display: "flex", alignItems: "center", gap: 5, color: active ? "#fff" : "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: active ? 700 : 500, textTransform: "uppercase", letterSpacing: "0.07em", textDecoration: "none", padding: "11px 14px", backgroundColor: active ? "rgba(255,255,255,0.18)" : hovered ? "rgba(255,255,255,0.1)" : "transparent", borderBottom: active ? "2px solid #9ACA94" : "2px solid transparent", transition: "all 0.15s", whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 14, opacity: 0.8 }}>{link.icon}</span>
        {link.label}
      </a>
    </li>
  );
}
