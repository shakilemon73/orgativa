import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import AdminLayout from "./AdminLayout";
import { supabase, DbProduct, DbCategory } from "@/lib/supabase";

const P = "#2D5A27";

type FormData = {
  slug: string;
  name: string;
  category_label: string;
  category_slug: string;
  weight: string;
  price: string;
  original_price: string;
  rating: string;
  reviews: string;
  image: string;
  images_raw: string;
  badge: string;
  description: string;
  highlights_raw: string;
  origin: string;
  in_stock: boolean;
  featured: boolean;
  trending: boolean;
  display_order: string;
};

const EMPTY: FormData = {
  slug: "", name: "", category_label: "", category_slug: "", weight: "",
  price: "", original_price: "", rating: "5", reviews: "0",
  image: "", images_raw: "", badge: "", description: "", highlights_raw: "",
  origin: "", in_stock: true, featured: false, trending: false, display_order: "0",
};

const inStyle: React.CSSProperties = {
  width: "100%", border: "1px solid #E8E8E8", borderRadius: 8,
  padding: "10px 14px", fontSize: 14, fontFamily: "'Inter',sans-serif",
  color: "#1A1C1C", outline: "none", boxSizing: "border-box", backgroundColor: "#fff", transition: "border 0.2s",
};

function F({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif" }}>
        {label}{required && <span style={{ color: "#DC2626" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function AdminProductForm() {
  const { id } = useParams<{ id?: string }>();
  const [, navigate] = useLocation();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase!.from("categories").select("*").order("display_order").then(({ data }) => setCategories(data ?? []));
    if (!isEdit) return;
    supabase!.from("products").select("*").eq("id", id).single().then(({ data: p }) => {
      if (!p) return;
      setForm({
        slug: p.slug, name: p.name, category_label: p.category_label, category_slug: p.category_slug,
        weight: p.weight, price: String(p.price), original_price: p.original_price ? String(p.original_price) : "",
        rating: String(p.rating), reviews: String(p.reviews), image: p.image,
        images_raw: p.images.join("\n"), badge: p.badge ?? "", description: p.description,
        highlights_raw: p.highlights.join("\n"), origin: p.origin, in_stock: p.in_stock,
        featured: p.featured, trending: p.trending, display_order: String(p.display_order),
      });
      setLoading(false);
    });
  }, [id]);

  function set(key: keyof FormData, val: any) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload: Record<string, unknown> = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      category_label: form.category_label.trim(),
      category_slug: form.category_slug.trim(),
      weight: form.weight.trim(),
      price: parseInt(form.price) || 0,
      original_price: form.original_price ? parseInt(form.original_price) : null,
      rating: parseInt(form.rating) || 5,
      reviews: parseInt(form.reviews) || 0,
      image: form.image.trim(),
      images: form.images_raw.split("\n").map(s => s.trim()).filter(Boolean),
      badge: form.badge.trim() || null,
      description: form.description.trim(),
      highlights: form.highlights_raw.split("\n").map(s => s.trim()).filter(Boolean),
      origin: form.origin.trim(),
      in_stock: form.in_stock,
      featured: form.featured,
      trending: form.trending,
      display_order: parseInt(form.display_order) || 0,
    };

    if (isEdit) {
      const { error: err } = await supabase!.from("products").update(payload).eq("id", id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase!.from("products").insert(payload);
      if (err) { setError(err.message); setSaving(false); return; }
    }

    navigate("/admin/products");
  }

  if (loading) {
    return (
      <AdminLayout title={isEdit ? "পণ্য সম্পাদনা" : "নতুন পণ্য"}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 32, color: P, animation: "spin 1s linear infinite" }}>progress_activity</span>
        </div>
      </AdminLayout>
    );
  }

  const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };

  return (
    <AdminLayout title={isEdit ? "পণ্য সম্পাদনা" : "নতুন পণ্য যোগ করুন"}>
      <div style={{ maxWidth: 800 }}>
        <button onClick={() => navigate("/admin/products")}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: P, fontSize: 13, fontFamily: "'Inter',sans-serif", marginBottom: 20, fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          পণ্য তালিকায় ফিরুন
        </button>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Basic info */}
          <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 24 }}>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 400, color: "#1A1C1C", margin: "0 0 20px" }}>মূল তথ্য</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={grid2}>
                <F label="পণ্যের নাম" required>
                  <input style={inStyle} value={form.name} required onChange={(e) => { set("name", e.target.value); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]/g, "")); }}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
                <F label="স্লাগ (URL)" required>
                  <input style={inStyle} value={form.slug} required onChange={(e) => set("slug", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
              </div>
              <div style={grid2}>
                <F label="বিভাগ" required>
                  <select style={{ ...inStyle, cursor: "pointer" }} value={form.category_slug}
                    onChange={(e) => { const c = categories.find(x => x.slug === e.target.value); set("category_slug", e.target.value); set("category_label", c?.label ?? ""); }}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}>
                    <option value="">বিভাগ বেছে নিন</option>
                    {categories.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
                  </select>
                </F>
                <F label="ওজন / পরিমাণ" required>
                  <input style={inStyle} value={form.weight} required placeholder="যেমন: ৫০০ গ্রাম নিট"
                    onChange={(e) => set("weight", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
              </div>
              <div style={grid2}>
                <F label="মূল্য (৳)" required>
                  <input style={inStyle} type="number" value={form.price} required min={0} onChange={(e) => set("price", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
                <F label="পূর্বের মূল্য (৳)">
                  <input style={inStyle} type="number" value={form.original_price} min={0} placeholder="ছাড়ের আগের দাম"
                    onChange={(e) => set("original_price", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
              </div>
              <div style={grid2}>
                <F label="রেটিং (১–৫)">
                  <input style={inStyle} type="number" value={form.rating} min={1} max={5} onChange={(e) => set("rating", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
                <F label="রিভিউ সংখ্যা">
                  <input style={inStyle} type="number" value={form.reviews} min={0} onChange={(e) => set("reviews", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
              </div>
              <div style={grid2}>
                <F label="ব্যাজ">
                  <input style={inStyle} value={form.badge} placeholder="যেমন: সেরা বিক্রয়" onChange={(e) => set("badge", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
                <F label="উৎস">
                  <input style={inStyle} value={form.origin} placeholder="যেমন: সুন্দরবন, বাংলাদেশ" onChange={(e) => set("origin", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
                </F>
              </div>
              <F label="বিবরণ" required>
                <textarea style={{ ...inStyle, resize: "vertical", minHeight: 100 }} value={form.description} required onChange={(e) => set("description", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </F>
              <F label="মূল বৈশিষ্ট্য (প্রতি লাইনে একটি)">
                <textarea style={{ ...inStyle, resize: "vertical", minHeight: 100 }} value={form.highlights_raw} placeholder="প্রতি লাইনে একটি বৈশিষ্ট্য লিখুন" onChange={(e) => set("highlights_raw", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </F>
            </div>
          </div>

          {/* Images */}
          <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 24 }}>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 400, color: "#1A1C1C", margin: "0 0 20px" }}>ছবি</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <F label="প্রধান ছবির URL" required>
                <input style={inStyle} value={form.image} required placeholder="https://..." onChange={(e) => set("image", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </F>
              {form.image && (
                <div style={{ width: 80, height: 80, backgroundColor: "#F3F3F4", borderRadius: 8, overflow: "hidden", padding: 8 }}>
                  <img src={form.image} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              )}
              <F label="অতিরিক্ত ছবি (প্রতি লাইনে একটি URL)">
                <textarea style={{ ...inStyle, resize: "vertical", minHeight: 80 }} value={form.images_raw} placeholder="প্রতি লাইনে একটি URL" onChange={(e) => set("images_raw", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </F>
            </div>
          </div>

          {/* Flags */}
          <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 24 }}>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 400, color: "#1A1C1C", margin: "0 0 20px" }}>অবস্থা ও বিকল্প</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
              {([
                ["in_stock",  "স্টকে আছে",     "inventory"],
                ["featured",  "ফিচার্ড",        "star"],
                ["trending",  "ট্রেন্ডিং",      "trending_up"],
              ] as const).map(([key, label, icon]) => (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "10px 14px", border: `1px solid ${form[key] ? P : "#E8E8E8"}`, borderRadius: 10, backgroundColor: form[key] ? "#DFF2D8" : "#fff", transition: "all 0.15s" }}>
                  <input type="checkbox" checked={form[key]} onChange={(e) => set(key, e.target.checked)} style={{ display: "none" }} />
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: form[key] ? P : "#737973" }}>{icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: form[key] ? P : "#434843", fontFamily: "'Inter',sans-serif" }}>{label}</span>
                  {form[key] && <span className="material-symbols-outlined" style={{ fontSize: 16, color: P, marginLeft: "auto" }}>check</span>}
                </label>
              ))}
              <F label="ডিসপ্লে ক্রম">
                <input style={inStyle} type="number" value={form.display_order} min={0} onChange={(e) => set("display_order", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </F>
            </div>
          </div>

          {error && (
            <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#DC2626" }}>error</span>
              <span style={{ fontSize: 13, color: "#DC2626", fontFamily: "'Inter',sans-serif" }}>{error}</span>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" onClick={() => navigate("/admin/products")}
              style={{ padding: "11px 24px", borderRadius: 10, border: "1px solid #E8E8E8", backgroundColor: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "'Inter',sans-serif", color: "#434843" }}>
              বাতিল
            </button>
            <button type="submit" disabled={saving}
              style={{ backgroundColor: saving ? "#C3C8C1" : P, color: "#fff", border: "none", borderRadius: 10, padding: "11px 28px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              {saving ? <span className="material-symbols-outlined" style={{ fontSize: 18, animation: "spin 1s linear infinite" }}>progress_activity</span> : <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>}
              {saving ? "সংরক্ষণ হচ্ছে..." : isEdit ? "পরিবর্তন সংরক্ষণ করুন" : "পণ্য যোগ করুন"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
