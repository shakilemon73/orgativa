import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useLocation } from "wouter";

const P = "#2D5A27";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!supabase) {
      setError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
    } else {
      navigate("/admin/dashboard");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAF8", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, backgroundColor: P, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#fff" }}>spa</span>
            </div>
            <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, color: "#0D1F0B", fontWeight: 600 }}>Orgativa</span>
          </div>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 26, fontWeight: 400, color: "#1A1C1C", margin: 0 }}>অ্যাডমিন প্যানেল</h1>
          <p style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif", marginTop: 6 }}>আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 8 }}>ইমেইল</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@orgativa.com.bd"
                style={{ width: "100%", border: "1px solid #E8E8E8", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", backgroundColor: "#fff", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = P)}
                onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 8 }}>পাসওয়ার্ড</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ width: "100%", border: "1px solid #E8E8E8", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", backgroundColor: "#fff", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = P)}
                onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}
              />
            </div>

            {error && (
              <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#DC2626" }}>error</span>
                <span style={{ fontSize: 13, color: "#DC2626", fontFamily: "'Inter',sans-serif" }}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: loading ? "#C3C8C1" : P, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {loading ? (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, animation: "spin 1s linear infinite" }}>progress_activity</span>
                  লগইন হচ্ছে...
                </>
              ) : "লগইন করুন"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#A0A5A0", fontFamily: "'Inter',sans-serif", marginTop: 20 }}>
          Orgativa Admin Panel · শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য
        </p>
      </div>
    </div>
  );
}
