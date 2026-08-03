import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase, DbCategory } from "@/lib/supabase";

const P = "#2D5A27";

const inStyle: React.CSSProperties = {
  width: "100%", border: "1px solid #E8E8E8", borderRadius: 8,
  padding: "10px 14px", fontSize: 14, fontFamily: "'Inter',sans-serif",
  color: "#1A1C1C", outline: "none", boxSizing: "border-box", backgroundColor: "#fff", transition: "border 0.2s",
};

const EMPTY = { slug: "", label: "", icon: "category", image_url: "", product_count: "0", display_order: "0" };

import { categories as staticCategories } from "@/data/products";

function categoryToDbCategory(c: typeof staticCategories[0], index: number): DbCategory {
  return {
    id: (index + 1).toString(),
    slug: c.slug,
    label: c.label,
    icon: c.icon,
    image_url: c.image,
    product_count: c.count,
    display_order: index + 1,
    created_at: new Date().toISOString(),
  };
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    const staticDbCategories = staticCategories.map(categoryToDbCategory);
    if (!supabase) {
      setCategories(staticDbCategories);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await supabase.from("categories").select("*").order("display_order");
      if (!data || data.length === 0) {
        setCategories(staticDbCategories);
      } else {
        setCategories(data);
      }
    } catch {
      setCategories(staticDbCategories);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startEdit(c: DbCategory) {
    setEditId(c.id);
    setForm({ slug: c.slug, label: c.label, icon: c.icon, image_url: c.image_url ?? "", product_count: String(c.product_count), display_order: String(c.display_order) });
    setShowForm(true);
  }

  function startNew() {
    setEditId(null);
    setForm(EMPTY);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      slug: form.slug.trim(),
      label: form.label.trim(),
      icon: form.icon.trim(),
      image_url: form.image_url.trim() || null,
      product_count: parseInt(form.product_count) || 0,
      display_order: parseInt(form.display_order) || 0,
    };

    if (!supabase) { setSaving(false); return; }
    if (editId) {
      await supabase.from("categories").update(payload).eq("id", editId);
      showToast("বিভাগ আপডেট হয়েছে।");
    } else {
      await supabase.from("categories").insert(payload);
      showToast("নতুন বিভাগ যোগ হয়েছে।");
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function deleteCategory(id: string, label: string) {
    if (!supabase) return;
    if (!confirm(`"${label}" মুছে ফেলতে চান?`)) return;
    await supabase.from("categories").delete().eq("id", id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast("বিভাগ মুছে ফেলা হয়েছে।");
  }

  function set(key: string, val: string) { setForm((prev) => ({ ...prev, [key]: val })); }

  return (
    <AdminLayout title="বিভাগ">
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, backgroundColor: P, color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontFamily: "'Inter',sans-serif", fontWeight: 600, zIndex: 999 }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end", marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={startNew}
            style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            নতুন বিভাগ
          </button>
        </div>

        {/* Modal form */}
        {showForm && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 500, boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 400, color: "#1A1C1C", margin: "0 0 24px" }}>
                {editId ? "বিভাগ সম্পাদনা" : "নতুন বিভাগ"}
              </h3>
              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 6 }}>লেবেল *</label>
                    <input style={inStyle} value={form.label} required onChange={(e) => set("label", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 6 }}>স্লাগ *</label>
                    <input style={inStyle} value={form.slug} required onChange={(e) => set("slug", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 6 }}>আইকন</label>
                    <input style={inStyle} value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="category" onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 6 }}>পণ্য সংখ্যা</label>
                    <input style={inStyle} type="number" min={0} value={form.product_count} onChange={(e) => set("product_count", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 6 }}>ডিসপ্লে ক্রম</label>
                    <input style={inStyle} type="number" min={0} value={form.display_order} onChange={(e) => set("display_order", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif", marginBottom: 6 }}>ছবির URL</label>
                  <input style={inStyle} value={form.image_url} placeholder="https://..." onChange={(e) => set("image_url", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                  <button type="button" onClick={() => setShowForm(false)}
                    style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #E8E8E8", backgroundColor: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "'Inter',sans-serif" }}>
                    বাতিল
                  </button>
                  <button type="submit" disabled={saving}
                    style={{ backgroundColor: saving ? "#C3C8C1" : P, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: saving ? "not-allowed" : "pointer" }}>
                    {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAF8" }}>
                  {["আইকন", "লেবেল", "স্লাগ", "পণ্য সংখ্যা", "ক্রম", ""].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#737973", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {[36, "60%", 80, 50, 40, 80].map((w, j) => (
                        <td key={j} style={{ padding: "12px 16px" }}>
                          {j === 0 ? <div style={{ width: 36, height: 36, backgroundColor: "#F3F3F4", borderRadius: 8 }} /> : <div style={{ height: 14, backgroundColor: "#F3F3F4", borderRadius: 4, width: w }} />}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#737973", fontFamily: "'Inter',sans-serif" }}>কোনো বিভাগ নেই।</td>
                  </tr>
                ) : categories.map((c, i) => (
                  <tr key={c.id} style={{ borderTop: i > 0 ? "1px solid #F3F3F4" : "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAF8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "")}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ width: 36, height: 36, backgroundColor: "#DFF2D8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: P }}>{c.icon}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{c.label}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <code style={{ fontSize: 12, backgroundColor: "#F3F3F4", padding: "2px 8px", borderRadius: 5, fontFamily: "monospace", color: "#434843" }}>{c.slug}</code>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif" }}>{c.product_count}+</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{c.display_order}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => startEdit(c)}
                          style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E8E8E8", backgroundColor: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#434843" }}>edit</span>
                        </button>
                        <button onClick={() => deleteCategory(c.id, c.label)}
                          style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #FEE2E2", backgroundColor: "#FEF2F2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#DC2626" }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
