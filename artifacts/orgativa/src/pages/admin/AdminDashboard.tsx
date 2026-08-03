import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/lib/supabase";

const P = "#2D5A27";

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  pending:    { label: "অপেক্ষমাণ",    bg: "#FEF9C3", color: "#92400E" },
  processing: { label: "প্রক্রিয়াকরণ", bg: "#DBEAFE", color: "#1E40AF" },
  shipped:    { label: "শিপ করা হয়েছে", bg: "#DDD6FE", color: "#5B21B6" },
  delivered:  { label: "ডেলিভারি হয়েছে", bg: "#DCFCE7", color: "#166534" },
  cancelled:  { label: "বাতিল",          bg: "#FEE2E2", color: "#991B1B" },
};

function formatBDT(n: number) {
  return "৳" + n.toLocaleString("en-IN");
}

import { products as staticProducts } from "@/data/products";

const demoOrders = [
  { id: "101", order_number: "ORD-9821", customer_name: "রাফাত হোসেন", total: 4250, status: "pending", created_at: new Date().toISOString(), phone: "01712345678", payment_method: "bkash" },
  { id: "102", order_number: "ORD-9820", customer_name: "সুমাইয়া বেগম", total: 3100, status: "processing", created_at: new Date(Date.now() - 3600000 * 2).toISOString(), phone: "01812345679", payment_method: "cod" },
  { id: "103", order_number: "ORD-9819", customer_name: "তানভীর আহমেদ", total: 5800, status: "shipped", created_at: new Date(Date.now() - 3600000 * 5).toISOString(), phone: "01912345680", payment_method: "nagad" },
  { id: "104", order_number: "ORD-9818", customer_name: "নাসরিন সুলতানা", total: 2400, status: "delivered", created_at: new Date(Date.now() - 3600000 * 24).toISOString(), phone: "01612345681", payment_method: "bkash" },
  { id: "105", order_number: "ORD-9817", customer_name: "মাহমুদুল হাসান", total: 1850, status: "delivered", created_at: new Date(Date.now() - 3600000 * 48).toISOString(), phone: "01512345682", payment_method: "cod" },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, pendingOrders: 0, totalProducts: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const applyStatic = () => {
      setStats({
        totalOrders: demoOrders.length,
        revenue: demoOrders.reduce((s, o) => s + o.total, 0),
        pendingOrders: demoOrders.filter(o => o.status === "pending").length,
        totalProducts: staticProducts.length,
      });
      setRecentOrders(demoOrders);
      setLoading(false);
    };

    if (!supabase) {
      applyStatic();
      return;
    }

    Promise.all([
      supabase.from("orders").select("id, total, status, created_at, customer_name, order_number").order("created_at", { ascending: false }).limit(8),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("total, status"),
    ]).then(([ordersRes, productsRes, allOrdersRes]) => {
      const orders = ordersRes.data ?? [];
      const allOrders = allOrdersRes.data ?? [];
      if (allOrders.length === 0) {
        applyStatic();
      } else {
        const revenue = allOrders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
        const pending = allOrders.filter(o => o.status === "pending").length;
        setStats({
          totalOrders: allOrders.length,
          revenue,
          pendingOrders: pending,
          totalProducts: productsRes.count ?? staticProducts.length,
        });
        setRecentOrders(orders);
        setLoading(false);
      }
    }).catch(() => {
      applyStatic();
    });
  }, []);

  const statCards = [
    { icon: "receipt_long",         label: "মোট অর্ডার",    value: stats.totalOrders.toString(),  color: "#2D5A27", bg: "#DFF2D8" },
    { icon: "payments",             label: "মোট রাজস্ব",    value: formatBDT(stats.revenue),      color: "#1E40AF", bg: "#DBEAFE" },
    { icon: "schedule",             label: "মুলতুবি অর্ডার", value: stats.pendingOrders.toString(), color: "#92400E", bg: "#FEF9C3" },
    { icon: "inventory_2",          label: "মোট পণ্য",      value: stats.totalProducts.toString(), color: "#5B21B6", bg: "#DDD6FE" },
  ];

  return (
    <AdminLayout title="ড্যাশবোর্ড">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>স্বাগতম!</p>
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 26, fontWeight: 400, color: "#1A1C1C", margin: 0 }}>অর্গাটিভা অ্যাডমিন ড্যাশবোর্ড</h2>
        </div>

        {/* Stats */}
        <div className="admin-grid-4" style={{ marginBottom: 32 }}>
          {statCards.map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: "20px 22px", display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 44, height: 44, backgroundColor: s.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: s.color }}>{s.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>{s.label}</p>
                {loading ? (
                  <div style={{ width: 60, height: 22, backgroundColor: "#F3F3F4", borderRadius: 6 }} />
                ) : (
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: 0 }}>{s.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="admin-grid-4" style={{ marginBottom: 32 }}>
          {[
            { icon: "add_box",      label: "নতুন পণ্য যোগ করুন",  path: "/admin/products/new" },
            { icon: "receipt_long", label: "অর্ডার দেখুন",        path: "/admin/orders" },
            { icon: "category",     label: "বিভাগ পরিচালনা করুন", path: "/admin/categories" },
            { icon: "settings",     label: "সেটিংস",              path: "/admin/settings" },
          ].map((a) => (
            <button key={a.path} onClick={() => navigate(a.path)}
              style={{ backgroundColor: "#fff", border: "1px solid #E8E8E8", borderRadius: 12, padding: "16px 12px", cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = P; (e.currentTarget as HTMLElement).style.backgroundColor = "#DFF2D8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E8E8"; (e.currentTarget as HTMLElement).style.backgroundColor = "#fff"; }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: P }}>{a.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#434843", fontFamily: "'Inter',sans-serif" }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Recent Orders */}
        <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #E8E8E8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 400, color: "#1A1C1C", margin: 0 }}>সাম্প্রতিক অর্ডার</h3>
            <button onClick={() => navigate("/admin/orders")}
              style={{ fontSize: 12, color: P, fontFamily: "'Inter',sans-serif", background: "none", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              সব দেখুন <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAF8" }}>
                  {["অর্ডার নম্বর", "গ্রাহক", "পরিমাণ", "অবস্থা", "তারিখ", ""].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#737973", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} style={{ padding: "14px 16px" }}>
                          <div style={{ height: 14, backgroundColor: "#F3F3F4", borderRadius: 4, width: j === 0 ? 80 : j === 2 ? 60 : "70%" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 32, textAlign: "center", color: "#737973", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>কোনো অর্ডার নেই।</td>
                  </tr>
                ) : recentOrders.map((order, i) => {
                  const st = STATUS_LABELS[order.status] ?? STATUS_LABELS.pending;
                  return (
                    <tr key={order.id} style={{ borderTop: i > 0 ? "1px solid #F3F3F4" : "none", transition: "background 0.1s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAF8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "")}>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: P, fontFamily: "'Inter',sans-serif" }}>#{order.order_number}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 13, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{order.customer_name}</span>
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
                      <td style={{ padding: "14px 16px" }}>
                        <button onClick={() => navigate(`/admin/orders/${order.id}`)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: P, display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>
                          বিস্তারিত <span className="material-symbols-outlined" style={{ fontSize: 15 }}>chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
