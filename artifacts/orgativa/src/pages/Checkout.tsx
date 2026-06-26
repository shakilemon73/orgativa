import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useResponsive } from "@/hooks/use-responsive";
import { submitOrder } from "@/lib/supabase-hooks";

const P = "#2D5A27";

const divisions = ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর", "ময়মনসিংহ"];
const districtsByDivision: Record<string, string[]> = {
  "ঢাকা": ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "নরসিংদী", "টাঙ্গাইল", "মুন্সীগঞ্জ", "মানিকগঞ্জ", "ফরিদপুর"],
  "চট্টগ্রাম": ["চট্টগ্রাম", "কক্সবাজার", "কুমিল্লা", "ফেনী", "নোয়াখালী", "লক্ষ্মীপুর", "চাঁদপুর"],
  "সিলেট": ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"],
  "রাজশাহী": ["রাজশাহী", "বগুড়া", "জয়পুরহাট", "নওগাঁ", "নাটোর", "নবাবগঞ্জ", "পাবনা", "সিরাজগঞ্জ"],
  "খুলনা": ["খুলনা", "বাগেরহাট", "চুয়াডাঙ্গা", "যশোর", "ঝিনাইদহ", "মাগুরা", "মেহেরপুর", "নড়াইল", "সাতক্ষীরা"],
  "বরিশাল": ["বরিশাল", "বরগুনা", "ভোলা", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর"],
  "রংপুর": ["রংপুর", "দিনাজপুর", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী", "পঞ্চগড়", "ঠাকুরগাঁও"],
  "ময়মনসিংহ": ["ময়মনসিংহ", "জামালপুর", "নেত্রকোণা", "শেরপুর"],
};

type PayMethod = "bkash" | "nagad" | "rocket" | "cod" | "bank";

const payMethods = [
  { id: "bkash" as PayMethod, label: "bKash", color: "#E2136E", icon: "account_balance_wallet", sub: "মোবাইল ব্যাংকিং" },
  { id: "nagad" as PayMethod, label: "Nagad", color: "#F7941D", icon: "account_balance_wallet", sub: "মোবাইল ব্যাংকিং" },
  { id: "rocket" as PayMethod, label: "Rocket", color: "#8B22A0", icon: "account_balance_wallet", sub: "ডাচ-বাংলা মোবাইল" },
  { id: "cod" as PayMethod, label: "ক্যাশ অন ডেলিভারি", color: "#2D5A27", icon: "payments", sub: "পণ্য পেয়ে পরিশোধ" },
  { id: "bank" as PayMethod, label: "ব্যাংক ট্রান্সফার", color: "#1A3A5C", icon: "account_balance", sub: "ব্র্যাক / ডাচ-বাংলা" },
];

const DELIVERY_THRESHOLD = 1000;
const DELIVERY_CHARGE = 60;
const steps = ["ডেলিভারি", "পেমেন্ট", "পর্যালোচনা"];

export default function Checkout() {
  const [, navigate] = useLocation();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState<PayMethod>("bkash");
  const [mobileNumber, setMobileNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(`ORG-${Math.floor(100000 + Math.random() * 900000)}`);
  const { isMobile } = useResponsive();

  const deliveryFree = subtotal >= DELIVERY_THRESHOLD;
  const deliveryCharge = deliveryFree ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;
  const px = isMobile ? "16px" : "64px";

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    division: "ঢাকা", district: "ঢাকা",
    thana: "", address: "", postcode: "", notes: "",
  });
  function setF(key: string, val: string) { setForm((prev) => ({ ...prev, [key]: val })); }

  async function handlePlaceOrder() {
    await submitOrder({
      orderNumber: orderId,
      customerName: form.fullName,
      phone: form.phone,
      email: form.email || undefined,
      division: form.division,
      district: form.district,
      thana: form.thana,
      address: form.address,
      postcode: form.postcode || undefined,
      paymentMethod: payMethod,
      paymentNumber: mobileNumber || undefined,
      transactionId: transactionId || undefined,
      subtotal,
      deliveryFee: deliveryCharge,
      total,
      notes: form.notes || undefined,
      items: items.map((item) => ({
        productId: typeof item.product.id === "string" ? item.product.id : undefined,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
      })),
    });
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) return <OrderSuccess orderId={orderId} total={total} />;

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
        <Header />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 28, color: "#1A1C1C", fontWeight: 400 }}>আপনার ঝুড়ি খালি</h2>
          <button onClick={() => navigate("/")} style={{ marginTop: 24, background: P, color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", cursor: "pointer", fontSize: 14, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>এখনই কিনুন</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <Header />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: `${isMobile ? 24 : 40}px ${px} 80px` }}>
        <div style={{ marginBottom: 32 }}>
          <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: P, fontSize: 13, fontFamily: "'Inter',sans-serif", marginBottom: 10 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            ঝুড়িতে ফিরুন
          </button>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: isMobile ? 28 : 40, fontWeight: 400, color: "#1A1C1C" }}>চেকআউট</h1>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36, maxWidth: isMobile ? "100%" : 400 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: i < step ? "pointer" : "default" }}
                onClick={() => i < step && setStep(i)}>
                <div style={{ width: isMobile ? 30 : 36, height: isMobile ? 30 : 36, borderRadius: "50%", backgroundColor: i <= step ? P : "#E8E8E8", color: i <= step ? "#fff" : "#737973", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                  {i < step ? <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span> : i + 1}
                </div>
                <span style={{ fontSize: isMobile ? 9 : 11, fontWeight: i === step ? 700 : 400, color: i <= step ? P : "#737973", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, backgroundColor: i < step ? P : "#E8E8E8", margin: "0 6px", marginBottom: 20 }} />}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: 24, alignItems: "start" }}>
          <div>
            {step === 0 && <DeliveryStep form={form} setF={setF} onNext={() => setStep(1)} isMobile={isMobile} />}
            {step === 1 && (
              <PaymentStep payMethod={payMethod} setPayMethod={setPayMethod}
                mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}
                transactionId={transactionId} setTransactionId={setTransactionId}
                onNext={() => setStep(2)} onBack={() => setStep(0)} total={total} isMobile={isMobile} />
            )}
            {step === 2 && <ReviewStep form={form} payMethod={payMethod} onBack={() => setStep(1)} onPlace={handlePlaceOrder} isMobile={isMobile} />}
          </div>

          {/* Order summary sidebar — on mobile this renders BELOW the form */}
          <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #E8E8E8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 400, color: "#1A1C1C" }}>অর্ডারের সারসংক্ষেপ</h3>
              <span style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{items.length}টি পণ্য</span>
            </div>
            <div style={{ padding: "14px 22px", display: "flex", flexDirection: "column", gap: 10, maxHeight: 240, overflowY: "auto" }}>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, backgroundColor: "#F3F3F4", borderRadius: 8, padding: 5, flexShrink: 0 }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</p>
                    <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif" }}>×{item.quantity}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", flexShrink: 0 }}>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 22px 22px", borderTop: "1px solid #E8E8E8", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif" }}>উপমোট</span>
                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif" }}>ডেলিভারি</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: deliveryFree ? P : "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{deliveryFree ? "বিনামূল্যে" : formatPrice(deliveryCharge)}</span>
              </div>
              <div style={{ height: 1, backgroundColor: "#E8E8E8" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 17, color: "#1A1C1C" }}>মোট</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 700, color: "#1A1C1C" }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", overflow: "hidden", marginBottom: 20 }}>
      <div style={{ padding: "16px 22px", borderBottom: "1px solid #E8E8E8" }}>
        <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 400, color: "#1A1C1C" }}>{title}</h2>
      </div>
      <div style={{ padding: "22px" }}>{children}</div>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif" }}>
        {label}{required && <span style={{ color: "#D64545" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", border: "1px solid #E8E8E8", borderRadius: 8, padding: "11px 14px",
  fontSize: 15, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", backgroundColor: "#fff",
  outline: "none", transition: "border 0.2s", boxSizing: "border-box",
};

function DeliveryStep({ form, setF, onNext, isMobile }: { form: any; setF: (k: string, v: string) => void; onNext: () => void; isMobile: boolean }) {
  const districts = districtsByDivision[form.division] || [];
  const valid = form.fullName && form.phone && form.division && form.district && form.thana && form.address;
  const cols = isMobile ? "1fr" : "1fr 1fr";

  return (
    <>
      <Section title="যোগাযোগের তথ্য">
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16 }}>
          <Field label="পূর্ণ নাম" required>
            <input style={inputStyle} placeholder="আপনার পুরো নাম লিখুন" value={form.fullName} onChange={(e) => setF("fullName", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
          <Field label="মোবাইল নম্বর" required>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>+৮৮০</span>
              <input style={{ ...inputStyle, paddingLeft: 56 }} placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => setF("phone", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </div>
          </Field>
          <Field label="ইমেইল (ঐচ্ছিক)">
            <input style={inputStyle} type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setF("email", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
        </div>
      </Section>
      <Section title="ডেলিভারি ঠিকানা">
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16 }}>
          <Field label="বিভাগ" required>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.division}
              onChange={(e) => { setF("division", e.target.value); setF("district", districtsByDivision[e.target.value]?.[0] ?? ""); }}
              onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}>
              {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="জেলা" required>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.district} onChange={(e) => setF("district", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}>
              {(districtsByDivision[form.division] || []).map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="থানা / উপজেলা" required>
            <input style={inputStyle} placeholder="যেমন: গুলশান, ধানমন্ডি" value={form.thana} onChange={(e) => setF("thana", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
          <Field label="পোস্টকোড">
            <input style={inputStyle} placeholder="যেমন: ১২১২" value={form.postcode} onChange={(e) => setF("postcode", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="সম্পূর্ণ ঠিকানা" required>
              <textarea style={{ ...inputStyle, resize: "none", height: 80 }} placeholder="বাড়ি/ফ্ল্যাট নং, রোড নং, এলাকা" value={form.address} onChange={(e) => setF("address", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="অর্ডারের নোট">
              <textarea style={{ ...inputStyle, resize: "none", height: 68 }} placeholder="বিশেষ ডেলিভারি নির্দেশনা? (ঐচ্ছিক)" value={form.notes} onChange={(e) => setF("notes", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
        </div>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onNext} disabled={!valid}
            style={{ backgroundColor: valid ? P : "#C3C8C1", color: "#fff", border: "none", borderRadius: 10, padding: "13px 36px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8, width: isMobile ? "100%" : "auto", justifyContent: "center" }}>
            পেমেন্টে যান
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>
        </div>
      </Section>
    </>
  );
}

function PaymentStep({ payMethod, setPayMethod, mobileNumber, setMobileNumber, transactionId, setTransactionId, onNext, onBack, total, isMobile }: any) {
  const needsMobile = ["bkash", "nagad", "rocket"].includes(payMethod);
  const valid = payMethod === "cod" || payMethod === "bank" || (mobileNumber.length >= 11 && transactionId.length >= 6);

  return (
    <Section title="পেমেন্ট পদ্ধতি">
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {payMethods.map((m) => (
          <button key={m.id} onClick={() => setPayMethod(m.id)}
            style={{ border: payMethod === m.id ? `2px solid ${m.color}` : "2px solid #E8E8E8", borderRadius: 12, padding: "14px 18px", backgroundColor: payMethod === m.id ? `${m.color}08` : "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, backgroundColor: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: m.color }}>{m.icon}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: payMethod === m.id ? m.color : "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: 0 }}>{m.label}</p>
              <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>{m.sub}</p>
            </div>
            {payMethod === m.id && <span className="material-symbols-outlined fill" style={{ marginLeft: "auto", fontSize: 18, color: m.color, flexShrink: 0 }}>check_circle</span>}
          </button>
        ))}
      </div>

      {needsMobile && (
        <div style={{ backgroundColor: "#F9F9F9", borderRadius: 12, padding: 20, marginBottom: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ backgroundColor: "#fff3cd", borderRadius: 8, padding: "11px 14px", display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#856404", flexShrink: 0, marginTop: 1 }}>info</span>
            <p style={{ fontSize: 12, color: "#856404", fontFamily: "'Inter',sans-serif", lineHeight: 1.5, margin: 0 }}>
              {payMethods.find(m => m.id === payMethod)?.label} নম্বরে <strong>{formatPrice(total)}</strong> পাঠান: <strong>01XXXXXXXXX</strong>। তারপর নিচের তথ্য পূরণ করুন।
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            <Field label="আপনার মোবাইল নম্বর" required>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>+৮৮০</span>
                <input style={{ ...inputStyle, paddingLeft: 54 }} placeholder="01XXXXXXXXX" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </div>
            </Field>
            <Field label="ট্রানজেকশন আইডি" required>
              <input style={inputStyle} placeholder="যেমন: 8B7D4G3KS9" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
        </div>
      )}
      {payMethod === "cod" && (
        <div style={{ backgroundColor: "#DFF2D8", borderRadius: 12, padding: "14px 18px", display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: P }}>payments</span>
          <p style={{ fontSize: 13, color: P, fontFamily: "'Inter',sans-serif', margin: 0" }}>পণ্য পাওয়ার সময় <strong>{formatPrice(total)}</strong> নগদে পরিশোধ করুন।</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #E8E8E8", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontFamily: "'Inter',sans-serif", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> পেছনে
        </button>
        <button onClick={onNext} disabled={!valid}
          style={{ backgroundColor: valid ? P : "#C3C8C1", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          অর্ডার পর্যালোচনা করুন
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
        </button>
      </div>
    </Section>
  );
}

function ReviewStep({ form, payMethod, onBack, onPlace, isMobile }: { form: any; payMethod: PayMethod; onBack: () => void; onPlace: () => void; isMobile: boolean }) {
  const method = payMethods.find((m) => m.id === payMethod)!;
  return (
    <>
      <Section title="ডেলিভারির বিবরণ">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: 14 }}>
          {[["নাম", form.fullName], ["ফোন", `+৮৮০ ${form.phone}`], ["বিভাগ", form.division], ["জেলা", form.district], ["থানা", form.thana], ["পোস্টকোড", form.postcode || "—"]].map(([k, v]) => (
            <div key={k as string}>
              <p style={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, color: "#737973", letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif", marginBottom: 3 }}>{k as string}</p>
              <p style={{ fontSize: 14, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{v as string}</p>
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <p style={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, color: "#737973", letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif", marginBottom: 3 }}>ঠিকানা</p>
            <p style={{ fontSize: 14, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{form.address}</p>
          </div>
        </div>
      </Section>
      <Section title="পেমেন্ট">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 8, backgroundColor: `${method.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: method.color }}>{method.icon}</span>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", margin: 0 }}>{method.label}</p>
            <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif", margin: 0 }}>{method.sub}</p>
          </div>
        </div>
      </Section>
      <div style={{ backgroundColor: "#fff", borderRadius: 14, border: "1px solid #E8E8E8", padding: 22, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #E8E8E8", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontFamily: "'Inter',sans-serif", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> পেছনে
        </button>
        <button onClick={onPlace}
          style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "15px 36px", fontSize: 15, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(45,90,39,0.3)", letterSpacing: "0.04em", justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
          নিরাপদে অর্ডার দিন
        </button>
      </div>
    </>
  );
}

function OrderSuccess({ orderId, total }: { orderId: string; total: number }) {
  const [, navigate] = useLocation();
  const { isMobile } = useResponsive();
  return (
    <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <Header />
      <div style={{ maxWidth: 600, margin: "60px auto", padding: isMobile ? "0 20px 60px" : "0 32px 80px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ width: 88, height: 88, backgroundColor: "#DFF2D8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined fill" style={{ fontSize: 48, color: P }}>check_circle</span>
        </div>
        <div>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: isMobile ? 28 : 36, fontWeight: 400, color: "#1A1C1C", marginBottom: 10 }}>অর্ডার নিশ্চিত হয়েছে!</h1>
          <p style={{ fontSize: 15, color: "#434843", fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>আপনার অর্ডারের জন্য ধন্যবাদ। শীঘ্রই আমরা প্রস্তুত করে শিপমেন্টের সময় জানাব।</p>
        </div>
        <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", padding: "24px 32px", width: "100%" }}>
          {[["অর্ডার আইডি", orderId], ["পরিশোধিত পরিমাণ", formatPrice(total)], ["আনুমানিক ডেলিভারি", "২–৪ কার্যদিবস"]].map(([k, v]) => (
            <div key={k as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F3F3F4" }}>
              <span style={{ fontSize: 14, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{k as string}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{v as string}</span>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/")}
          style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "13px 36px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
          কেনাকাটা চালিয়ে যান
        </button>
      </div>
      <Footer />
    </div>
  );
}
