import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase, DbSiteSetting } from "@/lib/supabase";

const P = "#2D5A27";

const GROUPS: Record<string, string> = {
  delivery: "ডেলিভারি",
  contact:  "যোগাযোগ",
  hero:     "হিরো সেকশন",
  promos:   "প্রমো বার্তা",
  general:  "সাধারণ",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<DbSiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000); }

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.from("site_settings").select("*").order("group_name").then(({ data }) => {
      setSettings(data ?? []);
      const v: Record<string, string> = {};
      (data ?? []).forEach((s) => { v[s.key] = s.value; });
      setValues(v);
      setLoading(false);
    });
  }, []);

  async function saveSetting(key: string) {
    if (!supabase) return;
    setSaving((prev) => ({ ...prev, [key]: true }));
    await supabase.from("site_settings").update({ value: values[key] }).eq("key", key);
    setSaving((prev) => ({ ...prev, [key]: false }));
    showToast("সেটিং সংরক্ষিত হয়েছে।");
  }

  const grouped = settings.reduce((acc, s) => {
    const g = s.group_name || "general";
    if (!acc[g]) acc[g] = [];
    acc[g].push(s);
    return acc;
  }, {} as Record<string, DbSiteSetting[]>);

  const inStyle: React.CSSProperties = {
    flex: 1, border: "1px solid #E8E8E8", borderRadius: 8, padding: "10px 14px",
    fontSize: 14, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", outline: "none",
    backgroundColor: "#fff", transition: "border 0.2s",
  };

  return (
    <AdminLayout title="সেটিংস">
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, backgroundColor: P, color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontFamily: "'Inter',sans-serif", fontWeight: 600, zIndex: 999 }}>{toast}</div>
      )}

      <div style={{ maxWidth: 1080, margin: 0 }}>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 24, marginBottom: 20 }}>
              <div style={{ height: 18, backgroundColor: "#F3F3F4", borderRadius: 6, width: 120, marginBottom: 20 }} />
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} style={{ height: 42, backgroundColor: "#F3F3F4", borderRadius: 8, marginBottom: 12 }} />
              ))}
            </div>
          ))
        ) : (
          Object.entries(grouped).map(([group, items]) => (
            <div key={group} style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", overflow: "hidden", marginBottom: 20 }}>
              <div style={{ padding: "16px 22px", borderBottom: "1px solid #E8E8E8", display: "flex", alignItems: "center", gap: 10 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: P }}>
                  {group === "delivery" ? "local_shipping" : group === "contact" ? "contact_phone" : group === "hero" ? "home" : group === "promos" ? "campaign" : "settings"}
                </span>
                <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 400, color: "#1A1C1C", margin: 0 }}>{GROUPS[group] ?? group}</h3>
              </div>
              <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
                {items.map((s) => (
                  <div key={s.key}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 7 }}>
                      {s.label ?? s.key}
                    </label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {(s.value?.length ?? 0) > 60 ? (
                        <textarea
                          value={values[s.key] ?? ""}
                          onChange={(e) => setValues((prev) => ({ ...prev, [s.key]: e.target.value }))}
                          style={{ ...inStyle, resize: "vertical", minHeight: 72 }}
                          onFocus={(e) => (e.target.style.borderColor = P)}
                          onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}
                        />
                      ) : (
                        <input
                          value={values[s.key] ?? ""}
                          onChange={(e) => setValues((prev) => ({ ...prev, [s.key]: e.target.value }))}
                          style={inStyle}
                          onFocus={(e) => (e.target.style.borderColor = P)}
                          onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}
                        />
                      )}
                      <button
                        onClick={() => saveSetting(s.key)}
                        disabled={saving[s.key]}
                        style={{ backgroundColor: saving[s.key] ? "#C3C8C1" : P, color: "#fff", border: "none", borderRadius: 8, padding: "0 16px", cursor: saving[s.key] ? "not-allowed" : "pointer", fontSize: 13, fontFamily: "'Inter',sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
                        {saving[s.key] ? (
                          <span className="material-symbols-outlined" style={{ fontSize: 16, animation: "spin 1s linear infinite" }}>progress_activity</span>
                        ) : (
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>save</span>
                        )}
                        {saving[s.key] ? "" : "সংরক্ষণ"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Supabase Auth info */}
        <div style={{ backgroundColor: "#EFF6FF", borderRadius: 14, border: "1px solid #BFDBFE", padding: 22 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#1E40AF", flexShrink: 0, marginTop: 2 }}>info</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1E40AF", fontFamily: "'Inter',sans-serif", margin: "0 0 4px" }}>অ্যাডমিন অ্যাকাউন্ট</p>
              <p style={{ fontSize: 13, color: "#1E40AF", fontFamily: "'Inter',sans-serif", lineHeight: 1.6, margin: 0 }}>
                নতুন অ্যাডমিন ব্যবহারকারী যোগ করতে Supabase Dashboard → Authentication → Users → Invite বা Add User ব্যবহার করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
