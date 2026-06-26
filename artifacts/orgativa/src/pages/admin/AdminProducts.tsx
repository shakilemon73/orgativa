import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "./AdminLayout";
import { supabase, DbProduct } from "@/lib/supabase";

const P = "#2D5A27";

function formatBDT(n: number) {
  return "৳" + n.toLocaleString("en-IN");
}

export default function AdminProducts() {
  const [, navigate] = useLocation();
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function loadProducts() {
    setLoading(true);
    const { data } = await supabase!.from("products").select("*").order("display_order");
    setProducts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { loadProducts(); }, []);

  async function toggleStock(id: string, current: boolean) {
    await supabase!.from("products").update({ in_stock: !current }).eq("id", id);
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, in_stock: !current } : p));
    showToast(!current ? "পণ্য স্টকে আছে হিসাবে চিহ্নিত।" : "পণ্য স্টকের বাইরে হিসাবে চিহ্নিত।");
  }

  async function deleteProduct(id: string, name: string) {
    if (!confirm(`"${name}" মুছে ফেলতে চান? এটি পূর্বাবস্থায় ফেরানো যাবে না।`)) return;
    setDeleting(id);
    await supabase!.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
    showToast("পণ্য মুছে ফেলা হয়েছে।");
  }

  const filtered = search
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category_label.includes(search))
    : products;

  return (
    <AdminLayout title="পণ্য">
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, backgroundColor: P, color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontFamily: "'Inter',sans-serif", fontWeight: 600, zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 1100 }}>
        {/* Header row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <span className="material-symbols-outlined" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "#737973" }}>search</span>
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="পণ্য খুঁজুন..."
              style={{ width: "100%", paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: "1px solid #E8E8E8", borderRadius: 10, fontSize: 14, fontFamily: "'Inter',sans-serif", outline: "none", boxSizing: "border-box", backgroundColor: "#fff" }}
            />
          </div>
          <button onClick={() => navigate("/admin/products/new")}
            style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            নতুন পণ্য
          </button>
        </div>

        <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAF8" }}>
                  {["", "পণ্যের নাম", "বিভাগ", "মূল্য", "স্টক", "ফিচার্ড", ""].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#737973", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      {[44, "70%", 80, 60, 50, 50, 80].map((w, j) => (
                        <td key={j} style={{ padding: "12px 16px" }}>
                          {j === 0 ? (
                            <div style={{ width: 44, height: 44, backgroundColor: "#F3F3F4", borderRadius: 8 }} />
                          ) : (
                            <div style={{ height: 14, backgroundColor: "#F3F3F4", borderRadius: 4, width: w }} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#737973", fontFamily: "'Inter',sans-serif" }}>
                      {search ? "কোনো পণ্য পাওয়া যায়নি।" : "এখনো কোনো পণ্য নেই।"}
                    </td>
                  </tr>
                ) : filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: i > 0 ? "1px solid #F3F3F4" : "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAF8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "")}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ width: 48, height: 48, backgroundColor: "#F3F3F4", borderRadius: 8, overflow: "hidden", padding: 6 }}>
                        <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: "0 0 2px" }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>{p.weight}</p>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 12, color: "#434843", fontFamily: "'Inter',sans-serif" }}>{p.category_label}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{formatBDT(p.price)}</span>
                      {p.original_price && (
                        <p style={{ fontSize: 11, color: "#a8a29e", textDecoration: "line-through", fontFamily: "'Inter',sans-serif", margin: 0 }}>{formatBDT(p.original_price)}</p>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button onClick={() => toggleStock(p.id, p.in_stock)}
                        style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif", padding: "3px 10px", borderRadius: 6, border: "none", cursor: "pointer", backgroundColor: p.in_stock ? "#DCFCE7" : "#FEE2E2", color: p.in_stock ? "#166534" : "#991B1B" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{p.in_stock ? "check_circle" : "cancel"}</span>
                        {p.in_stock ? "স্টকে আছে" : "স্টক শেষ"}
                      </button>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button onClick={async () => {
                        await supabase!.from("products").update({ featured: !p.featured }).eq("id", p.id);
                        setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, featured: !p.featured } : x));
                      }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontFamily: "'Inter',sans-serif", padding: "3px 10px", borderRadius: 6, border: "1px solid #E8E8E8", cursor: "pointer", backgroundColor: p.featured ? "#FEF9C3" : "#fff", color: p.featured ? "#92400E" : "#737973" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{p.featured ? "star" : "star_border"}</span>
                        {p.featured ? "হ্যাঁ" : "না"}
                      </button>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                          style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E8E8E8", backgroundColor: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#434843" }}>edit</span>
                        </button>
                        <button onClick={() => deleteProduct(p.id, p.name)}
                          disabled={deleting === p.id}
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
          {!loading && (
            <div style={{ padding: "12px 20px", borderTop: "1px solid #F3F3F4", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{filtered.length}টি পণ্য</span>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
