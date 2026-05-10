import { useResponsive } from "@/hooks/use-responsive";

const items = [
  { icon: "local_shipping", title: "বিনামূল্যে ডেলিভারি", desc: "বাংলাদেশে ৳১,০০০+ সকল অর্ডারে বিনামূল্যে ডেলিভারি", color: "#2D5A27" },
  { icon: "verified_user", title: "১০০% খাঁটি পণ্য", desc: "ল্যাব-পরীক্ষিত, প্রত্যয়িত অর্গানিক। কোনো আপস নেই।", color: "#7C3AED" },
  { icon: "replay", title: "সহজ ৭ দিনের রিটার্ন", desc: "সন্তুষ্ট না? ঝামেলামুক্ত রিটার্ন, কোনো প্রশ্ন নেই।", color: "#0891B2" },
  { icon: "support_agent", title: "২৪/৭ সহায়তা", desc: "বাংলায় হোয়াটসঅ্যাপ ও ফোন সহায়তা সবসময় পাবেন।", color: "#D64545" },
];

export default function TrustBanner() {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)";
  const px = isMobile ? "16px" : isTablet ? "24px" : "48px";

  return (
    <div style={{ backgroundColor: "#fff", borderTop: "1px solid #EEEEEE", borderBottom: "1px solid #EEEEEE", padding: `${isMobile ? 28 : 40}px ${px}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: cols, gap: isMobile ? 20 : 24 }}>
        {items.map((item) => (
          <TrustItem key={item.title} item={item} compact={isMobile} />
        ))}
      </div>
    </div>
  );
}

function TrustItem({ item, compact }: { item: typeof items[0]; compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: compact ? 12 : 16 }}>
      <div style={{ width: compact ? 40 : 48, height: compact ? 40 : 48, borderRadius: 12, backgroundColor: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span className="material-symbols-outlined" style={{ fontSize: compact ? 20 : 24, color: item.color }}>{item.icon}</span>
      </div>
      <div>
        <p style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: "0 0 3px" }}>{item.title}</p>
        <p style={{ fontSize: compact ? 11 : 12, color: "#737973", fontFamily: "'Inter',sans-serif", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
      </div>
    </div>
  );
}
