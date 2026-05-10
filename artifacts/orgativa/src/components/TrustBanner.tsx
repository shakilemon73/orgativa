const items = [
  { icon: "local_shipping", title: "বিনামূল্যে ডেলিভারি", desc: "বাংলাদেশে ৳১,০০০+ সকল অর্ডারে বিনামূল্যে ডেলিভারি", color: "#2D5A27" },
  { icon: "verified_user", title: "১০০% খাঁটি পণ্য", desc: "ল্যাব-পরীক্ষিত, প্রত্যয়িত অর্গানিক। কোনো আপস নেই।", color: "#7C3AED" },
  { icon: "replay", title: "সহজ ৭ দিনের রিটার্ন", desc: "সন্তুষ্ট না? ঝামেলামুক্ত রিটার্ন, কোনো প্রশ্ন নেই।", color: "#0891B2" },
  { icon: "support_agent", title: "২৪/৭ সহায়তা", desc: "বাংলায় হোয়াটসঅ্যাপ ও ফোন সহায়তা সবসময় পাবেন।", color: "#D64545" },
];

export default function TrustBanner() {
  return (
    <div style={{ backgroundColor: "#fff", borderTop: "1px solid #EEEEEE", borderBottom: "1px solid #EEEEEE", padding: "40px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {items.map((item) => (
          <TrustItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function TrustItem({ item }: { item: typeof items[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: item.color }}>{item.icon}</span>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1C1C", fontFamily: "'Inter',sans-serif", margin: "0 0 3px" }}>{item.title}</p>
        <p style={{ fontSize: 12, color: "#737973", fontFamily: "'Inter',sans-serif", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
      </div>
    </div>
  );
}
