import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import AdminLayout from "./AdminLayout";
import { supabase, DbOrder, DbOrderItem, OrderStatus } from "@/lib/supabase";

const P = "#2D5A27";

const STATUS_FLOW: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];
const STATUS_LABELS: Record<OrderStatus, { label: string; bg: string; color: string; icon: string }> = {
  pending:    { label: "অপেক্ষমাণ",     bg: "#FEF9C3", color: "#92400E", icon: "schedule" },
  processing: { label: "প্রক্রিয়াকরণ",  bg: "#DBEAFE", color: "#1E40AF", icon: "sync" },
  shipped:    { label: "শিপ করা হয়েছে", bg: "#DDD6FE", color: "#5B21B6", icon: "local_shipping" },
  delivered:  { label: "ডেলিভারি হয়েছে", bg: "#DCFCE7", color: "#166534", icon: "check_circle" },
  cancelled:  { label: "বাতিল",           bg: "#FEE2E2", color: "#991B1B", icon: "cancel" },
};
const PAYMENT_LABELS: Record<string, string> = {
  bkash: "bKash", nagad: "Nagad", rocket: "Rocket", cod: "ক্যাশ অন ডেলিভারি", bank: "ব্যাংক ট্রান্সফার",
};

function formatBDT(n: number) { return "৳" + n.toLocaleString("en-IN"); }

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p style={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "#737973", fontFamily: "'Inter',sans-serif", margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontSize: 14, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: 0 }}>{value}</p>
    </div>
  );
}

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [order, setOrder] = useState<DbOrder | null>(null);
  const [items, setItems] = useState<DbOrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000); }

  useEffect(() => {
    Promise.all([
      supabase!.from("orders").select("*").eq("id", id).single(),
      supabase!.from("order_items").select("*").eq("order_id", id),
    ]).then(([orderRes, itemsRes]) => {
      setOrder(orderRes.data ?? null);
      setItems(itemsRes.data ?? []);
      setLoading(false);
    });
  }, [id]);

  async function updateStatus(status: OrderStatus) {
    setUpdatingStatus(true);
    await supabase!.from("orders").update({ status }).eq("id", id);
    setOrder((prev) => prev ? { ...prev, status } : prev);
    showToast(`অবস্থা আপডেট: ${STATUS_LABELS[status].label}`);
    setUpdatingStatus(false);
  }

  if (loading) {
    return (
      <AdminLayout title="অর্ডারের বিস্তারিত">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, color: P, animation: "spin 1s linear infinite" }}>progress_activity</span>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout title="অর্ডার পাওয়া যায়নি">
        <div style={{ textAlign: "center", padding: 60 }}>
          <p style={{ fontSize: 16, color: "#737973", fontFamily: "'Inter',sans-serif" }}>এই অর্ডার নম্বরটি পাওয়া যায়নি।</p>
          <button onClick={() => navigate("/admin/orders")} style={{ marginTop: 16, backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontFamily: "'Inter',sans-serif", cursor: "pointer" }}>ফিরে যান</button>
        </div>
      </AdminLayout>
    );
  }

  const st = STATUS_LABELS[order.status];
  const currentStepIdx = STATUS_FLOW.indexOf(order.status);

  return (
    <AdminLayout title={`অর্ডার #${order.order_number}`}>
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, backgroundColor: P, color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontFamily: "'Inter',sans-serif", fontWeight: 600, zIndex: 999 }}>{toast}</div>
      )}

      <div style={{ maxWidth: 900 }}>
        <button onClick={() => navigate("/admin/orders")}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: P, fontSize: 13, fontFamily: "'Inter',sans-serif", marginBottom: 20, fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          অর্ডার তালিকায় ফিরুন
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>

          {/* Header */}
          <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 22, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>অর্ডার নম্বর</p>
              <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 400, color: "#1A1C1C", margin: "0 0 8px" }}>#{order.order_number}</h2>
              <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>{new Date(order.created_at).toLocaleString("bn-BD")}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: st.color, backgroundColor: st.bg, borderRadius: 8, padding: "5px 12px", fontFamily: "'Inter',sans-serif" }}>{st.label}</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{formatBDT(order.total)}</span>
            </div>
          </div>

          {/* Progress tracker */}
          {order.status !== "cancelled" && (
            <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 22 }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, fontWeight: 400, color: "#1A1C1C", margin: "0 0 20px" }}>অর্ডারের অগ্রগতি</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                {STATUS_FLOW.map((s, i) => {
                  const done = currentStepIdx >= i;
                  const info = STATUS_LABELS[s];
                  return (
                    <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STATUS_FLOW.length - 1 ? 1 : "none" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: done ? P : "#E8E8E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18, color: done ? "#fff" : "#A0A5A0" }}>{info.icon}</span>
                        </div>
                        <span style={{ fontSize: 10, color: done ? P : "#737973", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap", fontWeight: done ? 700 : 400 }}>{info.label}</span>
                      </div>
                      {i < STATUS_FLOW.length - 1 && (
                        <div style={{ flex: 1, height: 2, backgroundColor: currentStepIdx > i ? P : "#E8E8E8", margin: "0 4px", marginBottom: 20 }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Update status */}
          <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 22 }}>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, fontWeight: 400, color: "#1A1C1C", margin: "0 0 16px" }}>অবস্থা পরিবর্তন করুন</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(Object.entries(STATUS_LABELS) as [OrderStatus, typeof STATUS_LABELS[OrderStatus]][]).map(([s, info]) => (
                <button key={s} onClick={() => updateStatus(s)}
                  disabled={order.status === s || updatingStatus}
                  style={{ padding: "7px 14px", borderRadius: 8, border: order.status === s ? `2px solid ${info.color}` : "1px solid #E8E8E8", backgroundColor: order.status === s ? info.bg : "#fff", cursor: order.status === s ? "default" : "pointer", fontSize: 12, fontWeight: order.status === s ? 700 : 500, color: order.status === s ? info.color : "#434843", fontFamily: "'Inter',sans-serif", opacity: updatingStatus ? 0.6 : 1 }}>
                  {info.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Customer info */}
            <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 22 }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, fontWeight: 400, color: "#1A1C1C", margin: "0 0 18px" }}>গ্রাহকের তথ্য</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <InfoItem label="নাম" value={order.customer_name} />
                <InfoItem label="ফোন" value={order.phone} />
                <InfoItem label="ইমেইল" value={order.email} />
                <InfoItem label="বিভাগ" value={order.division} />
                <InfoItem label="জেলা" value={order.district} />
                <InfoItem label="থানা" value={order.thana} />
                <InfoItem label="ঠিকানা" value={order.address} />
                <InfoItem label="পোস্টকোড" value={order.postcode} />
                <InfoItem label="নোট" value={order.notes} />
              </div>
            </div>

            {/* Payment info */}
            <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 22 }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, fontWeight: 400, color: "#1A1C1C", margin: "0 0 18px" }}>পেমেন্টের তথ্য</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <InfoItem label="পেমেন্ট পদ্ধতি" value={PAYMENT_LABELS[order.payment_method] ?? order.payment_method} />
                <InfoItem label="পেমেন্ট নম্বর" value={order.payment_number} />
                <InfoItem label="ট্রানজেকশন আইডি" value={order.transaction_id} />
                <div style={{ borderTop: "1px solid #F3F3F4", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif" }}>উপমোট</span>
                    <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{formatBDT(order.subtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif" }}>ডেলিভারি</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: order.delivery_fee === 0 ? P : "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{order.delivery_fee === 0 ? "বিনামূল্যে" : formatBDT(order.delivery_fee)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #F3F3F4", paddingTop: 8 }}>
                    <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, color: "#1A1C1C" }}>মোট</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{formatBDT(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order items */}
          <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #E8E8E8" }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, fontWeight: 400, color: "#1A1C1C", margin: 0 }}>অর্ডারের পণ্য ({items.length}টি)</h3>
            </div>
            <div style={{ padding: "14px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 14, alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #F3F3F4" }}>
                  <div style={{ width: 52, height: 52, backgroundColor: "#F3F3F4", borderRadius: 8, overflow: "hidden", padding: 6, flexShrink: 0 }}>
                    <img src={item.product_image} alt={item.product_name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product_name}</p>
                    <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>×{item.quantity} · {formatBDT(item.unit_price)} প্রতিটি</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", flexShrink: 0 }}>{formatBDT(item.total_price)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
