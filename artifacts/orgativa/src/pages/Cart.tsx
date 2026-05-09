import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const P = "#2D5A27";
const BG = "#F9F9F9";

const DELIVERY_THRESHOLD = 1000;
const DELIVERY_CHARGE = 60;

export default function Cart() {
  const [, navigate] = useLocation();
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const deliveryFree = subtotal >= DELIVERY_THRESHOLD;
  const deliveryCharge = deliveryFree ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;
  const savings = items.reduce((sum, i) =>
    i.product.originalPrice ? sum + (i.product.originalPrice - i.product.price) * i.quantity : sum, 0);

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
      <Header />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 64px 96px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: P, fontSize: 13, fontFamily: "'Inter',sans-serif" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
              Continue Shopping
            </button>
          </div>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 40, fontWeight: 400, color: "#1A1C1C" }}>
            Shopping Cart {totalItems > 0 && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, color: "#737973", fontWeight: 400 }}>({totalItems} items)</span>}
          </h1>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
            {/* Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Free delivery progress */}
              {!deliveryFree && (
                <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "16px 20px", border: "1px solid #E8E8E8", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", color: "#434843" }}>
                      Add <strong style={{ color: P }}>{formatPrice(DELIVERY_THRESHOLD - subtotal)}</strong> more for free delivery
                    </span>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: P }}>local_shipping</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: "#E8E8E8", borderRadius: 999 }}>
                    <div style={{ height: "100%", width: `${Math.min(100, (subtotal / DELIVERY_THRESHOLD) * 100)}%`, backgroundColor: P, borderRadius: 999, transition: "width 0.4s" }} />
                  </div>
                </div>
              )}
              {deliveryFree && (
                <div style={{ backgroundColor: "#DFF2D8", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="material-symbols-outlined fill" style={{ fontSize: 20, color: P }}>check_circle</span>
                  <span style={{ fontSize: 13, color: P, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>You've unlocked free delivery!</span>
                </div>
              )}

              {items.map((item) => <CartItemRow key={item.product.id} item={item} onRemove={removeItem} onQty={updateQuantity} />)}
            </div>

            {/* Order Summary */}
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", overflow: "hidden", position: "sticky", top: 100 }}>
              <div style={{ padding: "24px 28px", borderBottom: "1px solid #E8E8E8" }}>
                <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 400, color: "#1A1C1C" }}>Order Summary</h2>
              </div>
              <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
                <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
                <SummaryRow label="Delivery" value={deliveryFree ? "FREE" : formatPrice(deliveryCharge)} valueColor={deliveryFree ? P : "#1A1C1C"} />
                {savings > 0 && <SummaryRow label="You're saving" value={`-${formatPrice(savings)}`} valueColor="#D64545" />}
                <div style={{ height: 1, backgroundColor: "#E8E8E8", margin: "4px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 400, color: "#1A1C1C" }}>Total</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 24, fontWeight: 700, color: "#1A1C1C" }}>{formatPrice(total)}</span>
                </div>
                <p style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif" }}>Including all applicable taxes (VAT)</p>
              </div>
              <div style={{ padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
                <button onClick={() => navigate("/checkout")}
                  style={{ width: "100%", backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "16px", fontSize: 15, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "0.04em", transition: "filter 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}>
                  Proceed to Checkout
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
                </button>
                {/* Payment icons */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
                  {["bKash", "Nagad", "COD"].map((m) => (
                    <span key={m} style={{ fontSize: 11, color: "#737973", fontFamily: "'Inter',sans-serif", backgroundColor: "#F3F3F4", padding: "3px 8px", borderRadius: 4 }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function CartItemRow({ item, onRemove, onQty }: {
  item: { product: any; quantity: number };
  onRemove: (id: number) => void;
  onQty: (id: number, qty: number) => void;
}) {
  const [, navigate] = useLocation();
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #E8E8E8", padding: 20, display: "flex", gap: 20, alignItems: "flex-start" }}>
      <div onClick={() => navigate(`/products/${item.product.slug}`)}
        style={{ width: 100, height: 100, backgroundColor: "#F3F3F4", borderRadius: 10, overflow: "hidden", flexShrink: 0, cursor: "pointer", padding: 12 }}>
        <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: P, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>{item.product.category}</p>
            <h4 onClick={() => navigate(`/products/${item.product.slug}`)}
              style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 400, color: "#1A1C1C", cursor: "pointer", marginBottom: 4 }}>{item.product.name}</h4>
            <p style={{ fontSize: 13, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{item.product.weight}</p>
          </div>
          <button onClick={() => onRemove(item.product.id)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#a8a29e", padding: 4, display: "flex", alignItems: "center", flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #E8E8E8", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => onQty(item.product.id, item.quantity - 1)}
              style={{ width: 36, height: 36, border: "none", background: "none", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>remove</span>
            </button>
            <span style={{ width: 40, textAlign: "center", fontSize: 15, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{item.quantity}</span>
            <button onClick={() => onQty(item.product.id, item.quantity + 1)}
              style={{ width: 36, height: 36, border: "none", background: "none", cursor: "pointer", color: "#434843", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            </button>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 700, color: "#1A1C1C" }}>{formatPrice(item.product.price * item.quantity)}</p>
            {item.quantity > 1 && <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif" }}>{formatPrice(item.product.price)} each</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, valueColor = "#1A1C1C" }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 14, color: "#434843", fontFamily: "'Inter',sans-serif" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: valueColor, fontFamily: "'Inter',sans-serif" }}>{value}</span>
    </div>
  );
}

function EmptyCart() {
  const [, navigate] = useLocation();
  return (
    <div style={{ textAlign: "center", padding: "80px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ width: 96, height: 96, backgroundColor: "#DFF2D8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 48, color: P }}>shopping_basket</span>
      </div>
      <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 28, fontWeight: 400, color: "#1A1C1C" }}>Your cart is empty</h2>
      <p style={{ fontSize: 16, color: "#737973", fontFamily: "'Inter',sans-serif", maxWidth: 380, lineHeight: 1.6 }}>
        Discover our pure organic essentials and add something wholesome to your cart.
      </p>
      <button onClick={() => navigate("/")}
        style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", marginTop: 8 }}>
        Browse Products
      </button>
    </div>
  );
}
