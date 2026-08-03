import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "./AdminLayout";
import { supabase, DbOrder, OrderStatus } from "@/lib/supabase";

const P = "#2D5A27";

const STATUS_LABELS: Record<OrderStatus, { label: string; bg: string; color: string }> = {
  pending:    { label: "অপেক্ষমাণ",     bg: "#FEF9C3", color: "#92400E" },
  processing: { label: "প্রক্রিয়াকরণ",  bg: "#DBEAFE", color: "#1E40AF" },
  shipped:    { label: "শিপ করা হয়েছে", bg: "#DDD6FE", color: "#5B21B6" },
  delivered:  { label: "ডেলিভারি হয়েছে", bg: "#DCFCE7", color: "#166534" },
  cancelled:  { label: "বাতিল",           bg: "#FEE2E2", color: "#991B1B" },
};

const PAYMENT_LABELS: Record<string, string> = {
  bkash: "bKash", nagad: "Nagad", rocket: "Rocket", cod: "ক্যাশ অন ডেলিভারি", bank: "ব্যাংক ট্রান্সফার",
};

function formatBDT(n: number) { return "৳" + n.toLocaleString("en-IN"); }

export default function AdminOrders() {
  const [, navigate] = useLocation();
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  async function load() {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    let q = supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") q = q.eq("status", statusFilter);
    const { data } = await q;
    setOrders(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [statusFilter]);

  const filtered = search
    ? orders.filter((o) => o.order_number.includes(search) || o.customer_name.includes(search) || o.phone.includes(search))
    : orders;

  const counts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] ?? 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <AdminLayout title="অর্ডার">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Status filter pills */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          {([["all", "সব"] as const, ...Object.entries(STATUS_LABELS).map(([k, v]) => [k as OrderStatus, v.label] as const)]).map(([val, label]) => {
            const active = statusFilter === val;
            const count = val === "all" ? orders.length : (counts[val] ?? 0);
            return (
              <button key={val} onClick={() => setStatusFilter(val)}
                style={{ padding: "7px 14px", borderRadius: 999, border: active ? `1.5px solid ${P}` : "1.5px solid #E8E8E8", backgroundColor: active ? P : "#fff", color: active ? "#fff" : "#434843", fontSize: 12, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                {label}
                {count > 0 && (
                  <span style={{ fontSize: 10, backgroundColor: active ? "rgba(255,255,255,0.25)" : "#F3F3F4", color: active ? "#fff" : "#737973", borderRadius: 99, padding: "0 6px", lineHeight: "18px" }}>{count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <span className="material-symbols-outlined" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "#737973" }}>search</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="অর্ডার নম্বর, গ্রাহকের নাম বা ফোন..."
            style={{ width: "100%", paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: "1px solid #E8E8E8", borderRadius: 10, fontSize: 14, fontFamily: "'Inter',sans-serif", outline: "none", boxSizing: "border-box", backgroundColor: "#fff" }} />
        </div>

        <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAF8" }}>
                  {["অর্ডার নম্বর", "গ্রাহক", "পেমেন্ট", "মোট", "অবস্থা", "তারিখ", ""].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#737973", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} style={{ padding: "14px 16px" }}>
                          <div style={{ height: 14, backgroundColor: "#F3F3F4", borderRadius: 4, width: j === 0 ? 80 : "70%" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#737973", fontFamily: "'Inter',sans-serif" }}>কোনো অর্ডার নেই।</td>
                  </tr>
                ) : filtered.map((order, i) => {
                  const st = STATUS_LABELS[order.status];
                  return (
                    <tr key={order.id} style={{ borderTop: i > 0 ? "1px solid #F3F3F4" : "none", cursor: "pointer" }}
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAF8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "")}>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: P, fontFamily: "'Inter',sans-serif" }}>#{order.order_number}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <p style={{ fontSize: 13, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: 0, fontWeight: 500 }}>{order.customer_name}</p>
                        <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>{order.phone}</p>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 12, color: "#434843", fontFamily: "'Inter',sans-serif" }}>{PAYMENT_LABELS[order.payment_method] ?? order.payment_method}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{formatBDT(order.total)}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: st.color, backgroundColor: st.bg, borderRadius: 6, padding: "3px 8px", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>{st.label}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{new Date(order.created_at).toLocaleDateString("bn-BD")}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => navigate(`/admin/orders/${order.id}`)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: P, display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>
                          বিস্তারিত <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!loading && (
            <div style={{ padding: "12px 20px", borderTop: "1px solid #F3F3F4" }}>
              <span style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{filtered.length}টি অর্ডার</span>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
