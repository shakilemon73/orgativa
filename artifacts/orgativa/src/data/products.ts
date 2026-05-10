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
    name: "বন্য বনের মধু",
    category: "মধু",
    categorySlug: "honey",
    weight: "৫০০ গ্রাম নিট",
    price: 2400,
    originalPrice: 2800,
    rating: 5,
    reviews: 42,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOuWkZmVQOm9mTIlZMs0yKmUQgzUb9t2X-H8Bqcw_jMA19Xg3r9RxZHueHSssW9BEdAsoBE-1ArJfAXM1-bY2LWvli8I6ORJfLjtTxFOojBApcyYIQfdjZ5uddeHETIb79GEcGTw-qqVHRMZ30YjLwjApQcm3xan0Sxjj1_IilIis3b8FT5kKBYije_rX2FLVkWZC5ycakZwHeoev35K-uaTKNMf54GkvnprZvESneoKbefsticw0Q_sGc-cIk2NBSACdii1gSx",
    ],
    badge: "সেরা বিক্রয়",
    description: "সুন্দরবনের বিশুদ্ধ ম্যানগ্রোভ বন থেকে সংগ্রহ করা এই কাঁচা বন্য মধু অফিল্টার্ড ও তাপমুক্ত — প্রতিটি এনজাইম, অ্যান্টিঅক্সিডেন্ট ও প্রাকৃতিক স্বাদ সংরক্ষিত। প্রতিটি বয়ামে রয়েছে খলসি ফুলের মিষ্টি সুবাস এবং গভীর অ্যাম্বার রঙ।",
    highlights: [
      "১০০% কাঁচা, অফিল্টার্ড ও তাপমুক্ত",
      "সুন্দরবন, বাংলাদেশ থেকে সংগ্রহ",
      "অ্যান্টিঅক্সিডেন্ট ও এনজাইম সমৃদ্ধ",
      "কোনো সংযোজন বা সংরক্ষক নেই",
      "বিশুদ্ধতার জন্য ল্যাব-পরীক্ষিত",
    ],
    origin: "সুন্দরবন, বাংলাদেশ",
    inStock: true,
  },
  {
    id: 2,
    slug: "cold-pressed-mustard-oil",
    name: "ঠান্ডা চাপা সরিষার তেল",
    category: "মুদিখানা",
    categorySlug: "grocery",
    weight: "৭৫০ মিলি · ভার্জিন গ্রেড",
    price: 1850,
    originalPrice: 2200,
    rating: 4,
    reviews: 28,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GzOFWh1pgalQi48-L6jXrnrBdcvDxK-Gb2S8CCtBZFhvlX6tSY2Kz_j7uleHESVRHEh2qnBrg-_pdX-Ks_uVdKF5QPfZpif5WE-0yV3F0MmXlPDL9MqfTONTNjX7iazXEden3BKL14y5eckX2gd8w4dug-rDpGiPJIq0JpnVgtv8zQNZ2mKOn1kg3Iisw4JEuaZNxS0M2pjAGoHHG_zXdz9MCZGlp3pmHyrpaZ0fMr2frPb0LRDYEWVdycoyfZpBlnXXx4gm11UX",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GzOFWh1pgalQi48-L6jXrnrBdcvDxK-Gb2S8CCtBZFhvlX6tSY2Kz_j7uleHESVRHEh2qnBrg-_pdX-Ks_uVdKF5QPfZpif5WE-0yV3F0MmXlPDL9MqfTONTNjX7iazXEden3BKL14y5eckX2gd8w4dug-rDpGiPJIq0JpnVgtv8zQNZ2mKOn1kg3Iisw4JEuaZNxS0M2pjAGoHHG_zXdz9MCZGlp3pmHyrpaZ0fMr2frPb0LRDYEWVdycoyfZpBlnXXx4gm11UX",
    ],
    badge: "অর্গানিক",
    description: "ঐতিহ্যবাহী ঠান্ডা চাপা পাথর ভাঙা পদ্ধতিতে তৈরি এই ভার্জিন সরিষার তেল প্রাকৃতিক ঝাঁজ, ওমেগা-৩ ফ্যাটি অ্যাসিড ও গ্লুকোসিনোলেট সংরক্ষণ করে। বাংলাদেশের রান্নার অপরিহার্য এই তেল মাছের ঝোল, ভর্তা ও সালাদে অসাধারণ গভীরতা যোগ করে।",
    highlights: [
      "প্রথম ঠান্ডা চাপা নিষ্কাশন",
      "প্রাকৃতিক গ্লুকোসিনোলেট বজায় রাখে",
      "ওমেগা-৩ ও ওমেগা-৬ সমৃদ্ধ",
      "কোনো হেক্সেন বা রাসায়নিক নেই",
      "ঐতিহ্যবাহী পাথর ভাঙা পদ্ধতি",
    ],
    origin: "রাজশাহী, বাংলাদেশ",
    inStock: true,
  },
  {
    id: 3,
    slug: "premium-pistachios",
    name: "প্রিমিয়াম পেস্তা বাদাম",
    category: "শুকনো ফল",
    categorySlug: "dry-fruits",
    weight: "২৫০ গ্রাম · ভাজা",
    price: 3200,
    rating: 5,
    reviews: 156,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_9aStLOUy3wxdgtym2iJwX-mmsl6jPJD6ecTZT3ziz2Tj-7pVXrqDCQtEOQ1kzc5XZ9Y9EX1rThCwppLb5Ba6F1-DP_5Gj-P6rlShkJGl9-jVC03jtFGxY5OQAGu5T5uN8a7exjnEslKqzIgo2XojJ3Sut175FRnz4WnEjtZRYIDTFSiYFVbuvsJ9GqCw4_PbgqjDXCx8QA7F61_Axk_Oki0NTEjqUGDoqK2smHnSmqtEy_xZKZrNfTpDdaKzmjBG3-bkpQClACP",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_9aStLOUy3wxdgtym2iJwX-mmsl6jPJD6ecTZT3ziz2Tj-7pVXrqDCQtEOQ1kzc5XZ9Y9EX1rThCwppLb5Ba6F1-DP_5Gj-P6rlShkJGl9-jVC03jtFGxY5OQAGu5T5uN8a7exjnEslKqzIgo2XojJ3Sut175FRnz4WnEjtZRYIDTFSiYFVbuvsJ9GqCw4_PbgqjDXCx8QA7F61_Axk_Oki0NTEjqUGDoqK2smHnSmqtEy_xZKZrNfTpDdaKzmjBG3-bkpQClACP",
    ],
    badge: "প্রিমিয়াম",
    description: "ইরানের সেরা বাগান থেকে হাতে বাছাই করা এই পেস্তা বাদাম হালকাভাবে ভেজে প্রাকৃতিক মাখনের মতো মিষ্টি স্বাদ বাড়ানো হয়েছে। প্রোটিন, স্বাস্থ্যকর চর্বি ও অ্যান্টিঅক্সিডেন্টে পরিপূর্ণ।",
    highlights: [
      "হাতে বাছাই প্রিমিয়াম মানের",
      "হালকা ভাজা, তেল ছাড়া",
      "উদ্ভিদ-ভিত্তিক প্রোটিনের উৎস",
      "অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ",
      "পুনরায় সিলযোগ্য প্যাকেজিং",
    ],
    origin: "ইরান (অর্গাটিভা আমদানি)",
    inStock: true,
  },
  {
    id: 4,
    slug: "hand-churned-ghee",
    name: "হাতে তৈরি ঘি",
    category: "মুদিখানা",
    categorySlug: "grocery",
    weight: "ঐতিহ্যবাহী কারিগরি",
    price: 2800,
    originalPrice: 3200,
    rating: 4,
    reviews: 89,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANdJPuajyHXCp7iaCYfSFlXnopP1beP-KgAbmdmX1lt5SMH_C3_9CLD2By3zJ9krkw5PF9Lml-mSOEcTLSfbSkb3Qf5-BiRlT8A_QYfY28tect19CUj5EWHG5_LMQXowf87L424S9yL1awzpv4dLpT9PrXFkcJypZtLB0Zp5E3ovtK7vzAHW5AcmfLKILDwZsvVPYSXiuRO1Yn4MUTCCmm7gzOYg-sd9yHviieYhyrn2p93b--_W8qcR-J1-6HWrVbTZqUfedVRsuE",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANdJPuajyHXCp7iaCYfSFlXnopP1beP-KgAbmdmX1lt5SMH_C3_9CLD2By3zJ9krkw5PF9Lml-mSOEcTLSfbSkb3Qf5-BiRlT8A_QYfY28tect19CUj5EWHG5_LMQXowf87L424S9yL1awzpv4dLpT9PrXFkcJypZtLB0Zp5E3ovtK7vzAHW5AcmfLKILDwZsvVPYSXiuRO1Yn4MUTCCmm7gzOYg-sd9yHviieYhyrn2p93b--_W8qcR-J1-6HWrVbTZqUfedVRsuE",
    ],
    badge: "ঐতিহ্যবাহী",
    description: "ঐতিহ্যবাহী বিলোনা পদ্ধতিতে ছোট ব্যাচে তৈরি — যেখানে দই হাতে মাখন করে ধীরে ধীরে রান্না করে সোনালী ঘি তৈরি হয়। এই বাংলাদেশি কারিগরি ঐতিহ্য অসাধারণ সুবাস ও স্বচ্ছতার ঘি উৎপন্ন করে।",
    highlights: [
      "ঐতিহ্যবাহী বিলোনা পদ্ধতি",
      "দেশি গরুর A2 দুধ",
      "ধীরে রান্না, ছোট ব্যাচ",
      "দানাদার গঠন = বিশুদ্ধ ঘি",
      "কোনো সংযোজন বা রঙ নেই",
    ],
    origin: "পাবনা, বাংলাদেশ",
    inStock: true,
  },
  {
    id: 5,
    slug: "organic-turmeric-powder",
    name: "জৈব হলুদ গুঁড়া",
    category: "মশলা",
    categorySlug: "spices",
    weight: "২০০ গ্রাম · গুঁড়া",
    price: 850,
    rating: 5,
    reviews: 203,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    ],
    badge: "অর্গানিক",
    description: "তাজা লাকাডং হলুদের শিকড় থেকে পাথরে গুঁড়া করা — বিশ্বে সর্বোচ্চ কারকিউমিন পরিমাণের জন্য বিখ্যাত (৭–১২%)। একটি উজ্জ্বল সোনালী গুঁড়া যা যেকোনো রান্নাকে সুন্দর করে এবং শক্তিশালী প্রদাহবিরোধী গুণ প্রদান করে।",
    highlights: [
      "উচ্চ কারকিউমিন: ৭–১২%",
      "পাথরে গুঁড়া, স্প্রে-শুকানো নয়",
      "কোনো ভেজাল বা স্টার্চ নেই",
      "গভীর সোনালী রঙ ও সুবাস",
      "তৃতীয় পক্ষ ল্যাব প্রত্যয়িত",
    ],
    origin: "সিলেট, বাংলাদেশ",
    inStock: true,
  },
  {
    id: 6,
    slug: "green-tea-garden-fresh",
    name: "বাগান তাজা সবুজ চা",
    category: "চা ও কফি",
    categorySlug: "tea-coffee",
    weight: "১০০ গ্রাম · লুজ লিফ",
    price: 1200,
    rating: 4,
    reviews: 67,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z",
    ],
    badge: "তাজা ফসল",
    description: "সিলেটের চা বাগানের ঢেউখেলানো পাহাড় থেকে হাতে তুলা এই প্রথম ফ্লাশের পাতা হালকাভাবে বাষ্পে প্রক্রিয়াজাত করা হয়। প্রতিটি চুমুকে বাংলাদেশের বিশুদ্ধ প্রকৃতির স্বাদ।",
    highlights: [
      "প্রথম বসন্তের ফ্লাশ ফসল",
      "হাতে তোলা দুই পাতা ও কুঁড়ি",
      "হালকা অক্সিডেশন, উচ্চ অ্যান্টিঅক্সিডেন্ট",
      "কীটনাশক ও রাসায়নিকমুক্ত বাগান",
      "তাজা রাখতে ফয়েল-সিলড",
    ],
    origin: "সিলেট চা বাগান, বাংলাদেশ",
    inStock: true,
  },
  {
    id: 7,
    slug: "organic-black-seed",
    name: "জৈব কালিজিরার তেল",
    category: "স্বাস্থ্য",
    categorySlug: "wellness",
    weight: "২০০ মিলি · ঠান্ডা চাপা",
    price: 1950,
    rating: 5,
    reviews: 118,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OyRQIUdiUI7it70igzeO1DTJ9YVekCu-ry2N4leQLGGJ2HnFGn6XSMYhcje8nPa_PoQ5FB6g88WYGzb02d37Zq9ir4WXr8GE9D-K1PzV5rUZptriy8g_Vu4EfEvRPZ-YZGgJASwN0dK16Z1y_ObdW6cjCibodpBPVuYhQfTFQZLQEezNI7wMDjY6Dt7wMv6J-Jz9fOqlQo4bB9DLKVJNyleZ6iXTM_vVJPgDhWXmX8PxwfdNM2TBvoAtMbDolXEu0eaewM9PD8WT",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OyRQIUdiUI7it70igzeO1DTJ9YVekCu-ry2N4leQLGGJ2HnFGn6XSMYhcje8nPa_PoQ5FB6g88WYGzb02d37Zq9ir4WXr8GE9D-K1PzV5rUZptriy8g_Vu4EfEvRPZ-YZGgJASwN0dK16Z1y_ObdW6cjCibodpBPVuYhQfTFQZLQEezNI7wMDjY6Dt7wMv6J-Jz9fOqlQo4bB9DLKVJNyleZ6iXTM_vVJPgDhWXmX8PxwfdNM2TBvoAtMbDolXEu0eaewM9PD8WT",
    ],
    badge: "স্বাস্থ্যকর",
    description: "ঐতিহ্যবাহী চিকিৎসায় 'মৃত্যু ছাড়া সব রোগের ওষুধ' বলে পরিচিত এই ঠান্ডা চাপা নাইজেলা সাটিভা তেল ইথিওপিয়ার কালিজিরা থেকে নিম্ন-তাপে চাপ দিয়ে তৈরি — থাইমোকুইনোন সংরক্ষণের জন্য।",
    highlights: [
      "উচ্চ থাইমোকুইনোন পরিমাণ",
      "ঠান্ডা চাপা, শূন্য তাপ",
      "রোগ প্রতিরোধ ও শ্বাসতন্ত্র সহায়তা",
      "প্রিমিয়াম ইথিওপিয়ান কালিজিরা",
      "সংরক্ষণের জন্য গাঢ় কাচের বোতল",
    ],
    origin: "ইথিওপিয়া (অর্গাটিভা আমদানি)",
    inStock: true,
  },
  {
    id: 8,
    slug: "organic-basmati-rice",
    name: "জৈব বাসমতি চাল",
    category: "শস্য",
    categorySlug: "grains",
    weight: "১ কেজি · ২ বছর পুরানো",
    price: 1100,
    rating: 4,
    reviews: 74,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql",
    ],
    badge: "পুরাতন",
    description: "জলবায়ু-নিয়ন্ত্রিত গুদামে ২ বছর প্রাকৃতিকভাবে পুরানো এই লং-গ্রেইন বাসমতি চাল রান্নায় আলাদা, ফুলকো ও সুগন্ধি হয়। রাসায়নিক সার ছাড়া জৈব চাষে উৎপাদিত, বাংলাদেশের বিখ্যাত বিরিয়ানির আসল সুবাস।",
    highlights: [
      "অতিরিক্ত সুবাসের জন্য ২ বছর পুরানো",
      "এক্সট্রা-লং গ্রেইন",
      "জৈব চাষ, কোনো রাসায়নিক নেই",
      "আলাদা ও ফুলকো রান্না হয়",
      "পুনরায় সিলযোগ্য ফুড-সেফ প্যাকেজিং",
    ],
    origin: "দিনাজপুর, বাংলাদেশ",
    inStock: true,
  },
];

export const categories = [
  { slug: "grocery", label: "মুদিখানা", icon: "shopping_basket", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql", count: 24 },
  { slug: "wellness", label: "স্বাস্থ্য", icon: "spa", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z", count: 18 },
  { slug: "dry-fruits", label: "শুকনো ফল", icon: "nutrition", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4OyRQIUdiUI7it70igzeO1DTJ9YVekCu-ry2N4leQLGGJ2HnFGn6XSMYhcje8nPa_PoQ5FB6g88WYGzb02d37Zq9ir4WXr8GE9D-K1PzV5rUZptriy8g_Vu4EfEvRPZ-YZGgJASwN0dK16Z1y_ObdW6cjCibodpBPVuYhQfTFQZLQEezNI7wMDjY6Dt7wMv6J-Jz9fOqlQo4bB9DLKVJNyleZ6iXTM_vVJPgDhWXmX8PxwfdNM2TBvoAtMbDolXEu0eaewM9PD8WT", count: 32 },
  { slug: "honey", label: "মধু", icon: "hive", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOuWkZmVQOm9mTIlZMs0yKmUQgzUb9t2X-H8Bqcw_jMA19Xg3r9RxZHueHSssW9BEdAsoBE-1ArJfAXM1-bY2LWvli8I6ORJfLjtTxFOojBApcyYIQfdjZ5uddeHETIb79GEcGTw-qqVHRMZ30YjLwjApQcm3xan0Sxjj1_IilIis3b8FT5kKBYije_rX2FLVkWZC5ycakZwHeoev35K-uaTKNMf54GkvnprZvESneoKbefsticw0Q_sGc-cIk2NBSACdii1gSx", count: 12 },
  { slug: "spices", label: "মশলা", icon: "local_fire_department", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq58vEH7gYivPXEcLtToX4pCgGkviWmugMHiaigVEtrhNKVWTb4fTxR1hT32LDpNdlSJzxRskyCEBJLI9quHz9O_6QJVWrn2OIY0kpmCMFk7aQwMx5LqiF6lunsosrCjrayF1NNm2DDGr068cYTrgWBexlw0yOmDhPOzDAp1MypmTUW6y9JGsEHMxMHefsdhAn4UsSDMBRDY5ICzk37jUhLrIrO4ZkFiI3ZE-r9CNn86Gtqi1oO6X-niuYbLh0cNTrJ99yBDhQFyb7", count: 28 },
  { slug: "tea-coffee", label: "চা ও কফি", icon: "coffee", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARi7y4X1xKus8g3_P2uWyUQg_lzIJOrWI1WEYMY90tA2LsfCO6Rb5sRi7pRC4wcZc1r4ld-nXnyVUR2Wp50MoCpxRb6W8JeE9ooYfApjTNHtzEB3f0g5SmTNUQGfGkjSa366wupd4dfx5ZmnWLVIpgaL9akE39EyjQrN7OE9MgllO2R1DBG837omZuisu-8nYfMPSQ9Ws5A6y2cMY0TZCq2p0jaf3NZCaP5TlEY5MLsLlL8J0hyKeOaqH2j1JwImfto8GJF9Xhw10z", count: 15 },
  { slug: "grains", label: "শস্য", icon: "grain", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSg9hH9ujnIKyNiGKZJyg4HfJMPVD_0ldRswiaQusRyN7UXTaJvPLvAYSp_9R1K3_Mtk2rqWh0czflf5-C7G8UPa1pgtlnosfQgi_cBKYn9KZ-4WJnBCVkzLZvEtHLsysQ9_7Qg9BeH8oQfSd4pIw22Vh8OcuM0XUzoJXLm_QnTb5gIKgBb4w9Je59EWeVd5I3foeT8lCczcVnjGlhLJE_Kt8YSNaD8hGYDlFcBhLs9htEmECTNRTE7OV_K8jYr0Oc-qZTJfasa_Ql", count: 20 },
];

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-BD")}`;
}
