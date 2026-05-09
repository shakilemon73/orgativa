export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  weight: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  badge?: string;
  description: string;
  highlights: string[];
  origin: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "wild-forest-honey",
    name: "Wild Forest Honey",
    category: "Honey",
    categorySlug: "honey",
    weight: "500g Net wt.",
    price: 2400,
    originalPrice: 2800,
    rating: 5,
    reviews: 42,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOuWkZmVQOm9mTIlZMs0yKmUQgzUb9t2X-H8Bqcw_jMA19Xg3r9RxZHueHSssW9BEdAsoBE-1ArJfAXM1-bY2LWvli8I6ORJfLjtTxFOojBApcyYIQfdjZ5uddeHETIb79GEcGTw-qqVHRMZ30YjLwjApQcm3xan0Sxjj1_IilIis3b8FT5kKBYije_rX2FLVkWZC5ycakZwHeoev35K-uaTKNMf54GkvnprZvESneoKbefsticw0Q_sGc-cIk2NBSACdii1gSx",
    ],
    badge: "Best Seller",
    description: "Sourced from the pristine Sundarbans mangrove forest, this raw wild honey is unfiltered and unheated — preserving every enzyme, antioxidant, and natural flavor compound. Each jar carries the subtle floral notes of Khalsi blossoms, with a deep amber hue that reflects its extraordinary purity.",
    highlights: [
      "100% raw, unfiltered, unheated",
      "Sourced from Sundarbans, Bangladesh",
      "Rich in antioxidants & enzymes",
      "No additives, no preservatives",
      "Lab-tested for purity",
    ],
    origin: "Sundarbans, Bangladesh",
    inStock: true,
  },
  {
    id: 2,
    slug: "cold-pressed-mustard-oil",
    name: "Cold-Pressed Mustard Oil",
    category: "Grocery",
    categorySlug: "grocery",
    weight: "750ml • Virgin Grade",
    price: 1850,
    originalPrice: 2200,
    rating: 4,
    reviews: 28,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GzOFWh1pgalQi48-L6jXrnrBdcvDxK-Gb2S8CCtBZFhvlX6tSY2Kz_j7uleHESVRHEh2qnBrg-_pdX-Ks_uVdKF5QPfZpif5WE-0yV3F0MmXlPDL9MqfTONTNjX7iazXEden3BKL14y5eckX2gd8w4dug-rDpGiPJIq0JpnVgtv8zQNZ2mKOn1kg3Iisw4JEuaZNxS0M2pjAGoHHG_zXdz9MCZGlp3pmHyrpaZ0fMr2frPb0LRDYEWVdycoyfZpBlnXXx4gm11UX",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GzOFWh1pgalQi48-L6jXrnrBdcvDxK-Gb2S8CCtBZFhvlX6tSY2Kz_j7uleHESVRHEh2qnBrg-_pdX-Ks_uVdKF5QPfZpif5WE-0yV3F0MmXlPDL9MqfTONTNjX7iazXEden3BKL14y5eckX2gd8w4dug-rDpGiPJIq0JpnVgtv8zQNZ2mKOn1kg3Iisw4JEuaZNxS0M2pjAGoHHG_zXdz9MCZGlp3pmHyrpaZ0fMr2frPb0LRDYEWVdycoyfZpBlnXXx4gm11UX",
    ],
    badge: "Organic",
    description: "Extracted using traditional cold-press stone-grinding, this virgin mustard oil retains its natural pungency, omega-3 fatty acids, and glucosinolates. A staple of Bengali cooking, it adds an unmistakable depth to fish curries, bharta, and salads.",
    highlights: [
      "First cold-press extraction",
      "Retains natural glucosinolates",
      "Rich in omega-3 & omega-6",
      "No hexane or chemical solvents",
      "Traditional stone-ground method",
    ],
    origin: "Rajshahi, Bangladesh",
    inStock: true,
  },
  {
    id: 3,
    slug: "premium-pistachios",
    name: "Premium Pistachios",
    category: "Dry Fruits",
    categorySlug: "dry-fruits",
    weight: "250g • Roasted",
    price: 3200,
    rating: 5,
    reviews: 156,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_9aStLOUy3wxdgtym2iJwX-mmsl6jPJD6ecTZT3ziz2Tj-7pVXrqDCQtEOQ1kzc5XZ9Y9EX1rThCwppLb5Ba6F1-DP_5Gj-P6rlShkJGl9-jVC03jtFGxY5OQAGu5T5uN8a7exjnEslKqzIgo2XojJ3Sut175FRnz4WnEjtZRYIDTFSiYFVbuvsJ9GqCw4_PbgqjDXCx8QA7F61_Axk_Oki0NTEjqUGDoqK2smHnSmqtEy_xZKZrNfTpDdaKzmjBG3-bkpQClACP",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_9aStLOUy3wxdgtym2iJwX-mmsl6jPJD6ecTZT3ziz2Tj-7pVXrqDCQtEOQ1kzc5XZ9Y9EX1rThCwppLb5Ba6F1-DP_5Gj-P6rlShkJGl9-jVC03jtFGxY5OQAGu5T5uN8a7exjnEslKqzIgo2XojJ3Sut175FRnz4WnEjtZRYIDTFSiYFVbuvsJ9GqCw4_PbgqjDXCx8QA7F61_Axk_Oki0NTEjqUGDoqK2smHnSmqtEy_xZKZrNfTpDdaKzmjBG3-bkpQClACP",
    ],
    badge: "Premium",
    description: "Hand-selected from the finest Iranian orchards, these pistachios are lightly roasted to enhance their natural buttery sweetness. Packed with protein, healthy fats, and antioxidants, they are the perfect guilt-free indulgence.",
    highlights: [
      "Hand-selected premium grade",
      "Lightly roasted, no added oil",
      "Source of plant-based protein",
      "Rich in antioxidants",
      "Resealable kraft packaging",
    ],
    origin: "Iran (via Orgativa import)",
    inStock: true,
  },
  {
    id: 4,
    slug: "hand-churned-ghee",
    name: "Hand-Churned Ghee",
    category: "Grocery",
    categorySlug: "grocery",
    weight: "Traditional Artisanal",
    price: 2800,
    originalPrice: 3200,
    rating: 4,
    reviews: 89,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANdJPuajyHXCp7iaCYfSFlXnopP1beP-KgAbmdmX1lt5SMH_C3_9CLD2By3zJ9krkw5PF9Lml-mSOEcTLSfbSkb3Qf5-BiRlT8A_QYfY28tect19CUj5EWHG5_LMQXowf87L424S9yL1awzpv4dLpT9PrXFkcJypZtLB0Zp5E3ovtK7vzAHW5AcmfLKILDwZsvVPYSXiuRO1Yn4MUTCCmm7gzOYg-sd9yHviieYhyrn2p93b--_W8qcR-J1-6HWrVbTZqUfedVRsuE",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANdJPuajyHXCp7iaCYfSFlXnopP1beP-KgAbmdmX1lt5SMH_C3_9CLD2By3zJ9krkw5PF9Lml-mSOEcTLSfbSkb3Qf5-BiRlT8A_QYfY28tect19CUj5EWHG5_LMQXowf87L424S9yL1awzpv4dLpT9PrXFkcJypZtLB0Zp5E3ovtK7vzAHW5AcmfLKILDwZsvVPYSXiuRO1Yn4MUTCCmm7gzOYg-sd9yHviieYhyrn2p93b--_W8qcR-J1-6HWrVbTZqUfedVRsuE",
    ],
    badge: "Artisanal",
    description: "Made in small batches using the traditional bilona method — where curd is hand-churned into butter before being slow-cooked into golden ghee. This time-honoured Bangladeshi craft produces a ghee of extraordinary richness, clarity, and aroma.",
    highlights: [
      "Traditional bilona method",
      "A2 deshi cow milk",
      "Slow-cooked, small batch",
      "Granular texture = pure ghee",
      "Free from additives & colors",
    ],
    origin: "Pabna, Bangladesh",
    inStock: true,
  },
  {
    id: 5,
    slug: "organic-turmeric-powder",
    name: "Organic Turmeric Powder",
    category: "Spices",
    categorySlug: "spices",
    weight: "200g • Ground",
    price: 850,
    rating: 5,
    reviews: 203,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    ],
    badge: "Organic",
    description: "Stone-ground from fresh Lakadong turmeric roots — renowned for the highest curcumin content globally (7–12%). A vibrant golden powder that transforms any dish while delivering powerful anti-inflammatory benefits.",
    highlights: [
      "High curcumin: 7–12%",
      "Stone-ground, not spray-dried",
      "No fillers or starch",
      "Deep golden color & aroma",
      "Third-party lab certified",
    ],
    origin: "Sylhet, Bangladesh",
    inStock: true,
  },
  {
    id: 6,
    slug: "green-tea-garden-fresh",
    name: "Garden Fresh Green Tea",
    category: "Tea & Coffee",
    categorySlug: "tea-coffee",
    weight: "100g • Loose Leaf",
    price: 1200,
    rating: 4,
    reviews: 67,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z",
    ],
    badge: "Fresh Harvest",
    description: "Hand-plucked from the rolling hills of Sylhet's tea gardens, these tender first-flush leaves are lightly steamed and dried to preserve their grassy, vegetal sweetness. A cup of pure Bangladesh in every sip.",
    highlights: [
      "First-flush spring harvest",
      "Hand-plucked two leaves & bud",
      "Light oxidation, high antioxidants",
      "Pesticide & chemical-free garden",
      "Foil-sealed for freshness",
    ],
    origin: "Sylhet Tea Gardens, Bangladesh",
    inStock: true,
  },
  {
    id: 7,
    slug: "organic-black-seed",
    name: "Organic Black Seed Oil",
    category: "Wellness",
    categorySlug: "wellness",
    weight: "200ml • Cold Pressed",
    price: 1950,
    rating: 5,
    reviews: 118,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OyRQIUdiUI7it70igzeO1DTJ9YVekCu-ry2N4leQLGGJ2HnFGn6XSMYhcje8nPa_PoQ5FB6g88WYGzb02d37Zq9ir4WXr8GE9D-K1PzV5rUZptriy8g_Vu4EfEvRPZ-YZGgJASwN0dK16Z1y_ObdW6cjCibodpBPVuYhQfTFQZLQEezNI7wMDjY6Dt7wMv6J-Jz9fOqlQo4bB9DLKVJNyleZ6iXTM_vVJPgDhWXmX8PxwfdNM2TBvoAtMbDolXEu0eaewM9PD8WT",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OyRQIUdiUI7it70igzeO1DTJ9YVekCu-ry2N4leQLGGJ2HnFGn6XSMYhcje8nPa_PoQ5FB6g88WYGzb02d37Zq9ir4WXr8GE9D-K1PzV5rUZptriy8g_Vu4EfEvRPZ-YZGgJASwN0dK16Z1y_ObdW6cjCibodpBPVuYhQfTFQZLQEezNI7wMDjY6Dt7wMv6J-Jz9fOqlQo4bB9DLKVJNyleZ6iXTM_vVJPgDhWXmX8PxwfdNM2TBvoAtMbDolXEu0eaewM9PD8WT",
    ],
    badge: "Wellness",
    description: "Called 'the cure for everything except death' in traditional medicine, this cold-pressed Nigella sativa oil is extracted from Ethiopian black seeds using low-heat pressing to preserve thymoquinone — the key bioactive compound.",
    highlights: [
      "High thymoquinone content",
      "Cold-pressed, zero heat",
      "Immune & respiratory support",
      "Premium Ethiopian black seeds",
      "Dark glass bottle for preservation",
    ],
    origin: "Ethiopia (via Orgativa)",
    inStock: true,
  },
  {
    id: 8,
    slug: "organic-basmati-rice",
    name: "Organic Basmati Rice",
    category: "Grains",
    categorySlug: "grains",
    weight: "1kg • Aged 2 Years",
    price: 1100,
    rating: 4,
    reviews: 74,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    ],
    badge: "Aged",
    description: "Naturally aged for 2 years in climate-controlled silos, these long-grain basmati grains cook up separate, fluffy, and fragrant. Organically farmed without chemical fertilizers, they carry the authentic aroma that has made Bangladeshi biryani legendary.",
    highlights: [
      "Aged 2 years for extra aroma",
      "Extra-long grain variety",
      "Organically grown, no chemicals",
      "Cooks separate and fluffy",
      "Resealable food-safe packaging",
    ],
    origin: "Dinajpur, Bangladesh",
    inStock: true,
  },
];

export const categories = [
  { slug: "grocery", label: "Grocery", icon: "shopping_basket", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql", count: 24 },
  { slug: "wellness", label: "Wellness", icon: "spa", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z", count: 18 },
  { slug: "dry-fruits", label: "Dry Fruits", icon: "nutrition", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OyRQIUdiUI7it70igzeO1DTJ9YVekCu-ry2N4leQLGGJ2HnFGn6XSMYhcje8nPa_PoQ5FB6g88WYGzb02d37Zq9ir4WXr8GE9D-K1PzV5rUZptriy8g_Vu4EfEvRPZ-YZGgJASwN0dK16Z1y_ObdW6cjCibodpBPVuYhQfTFQZLQEezNI7wMDjY6Dt7wMv6J-Jz9fOqlQo4bB9DLKVJNyleZ6iXTM_vVJPgDhWXmX8PxwfdNM2TBvoAtMbDolXEu0eaewM9PD8WT", count: 32 },
  { slug: "honey", label: "Honey", icon: "hive", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOuWkZmVQOm9mTIlZMs0yKmUQgzUb9t2X-H8Bqcw_jMA19Xg3r9RxZHueHSssW9BEdAsoBE-1ArJfAXM1-bY2LWvli8I6ORJfLjtTxFOojBApcyYIQfdjZ5uddeHETIb79GEcGTw-qqVHRMZ30YjLwjApQcm3xan0Sxjj1_IilIis3b8FT5kKBYije_rX2FLVkWZC5ycakZwHeoev35K-uaTKNMf54GkvnprZvESneoKbefsticw0Q_sGc-cIk2NBSACdii1gSx", count: 12 },
  { slug: "spices", label: "Spices", icon: "local_fire_department", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7", count: 28 },
  { slug: "tea-coffee", label: "Tea & Coffee", icon: "coffee", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z", count: 15 },
  { slug: "grains", label: "Grains", icon: "grain", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql", count: 20 },
];

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-BD")}`;
}
