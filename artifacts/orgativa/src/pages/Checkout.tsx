import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

  const deliveryFree = subtotal >= DELIVERY_THRESHOLD;
  const deliveryCharge = deliveryFree ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    division: "ঢাকা", district: "ঢাকা",
    thana: "", address: "", postcode: "",
    notes: "",
  });

  function setF(key: string, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handlePlaceOrder() {
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) return <OrderSuccess orderId={orderId} total={total} />;

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
        <Header />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 64px", textAlign: "center" }}>
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
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 64px 96px" }}>
        <div style={{ marginBottom: 40 }}>
          <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: P, fontSize: 13, fontFamily: "'Inter',sans-serif", marginBottom: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            ঝুড়িতে ফিরুন
          </button>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 40, fontWeight: 400, color: "#1A1C1C" }}>চেকআউট</h1>
        </div>

        {/* ধাপ নির্দেশক */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 48, maxWidth: 400 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: i < step ? "pointer" : "default" }}
                onClick={() => i < step && setStep(i)}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: i <= step ? P : "#E8E8E8", color: i <= step ? "#fff" : "#737973", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "'Inter',sans-serif", transition: "all 0.3s" }}>
                  {i < step ? <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check</span> : i + 1}
                </div>
                <span style={{ fontSize: 11, fontWeight: i === step ? 700 : 400, color: i <= step ? P : "#737973", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, backgroundColor: i < step ? P : "#E8E8E8", margin: "0 8px", marginBottom: 22, transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
          <div>
            {step === 0 && <DeliveryStep form={form} setF={setF} onNext={() => setStep(1)} />}
            {step === 1 && (
              <PaymentStep
                payMethod={payMethod} setPayMethod={setPayMethod}
                mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}
                transactionId={transactionId} setTransactionId={setTransactionId}
                onNext={() => setStep(2)} onBack={() => setStep(0)}
                total={total}
              />
            )}
            {step === 2 && <ReviewStep form={form} payMethod={payMethod} onBack={() => setStep(1)} onPlace={handlePlaceOrder} />}
          </div>

          {/* অর্ডার সারসংক্ষেপ */}
          <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden", position: "sticky", top: 100 }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #E8E8E8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 400, color: "#1A1C1C" }}>অর্ডারের সারসংক্ষেপ</h3>
              <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{items.length}টি পণ্য</span>
            </div>
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12, maxHeight: 280, overflowY: "auto" }}>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, backgroundColor: "#F3F3F4", borderRadius: 8, padding: 6, flexShrink: 0 }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</p>
                    <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>পরিমাণ: {item.quantity}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", flexShrink: 0 }}>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #E8E8E8", display: "flex", flexDirection: "column", gap: 10 }}>
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
                <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, color: "#1A1C1C" }}>মোট</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 22, fontWeight: 700, color: "#1A1C1C" }}>{formatPrice(total)}</span>
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
    <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden", marginBottom: 24 }}>
      <div style={{ padding: "20px 28px", borderBottom: "1px solid #E8E8E8" }}>
        <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 400, color: "#1A1C1C" }}>{title}</h2>
      </div>
      <div style={{ padding: "28px" }}>{children}</div>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#434843", fontFamily: "'Inter',sans-serif" }}>
        {label}{required && <span style={{ color: "#D64545" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", border: "1px solid #E8E8E8", borderRadius: 8, padding: "12px 14px",
  fontSize: 15, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", backgroundColor: "#fff",
  outline: "none", transition: "border 0.2s", boxSizing: "border-box",
};

function DeliveryStep({ form, setF, onNext }: { form: any; setF: (k: string, v: string) => void; onNext: () => void }) {
  const districts = districtsByDivision[form.division] || [];
  const valid = form.fullName && form.phone && form.division && form.district && form.thana && form.address;

  return (
    <>
      <Section title="যোগাযোগের তথ্য">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="পূর্ণ নাম" required>
            <input style={inputStyle} placeholder="আপনার পুরো নাম লিখুন" value={form.fullName} onChange={(e) => setF("fullName", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
          <Field label="মোবাইল নম্বর" required>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#737973", fontFamily: "'Inter',sans-serif" }}>+৮৮০</span>
              <input style={{ ...inputStyle, paddingLeft: 58 }} placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => setF("phone", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </div>
          </Field>
          <Field label="ইমেইল ঠিকানা">
            <input style={inputStyle} type="email" placeholder="your@email.com (ঐচ্ছিক)" value={form.email} onChange={(e) => setF("email", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
        </div>
      </Section>

      <Section title="ডেলিভারি ঠিকানা">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
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
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
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
              <textarea style={{ ...inputStyle, resize: "none", height: 72 }} placeholder="বিশেষ ডেলিভারি নির্দেশনা? (ঐচ্ছিক)" value={form.notes} onChange={(e) => setF("notes", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
        </div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onNext} disabled={!valid}
            style={{ backgroundColor: valid ? P : "#C3C8C1", color: "#fff", border: "none", borderRadius: 10, padding: "14px 40px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}>
            পেমেন্টে যান
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>
        </div>
      </Section>
    </>
  );
}

function PaymentStep({ payMethod, setPayMethod, mobileNumber, setMobileNumber, transactionId, setTransactionId, onNext, onBack, total }: any) {
  const needsMobile = ["bkash", "nagad", "rocket"].includes(payMethod);
  const valid = payMethod === "cod" || payMethod === "bank" || (mobileNumber.length >= 11 && transactionId.length >= 6);

  return (
    <Section title="পেমেন্ট পদ্ধতি">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
        {payMethods.map((m) => (
          <button key={m.id} onClick={() => setPayMethod(m.id)}
            style={{ border: payMethod === m.id ? `2px solid ${m.color}` : "2px solid #E8E8E8", borderRadius: 12, padding: "16px 20px", backgroundColor: payMethod === m.id ? `${m.color}08` : "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "all 0.2s" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: m.color }}>{m.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: payMethod === m.id ? m.color : "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{m.label}</p>
              <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{m.sub}</p>
            </div>
            {payMethod === m.id && (
              <span className="material-symbols-outlined fill" style={{ marginLeft: "auto", fontSize: 20, color: m.color }}>check_circle</span>
            )}
          </button>
        ))}
      </div>

      {needsMobile && (
        <div style={{ backgroundColor: "#F9F9F9", borderRadius: 12, padding: 24, marginBottom: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ backgroundColor: "#fff3cd", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#856404", flexShrink: 0, marginTop: 1 }}>info</span>
            <p style={{ fontSize: 13, color: "#856404", fontFamily: "'Inter',sans-serif", lineHeight: 1.5 }}>
              অনুগ্রহ করে আমাদের {payMethods.find(m => m.id === payMethod)?.label} নম্বরে <strong>{formatPrice(total)}</strong> পাঠান: <strong>01XXXXXXXXX</strong>। তারপর নিচের তথ্য পূরণ করুন।
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Field label="আপনার মোবাইল নম্বর" required>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>+৮৮০</span>
                <input style={{ ...inputStyle, paddingLeft: 58 }} placeholder="01XXXXXXXXX" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </div>
            </Field>
            <Field label="ট্রানজেকশন আইডি" required>
              <input style={inputStyle} placeholder="যেমন: 8B7D4G3KS9" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
        </div>
      )}
      {payMethod === "cod" && (
        <div style={{ backgroundColor: "#DFF2D8", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 10, alignItems: "center", marginBottom: 24 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: P }}>payments</span>
          <p style={{ fontSize: 14, color: P, fontFamily: "'Inter',sans-serif" }}>পণ্য পাওয়ার সময় <strong>{formatPrice(total)}</strong> নগদে পরিশোধ করুন। ঢাকার মধ্যে প্রযোজ্য।</p>
        </div>
      )}
      {payMethod === "bank" && (
        <div style={{ backgroundColor: "#F3F3F4", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", marginBottom: 12 }}>ব্যাংক ট্রান্সফারের বিবরণ:</p>
          {[
            ["ব্যাংক", "ব্র্যাক ব্যাংক লি."],
            ["অ্যাকাউন্টের নাম", "Orgativa Ltd"],
            ["অ্যাকাউন্ট নম্বর", "1501202XXXXXXXX"],
            ["রাউটিং নম্বর", "060271462"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 16, marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif", minWidth: 130 }}>{k}:</span>
              <span style={{ fontSize: 13, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #E8E8E8", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontFamily: "'Inter',sans-serif", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", gap: 6 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> পেছনে
        </button>
        <button onClick={onNext} disabled={!valid}
          style={{ backgroundColor: valid ? P : "#C3C8C1", color: "#fff", border: "none", borderRadius: 10, padding: "13px 36px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
          অর্ডার পর্যালোচনা করুন
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
        </button>
      </div>
    </Section>
  );
}

function ReviewStep({ form, payMethod, onBack, onPlace }: { form: any; payMethod: PayMethod; onBack: () => void; onPlace: () => void }) {
  const method = payMethods.find((m) => m.id === payMethod)!;
  return (
    <>
      <Section title="ডেলিভারির বিবরণ">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            ["নাম", form.fullName],
            ["ফোন", `+৮৮০ ${form.phone}`],
            ["বিভাগ", form.division],
            ["জেলা", form.district],
            ["থানা", form.thana],
            ["পোস্টকোড", form.postcode || "—"],
          ].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 700, color: "#737973", letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>{k}</p>
              <p style={{ fontSize: 15, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{v}</p>
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 700, color: "#737973", letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>ঠিকানা</p>
            <p style={{ fontSize: 15, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{form.address}</p>
          </div>
        </div>
      </Section>
      <Section title="পেমেন্ট">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: `${method.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: method.color }}>{method.icon}</span>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Inter',sans-serif", color: "#1A1C1C" }}>{method.label}</p>
            <p style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{method.sub}</p>
          </div>
        </div>
      </Section>
      <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", padding: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #E8E8E8", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontFamily: "'Inter',sans-serif", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", gap: 6 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> পেছনে
        </button>
        <button onClick={onPlace}
          style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "16px 48px", fontSize: 15, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(45,90,39,0.3)", letterSpacing: "0.04em", transition: "all 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(45,90,39,0.35)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(45,90,39,0.3)"; }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
          নিরাপদে অর্ডার দিন
        </button>
      </div>
    </>
  );
}

function OrderSuccess({ orderId, total }: { orderId: string; total: number }) {
  const [, navigate] = useLocation();
  return (
    <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <Header />
      <div style={{ maxWidth: 640, margin: "80px auto", padding: "0 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ width: 96, height: 96, backgroundColor: "#DFF2D8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined fill" style={{ fontSize: 52, color: P }}>check_circle</span>
        </div>
        <div>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 400, color: "#1A1C1C", marginBottom: 12 }}>অর্ডার নিশ্চিত হয়েছে!</h1>
          <p style={{ fontSize: 16, color: "#434843", fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>আপনার অর্ডারের জন্য ধন্যবাদ। শীঘ্রই আমরা প্রস্তুত করে শিপমেন্টের সময় জানাব।</p>
        </div>
        <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", padding: "28px 40px", width: "100%" }}>
          {[["অর্ডার আইডি", orderId], ["পরিশোধিত পরিমাণ", formatPrice(total)], ["আনুমানিক ডেলিভারি", "২–৪ কার্যদিবস"]].map(([k, v]) => (
            <div key={k as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F3F3F4" }}>
              <span style={{ fontSize: 14, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{k as string}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{v as string}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={() => navigate("/")}
            style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer" }}>
            কেনাকাটা চালিয়ে যান
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
