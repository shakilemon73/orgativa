import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const P = "#2D5A27";
const DARK = "#0D1F0B";

const NAV = [
  { path: "/admin/dashboard", icon: "dashboard", label: "ড্যাশবোর্ড" },
  { path: "/admin/products", icon: "inventory_2", label: "পণ্য" },
  { path: "/admin/categories", icon: "category", label: "বিভাগ" },
  { path: "/admin/orders", icon: "receipt_long", label: "অর্ডার" },
  { path: "/admin/settings", icon: "settings", label: "সেটিংস" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    if (!supabase) {
      navigate("/admin/login");
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate("/admin/login");
        return;
      }
      setUser({ email: data.user.email ?? "" });
    });
  }, []);

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F7F3" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        backgroundColor: DARK,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: sidebarOpen ? 0 : -240,
        bottom: 0,
        zIndex: 200,
        transition: "left 0.25s",
        boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.25)" : "none",
      }}
        className="admin-sidebar"
      >
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, backgroundColor: P, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#fff" }}>spa</span>
            </div>
            <div>
              <p style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, color: "#fff", fontWeight: 600, margin: 0, lineHeight: 1.2 }}>Orgativa</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter',sans-serif", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
          {NAV.map((item) => {
            const active = location.startsWith(item.path);
            return (
              <button key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", backgroundColor: active ? "rgba(45,90,39,0.25)" : "transparent", cursor: "pointer", textAlign: "left", width: "100%", transition: "background 0.15s" }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: active ? "#9ACA94" : "rgba(255,255,255,0.55)", flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? "#fff" : "rgba(255,255,255,0.65)", fontFamily: "'Inter',sans-serif" }}>{item.label}</span>
                {active && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", backgroundColor: "#9ACA94" }} />}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", marginBottom: 4 }}>
              <div style={{ width: 28, height: 28, backgroundColor: P, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: "#fff", fontFamily: "'Inter',sans-serif", fontWeight: 700 }}>{user.email[0].toUpperCase()}</span>
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{user.email}</span>
            </div>
          )}
          <button onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", backgroundColor: "transparent", cursor: "pointer", width: "100%", transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f87171" }}>logout</span>
            <span style={{ fontSize: 13, color: "#f87171", fontFamily: "'Inter',sans-serif" }}>লগ আউট</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 199 }} />
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: 0 }} className="admin-main">
        {/* Top bar */}
        <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #E8E8E8", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#434843" }}>menu</span>
          </button>
          <div style={{ flex: 1 }}>
            {title && <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 400, color: "#1A1C1C", margin: 0 }}>{title}</h1>}
          </div>
          <button onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "1px solid #E8E8E8", backgroundColor: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "'Inter',sans-serif", color: "#434843" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>storefront</span>
            সাইট দেখুন
          </button>
        </header>

        <main style={{ flex: 1, padding: "28px 28px 48px", overflow: "auto" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .admin-sidebar { left: 0 !important; box-shadow: none !important; }
          .admin-main { margin-left: 240px; }
        }
      `}</style>
    </div>
  );
}
