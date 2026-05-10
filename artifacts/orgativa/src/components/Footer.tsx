import { useState } from "react";
import { useLocation } from "wouter";

const P = "#2D5A27";
const BG = "#0D1F0B";

const shopLinks = [
  { label: "মুদিখানা", slug: "grocery" },
  { label: "স্বাস্থ্য", slug: "wellness" },
  { label: "শুকনো ফল", slug: "dry-fruits" },
  { label: "মধু", slug: "honey" },
  { label: "মশলা", slug: "spices" },
  { label: "চা ও কফি", slug: "tea-coffee" },
  { label: "শস্য", slug: "grains" },
];

const companyLinks = ["আমাদের গল্প", "সোর্সিং প্রতিশ্রুতি", "টেকসই উন্নয়ন", "কারিগর কৃষক", "ব্লগ ও রেসিপি"];
const helpLinks = ["শিপিং নীতি", "রিটার্ন ও রিফান্ড", "অর্ডার ট্র্যাক করুন", "প্রশ্নোত্তর", "যোগাযোগ করুন"];

const certBadges = [
  { label: "অর্গানিক\nপ্রত্যয়িত", icon: "verified" },
  { label: "কীটনাশক\nমুক্ত", icon: "eco" },
  { label: "ল্যাব\nপরীক্ষিত", icon: "science" },
  { label: "খামার\nথেকে সরাসরি", icon: "agriculture" },
];

const payments = [
  { name: "bKash", color: "#E2136E" },
  { name: "Nagad", color: "#F47920" },
  { name: "Rocket", color: "#8B1A8B" },
  { name: "COD", color: "#2D5A27" },
  { name: "Bank", color: "#1A56DB" },
];

export default function Footer() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  }

  return (
    <footer style={{ backgroundColor: BG, color: "#fff", position: "relative", overflow: "hidden" }}>
      <FooterBotanical />

      {/* সার্টিফিকেশন স্ট্রিপ */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {certBadges.map((b, i) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "22px 0", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none", paddingLeft: i > 0 ? 28 : 0, paddingRight: i < 3 ? 28 : 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: "rgba(45,90,39,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#9ACA94" }}>{b.icon}</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Inter',sans-serif", margin: 0, lineHeight: 1.3 }}>
                {b.label.split("\n").map((line, j) => <span key={j}>{line}{j === 0 && <br />}</span>)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* নিউজলেটার */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 420 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>🌿</span>
              <span style={{ fontSize: 11, color: "#6daf67", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>সুস্থ থাকুন</span>
            </div>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 26, fontWeight: 400, color: "#fff", margin: "0 0 8px", lineHeight: 1.2 }}>
              মৌসুমী পণ্য ও এক্সক্লুসিভ অফার পান
            </h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter',sans-serif", margin: 0, lineHeight: 1.6 }}>
              ২০,০০০+ সচেতন ক্রেতাদের সাথে যোগ দিন। কোনো স্প্যাম নেই — শুধু বিশুদ্ধতা।
            </p>
          </div>

          {subscribed ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "rgba(45,90,39,0.25)", border: "1px solid rgba(45,90,39,0.4)", borderRadius: 14, padding: "18px 28px" }}>
              <span className="material-symbols-outlined" style={{ color: "#9ACA94", fontSize: 24 }}>check_circle</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#9ACA94", fontFamily: "'Inter',sans-serif", margin: 0 }}>সাবস্ক্রাইব হয়েছে!</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter',sans-serif", margin: "2px 0 0" }}>অর্গাটিভা পরিবারে স্বাগতম 🌿</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 0, flex: 1, maxWidth: 440 }}>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                required
                style={{ flex: 1, padding: "13px 18px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "10px 0 0 10px", color: "#fff", fontSize: 14, fontFamily: "'Inter',sans-serif", outline: "none", transition: "border 0.2s" }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(154,202,148,0.5)"; e.target.style.backgroundColor = "rgba(255,255,255,0.09)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
              />
              <button type="submit"
                style={{ backgroundColor: P, color: "#fff", border: "none", borderRadius: "0 10px 10px 0", padding: "13px 22px", fontSize: 13, fontWeight: 700, fontFamily: "'Inter',sans-serif", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.04em", transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#3a7033"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = P; }}>
                সাবস্ক্রাইব করুন
              </button>
            </form>
          )}
        </div>
      </div>

      {/* মূল ফুটার কলাম */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 48px 48px", display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1.1fr", gap: 56 }}>

          {/* ব্র্যান্ড কলাম */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
              style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", marginBottom: 20, width: "fit-content" }}>
              <div style={{ width: 34, height: 34, backgroundColor: P, borderRadius: "10px 3px 10px 3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 19, color: "#fff" }}>eco</span>
              </div>
              <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>অর্গাটিভা</span>
            </a>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.42)", fontFamily: "'Inter',sans-serif", lineHeight: 1.75, margin: "0 0 24px", maxWidth: 280 }}>
              বাংলাদেশের বিশ্বস্ত অর্গানিক মুদিখানা ও স্বাস্থ্য পণ্যের উৎস — খামার থেকে আপনার দোরগোড়ায়।
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {[
                { icon: "location_on", text: "বাড়ি ১২, রোড ৫, বসুন্ধরা আ/এ, ঢাকা-১২২৯" },
                { icon: "phone", text: "+৮৮০ ১৭০০-০০০০০০" },
                { icon: "mail", text: "hello@orgativa.com.bd" },
              ].map(({ icon, text }) => (
                <div key={icon} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: "#6daf67", marginTop: 1, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter',sans-serif", lineHeight: 1.55 }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: "language", label: "ওয়েবসাইট" },
                { icon: "mail_outline", label: "ইমেইল" },
                { icon: "phone_android", label: "ফোন" },
                { icon: "chat_bubble_outline", label: "হোয়াটসঅ্যাপ" },
              ].map(({ icon, label }) => (
                <SocialBtn key={icon} icon={icon} label={label} />
              ))}
            </div>
          </div>

          {/* কেনাকাটা কলাম */}
          <FooterCol title="কেনাকাটা" links={shopLinks.map((s) => s.label)}
            onLink={(label) => { const slug = shopLinks.find((s) => s.label === label)?.slug ?? "all"; navigate(`/category/${slug}`); }} />

          {/* কোম্পানি কলাম */}
          <FooterCol title="কোম্পানি" links={companyLinks} />

          {/* সহায়তা কলাম */}
          <div>
            <FooterColTitle>সহায়তা</FooterColTitle>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
              {helpLinks.map((link) => (
                <li key={link}><FooterLink label={link} /></li>
              ))}
            </ul>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, fontFamily: "'Inter',sans-serif", margin: "0 0 4px" }}>অ্যাপ ডাউনলোড করুন</p>
              {[{ label: "অ্যাপ স্টোর", icon: "phone_iphone" }, { label: "গুগল প্লে", icon: "android" }].map(({ label, icon }) => (
                <button key={label}
                  style={{ display: "flex", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 14px", cursor: "pointer", width: "100%", transition: "background 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)"; }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}>{icon}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* নিচের বার */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "22px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter',sans-serif", margin: 0 }}>
              © ২০২৪ অর্গাটিভা। সর্বস্বত্ব সংরক্ষিত।
            </p>
            {["গোপনীয়তা নীতি", "সেবার শর্তাবলী"].map((t) => (
              <a key={t} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", fontFamily: "'Inter',sans-serif", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ACA94"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.32)"; }}>
                {t}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", marginRight: 4 }}>আমরা গ্রহণ করি</span>
            {payments.map((p) => (
              <span key={p.name} style={{ fontSize: 11, fontWeight: 800, color: p.color, backgroundColor: "rgba(255,255,255,0.06)", border: `1px solid ${p.color}40`, borderRadius: 6, padding: "4px 10px", fontFamily: "'Inter',sans-serif", letterSpacing: "0.03em" }}>{p.name}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ icon, label }: { icon: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#" aria-label={label}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid", borderColor: hovered ? "rgba(154,202,148,0.5)" : "rgba(255,255,255,0.1)", backgroundColor: hovered ? "rgba(45,90,39,0.3)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "all 0.2s" }}>
      <span className="material-symbols-outlined" style={{ fontSize: 16, color: hovered ? "#9ACA94" : "rgba(255,255,255,0.4)" }}>{icon}</span>
    </a>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <div style={{ width: 16, height: 2, backgroundColor: "#6daf67", borderRadius: 1 }} />
      <h5 style={{ fontSize: 10, color: "#9ACA94", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, fontFamily: "'Inter',sans-serif", margin: 0 }}>{children}</h5>
    </div>
  );
}

function FooterCol({ title, links, onLink }: { title: string; links: string[]; onLink?: (l: string) => void }) {
  return (
    <div>
      <FooterColTitle>{title}</FooterColTitle>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
        {links.map((link) => (
          <li key={link}><FooterLink label={link} onClick={onLink ? () => onLink(link) : undefined} /></li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ label, onClick }: { label: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#"
      onClick={(e) => { e.preventDefault(); onClick?.(); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: hovered ? "#fff" : "rgba(255,255,255,0.42)", fontFamily: "'Inter',sans-serif", textDecoration: "none", transition: "color 0.18s" }}>
      <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: hovered ? "#6daf67" : "rgba(255,255,255,0.15)", transition: "background 0.18s", flexShrink: 0 }} />
      {label}
    </a>
  );
}

function FooterBotanical() {
  return (
    <svg viewBox="0 0 1280 600" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      aria-hidden="true">
      <defs>
        <style>{`
          .fl { fill: none; stroke: #3a7033; stroke-width: 1; opacity: 0.18; }
          .flf { fill: #3a7033; opacity: 0.07; }
          .fb { fill: none; stroke: #3a7033; stroke-width: 1; opacity: 0.14; stroke-linecap: round; }
        `}</style>
      </defs>
      <path className="fb" d="M -20 80 Q 80 60 160 120 Q 220 155 280 140" />
      <path className="fb" d="M 60 85 Q 90 50 125 38" />
      <path className="fb" d="M 120 105 Q 150 70 185 60" />
      <path className="fb" d="M 175 125 Q 205 90 238 78" />
      {[[125,34,-35],[185,56,18],[60,75,-65],[238,74,8]].map(([x,y,r],i) => <FooterLeaf key={i} x={x as number} y={y as number} rotate={r as number} scale={0.9} />)}
      <path className="fb" d="M 1300 520 Q 1220 480 1185 430 Q 1158 390 1120 375" />
      <path className="fb" d="M 1220 480 Q 1250 440 1270 415" />
      <path className="fb" d="M 1175 425 Q 1205 393 1225 370" />
      {[[1268,411,-22],[1225,367,-48],[1120,372,250]].map(([x,y,r],i) => <FooterLeaf key={`b${i}`} x={x as number} y={y as number} rotate={r as number} scale={0.8} />)}
      <path className="fb" d="M 1280 40 Q 1220 70 1195 120 Q 1175 160 1145 175" />
      <path className="fb" d="M 1215 75 Q 1185 105 1168 130" />
      {[[1165,132,145],[1145,174,165]].map(([x,y,r],i) => <FooterLeaf key={`tr${i}`} x={x as number} y={y as number} rotate={r as number} scale={0.7} />)}
      {[[240,55],[500,30],[700,45],[950,60],[1050,35],[300,550],[550,570],[800,555],[1100,545]].map(([cx,cy],i) => (
        <circle key={`d${i}`} cx={cx} cy={cy} r={2} style={{ fill: "#3a7033", opacity: 0.1 }} />
      ))}
    </svg>
  );
}

function FooterLeaf({ x, y, rotate, scale }: { x: number; y: number; rotate: number; scale: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`}>
      <path className="flf" d="M 0 0 C -6 -18 -4 -32 0 -38 C 4 -32 6 -18 0 0 Z" />
      <path className="fl" d="M 0 0 C -6 -18 -4 -32 0 -38 C 4 -32 6 -18 0 0 Z" />
      <line className="fb" x1="0" y1="0" x2="0" y2="-38" />
      <g transform="rotate(-35)">
        <path className="flf" d="M 0 0 C -4 -12 -3 -22 0 -26 C 3 -22 4 -12 0 0 Z" />
        <path className="fl" d="M 0 0 C -4 -12 -3 -22 0 -26 C 3 -22 4 -12 0 0 Z" />
      </g>
      <g transform="rotate(35)">
        <path className="flf" d="M 0 0 C -4 -12 -3 -22 0 -26 C 3 -22 4 -12 0 0 Z" />
        <path className="fl" d="M 0 0 C -4 -12 -3 -22 0 -26 C 3 -22 4 -12 0 0 Z" />
      </g>
    </g>
  );
}
