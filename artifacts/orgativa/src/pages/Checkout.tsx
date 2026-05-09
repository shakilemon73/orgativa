import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const P = "#2D5A27";

const divisions = [
  "Dhaka", "Chittagong", "Sylhet", "Rajshahi",
  "Khulna", "Barisal", "Rangpur", "Mymensingh",
];

const districtsByDivision: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Narsingdi", "Tangail", "Munshiganj", "Manikganj", "Faridpur"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Comilla", "Feni", "Noakhali", "Lakshmipur", "Chandpur"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rajshahi: ["Rajshahi", "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Sirajganj"],
  Khulna: ["Khulna", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Magura", "Meherpur", "Narail", "Satkhira"],
  Barisal: ["Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};

type PayMethod = "bkash" | "nagad" | "rocket" | "cod" | "bank";

const payMethods = [
  { id: "bkash" as PayMethod, label: "bKash", color: "#E2136E", icon: "account_balance_wallet", sub: "Mobile banking" },
  { id: "nagad" as PayMethod, label: "Nagad", color: "#F7941D", icon: "account_balance_wallet", sub: "Mobile banking" },
  { id: "rocket" as PayMethod, label: "Rocket", color: "#8B22A0", icon: "account_balance_wallet", sub: "DBBL mobile" },
  { id: "cod" as PayMethod, label: "Cash on Delivery", color: "#2D5A27", icon: "payments", sub: "Pay when received" },
  { id: "bank" as PayMethod, label: "Bank Transfer", color: "#1A3A5C", icon: "account_balance", sub: "BRAC / Dutch-Bangla" },
];

const DELIVERY_THRESHOLD = 1000;
const DELIVERY_CHARGE = 60;
const steps = ["Delivery", "Payment", "Review"];

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
    division: "Dhaka", district: "Dhaka",
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
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 28, color: "#1A1C1C", fontWeight: 400 }}>Your cart is empty</h2>
          <button onClick={() => navigate("/")} style={{ marginTop: 24, background: P, color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", cursor: "pointer", fontSize: 14, fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>Shop Now</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <Header />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 64px 96px" }}>
        {/* Page Title */}
        <div style={{ marginBottom: 40 }}>
          <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: P, fontSize: 13, fontFamily: "'Inter',sans-serif", marginBottom: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            Back to Cart
          </button>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 40, fontWeight: 400, color: "#1A1C1C" }}>Checkout</h1>
        </div>

        {/* Step Indicator */}
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
          {/* Left Panel */}
          <div>
            {step === 0 && (
              <DeliveryStep form={form} setF={setF} onNext={() => setStep(1)} />
            )}
            {step === 1 && (
              <PaymentStep
                payMethod={payMethod} setPayMethod={setPayMethod}
                mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}
                transactionId={transactionId} setTransactionId={setTransactionId}
                onNext={() => setStep(2)} onBack={() => setStep(0)}
                total={total}
              />
            )}
            {step === 2 && (
              <ReviewStep form={form} payMethod={payMethod} onBack={() => setStep(1)} onPlace={handlePlaceOrder} />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden", position: "sticky", top: 100 }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #E8E8E8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 400, color: "#1A1C1C" }}>Order Summary</h3>
              <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{items.length} item{items.length > 1 ? "s" : ""}</span>
            </div>
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12, maxHeight: 280, overflowY: "auto" }}>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, backgroundColor: "#F3F3F4", borderRadius: 8, padding: 6, flexShrink: 0 }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</p>
                    <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", color: "#1A1C1C", flexShrink: 0 }}>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #E8E8E8", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif" }}>Subtotal</span>
                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#434843", fontFamily: "'Inter',sans-serif" }}>Delivery</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: deliveryFree ? P : "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{deliveryFree ? "FREE" : formatPrice(deliveryCharge)}</span>
              </div>
              <div style={{ height: 1, backgroundColor: "#E8E8E8" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, color: "#1A1C1C" }}>Total</span>
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
      <Section title="Contact Information">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Full Name" required>
            <input style={inputStyle} placeholder="আপনার নাম / Your full name" value={form.fullName} onChange={(e) => setF("fullName", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
          <Field label="Phone Number" required>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#737973", fontFamily: "'Inter',sans-serif" }}>+880</span>
              <input style={{ ...inputStyle, paddingLeft: 54 }} placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => setF("phone", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </div>
          </Field>
          <Field label="Email Address">
            <input style={inputStyle} type="email" placeholder="your@email.com (optional)" value={form.email} onChange={(e) => setF("email", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
        </div>
      </Section>

      <Section title="Delivery Address">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Field label="Division" required>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.division}
              onChange={(e) => { setF("division", e.target.value); setF("district", districtsByDivision[e.target.value]?.[0] ?? ""); }}
              onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}>
              {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="District" required>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.district} onChange={(e) => setF("district", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")}>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Thana / Upazila" required>
            <input style={inputStyle} placeholder="e.g. Gulshan, Dhanmondi" value={form.thana} onChange={(e) => setF("thana", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
          <Field label="Postcode">
            <input style={inputStyle} placeholder="e.g. 1212" value={form.postcode} onChange={(e) => setF("postcode", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
          </Field>
          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Full Address" required>
              <textarea style={{ ...inputStyle, resize: "none", height: 80 }} placeholder="House/Flat no., Road no., Area" value={form.address} onChange={(e) => setF("address", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Order Notes">
              <textarea style={{ ...inputStyle, resize: "none", height: 72 }} placeholder="Any special delivery instructions? (optional)" value={form.notes} onChange={(e) => setF("notes", e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
        </div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onNext} disabled={!valid}
            style={{ backgroundColor: valid ? P : "#C3C8C1", color: "#fff", border: "none", borderRadius: 10, padding: "14px 40px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}>
            Continue to Payment
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
    <Section title="Payment Method">
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
              Please send <strong>{formatPrice(total)}</strong> to our {payMethods.find(m => m.id === payMethod)?.label} number: <strong>01XXXXXXXXX</strong>. Then fill in the details below.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Field label="Your Mobile Number" required>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>+880</span>
                <input style={{ ...inputStyle, paddingLeft: 54 }} placeholder="01XXXXXXXXX" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
              </div>
            </Field>
            <Field label="Transaction ID" required>
              <input style={inputStyle} placeholder="e.g. 8B7D4G3KS9" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} onFocus={(e) => (e.target.style.borderColor = P)} onBlur={(e) => (e.target.style.borderColor = "#E8E8E8")} />
            </Field>
          </div>
        </div>
      )}
      {payMethod === "cod" && (
        <div style={{ backgroundColor: "#DFF2D8", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 10, alignItems: "center", marginBottom: 24 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: P }}>payments</span>
          <p style={{ fontSize: 14, color: P, fontFamily: "'Inter',sans-serif', fontWeight: 600" }}>Pay <strong>{formatPrice(total)}</strong> in cash when your order arrives. Applicable within Dhaka city.</p>
        </div>
      )}
      {payMethod === "bank" && (
        <div style={{ backgroundColor: "#F3F3F4", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", marginBottom: 12 }}>Bank Transfer Details:</p>
          {[
            ["Bank", "BRAC Bank Ltd"],
            ["Account Name", "Orgativa Ltd"],
            ["Account No.", "1501202XXXXXXXX"],
            ["Routing No.", "060271462"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 16, marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif", minWidth: 110 }}>{k}:</span>
              <span style={{ fontSize: 13, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #E8E8E8", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontFamily: "'Inter',sans-serif", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", gap: 6 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> Back
        </button>
        <button onClick={onNext} disabled={!valid}
          style={{ backgroundColor: valid ? P : "#C3C8C1", color: "#fff", border: "none", borderRadius: 10, padding: "13px 36px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
          Review Order
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
      <Section title="Delivery Details">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            ["Name", form.fullName],
            ["Phone", `+880 ${form.phone}`],
            ["Division", form.division],
            ["District", form.district],
            ["Thana", form.thana],
            ["Postcode", form.postcode || "—"],
          ].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 700, color: "#737973", letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>{k}</p>
              <p style={{ fontSize: 15, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{v}</p>
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 700, color: "#737973", letterSpacing: "0.08em", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>Address</p>
            <p style={{ fontSize: 15, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{form.address}</p>
          </div>
        </div>
      </Section>
      <Section title="Payment">
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
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> Back
        </button>
        <button onClick={onPlace}
          style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "16px 48px", fontSize: 15, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(45,90,39,0.3)", letterSpacing: "0.04em", transition: "all 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(45,90,39,0.35)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(45,90,39,0.3)"; }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
          Place Order Securely
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
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 400, color: "#1A1C1C", marginBottom: 12 }}>Order Confirmed!</h1>
          <p style={{ fontSize: 16, color: "#434843", fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>Thank you for your order. We'll process it shortly and notify you when it's shipped.</p>
        </div>
        <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", padding: "28px 40px", width: "100%" }}>
          {[["Order ID", orderId], ["Amount Paid", formatPrice(total)], ["Estimated Delivery", "2–4 business days"]].map(([k, v]) => (
            <div key={k as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F3F3F4" }}>
              <span style={{ fontSize: 14, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{k as string}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif" }}>{v as string}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={() => navigate("/")}
            style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer" }}>
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
