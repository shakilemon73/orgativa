import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Wild Forest Honey",
    weight: "500g Net wt.",
    price: "৳2,400",
    rating: 5,
    reviews: 42,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7",
  },
  {
    id: 2,
    name: "Cold-Pressed Oil",
    weight: "750ml • Virgin Grade",
    price: "৳1,850",
    rating: 4,
    reviews: 28,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GzOFWh1pgalQi48-L6jXrnrBdcvDxK-Gb2S8CCtBZFhvlX6tSY2Kz_j7uleHESVRHEh2qnBrg-_pdX-Ks_uVdKF5QPfZpif5WE-0yV3F0MmXlPDL9MqfTONTNjX7iazXEden3BKL14y5eckX2gd8w4dug-rDpGiPJIq0JpnVgtv8zQNZ2mKOn1kg3Iisw4JEuaZNxS0M2pjAGoHHG_zXdz9MCZGlp3pmHyrpaZ0fMr2frPb0LRDYEWVdycoyfZpBlnXXx4gm11UX",
  },
  {
    id: 3,
    name: "Premium Pistachios",
    weight: "250g • Roasted",
    price: "৳3,200",
    rating: 5,
    reviews: 156,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_9aStLOUy3wxdgtym2iJwX-mmsl6jPJD6ecTZT3ziz2Tj-7pVXrqDCQtEOQ1kzc5XZ9Y9EX1rThCwppLb5Ba6F1-DP_5Gj-P6rlShkJGl9-jVC03jtFGxY5OQAGu5T5uN8a7exjnEslKqzIgo2XojJ3Sut175FRnz4WnEjtZRYIDTFSiYFVbuvsJ9GqCw4_PbgqjDXCx8QA7F61_Axk_Oki0NTEjqUGDoqK2smHnSmqtEy_xZKZrNfTpDdaKzmjBG3-bkpQClACP",
  },
  {
    id: 4,
    name: "Hand-Churned Ghee",
    weight: "Traditional Artisanal",
    price: "৳2,800",
    rating: 4,
    reviews: 89,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANdJPuajyHXCp7iaCYfSFlXnopP1beP-KgAbmdmX1lt5SMH_C3_9CLD2By3zJ9krkw5PF9Lml-mSOEcTLSfbSkb3Qf5-BiRlT8A_QYfY28tect19CUj5EWHG5_LMQXowf87L424S9yL1awzpv4dLpT9PrXFkcJypZtLB0Zp5E3ovtK7vzAHW5AcmfLKILDwZsvVPYSXiuRO1Yn4MUTCCmm7gzOYg-sd9yHviieYhyrn2p93b--_W8qcR-J1-6HWrVbTZqUfedVRsuE",
  },
];

export default function Products() {
  return (
    <section style={{ marginTop: "120px", marginBottom: "96px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "48px",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "#2D5A27",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: "0.15em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            The Favorites
          </span>
          <h2
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "40px",
              color: "#1A1C1C",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Our Seasonal Favorites
          </h2>
        </div>
        <a
          href="#"
          style={{
            fontSize: "14px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#434843",
            fontWeight: 500,
            textDecoration: "none",
            border: "1px solid #C3C8C1",
            padding: "12px 24px",
            borderRadius: "8px",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#2D5A27";
            (e.currentTarget as HTMLElement).style.color = "#2D5A27";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#C3C8C1";
            (e.currentTarget as HTMLElement).style.color = "#434843";
          }}
        >
          View Collection
        </a>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined${star <= rating ? " fill" : ""}`}
          style={{
            fontSize: "14px",
            color: star <= rating ? "#2D5A27" : "#C3C8C1",
          }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: (typeof products)[0];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="hover-lift"
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #E8E8E8",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          aspectRatio: "1 / 1",
          backgroundColor: "#F3F3F4",
          overflow: "hidden",
          position: "relative",
          padding: "32px",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "#2D5A27",
            color: "white",
            padding: "2px 8px",
            fontSize: "9px",
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.1em",
            borderRadius: "2px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Organic
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
          <StarRating rating={product.rating} />
          <span
            style={{
              fontSize: "11px",
              color: "#a8a29e",
              marginLeft: "4px",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ({product.reviews})
          </span>
        </div>
        <h4
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "20px",
            color: hovered ? "#2D5A27" : "#1A1C1C",
            marginBottom: "4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
        >
          {product.name}
        </h4>
        <p
          style={{
            color: "rgba(67,72,67,0.6)",
            fontSize: "13px",
            marginBottom: "24px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {product.weight}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#1A1C1C",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {product.price}
          </span>
          <button
            aria-label="Add to cart"
            style={{
              backgroundColor: "#2D5A27",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(45,90,39,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(0.9)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
