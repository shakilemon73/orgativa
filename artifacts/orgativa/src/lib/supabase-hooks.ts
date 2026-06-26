import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured, DbProduct, DbCategory, DbOrder, DbOrderItem, DbSiteSetting } from "./supabase";
import { products as staticProducts, categories as staticCategories, type Product, type Category } from "@/data/products";

function dbProductToProduct(p: DbProduct): Product {
  return {
    id: p.id as unknown as number,
    slug: p.slug,
    name: p.name,
    category: p.category_label,
    categorySlug: p.category_slug,
    weight: p.weight,
    price: p.price,
    originalPrice: p.original_price ?? undefined,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    images: p.images,
    badge: p.badge ?? undefined,
    description: p.description,
    highlights: p.highlights,
    origin: p.origin,
    inStock: p.in_stock,
  };
}

function dbCategoryToCategory(c: DbCategory): Category {
  return {
    slug: c.slug,
    label: c.label,
    icon: c.icon,
    image: c.image_url ?? "",
    count: c.product_count,
  };
}

export function useProducts(categorySlug?: string) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      const filtered = categorySlug && categorySlug !== "all"
        ? staticProducts.filter((p) => p.categorySlug === categorySlug)
        : staticProducts;
      setData(filtered);
      setLoading(false);
      return;
    }

    let query = supabase!.from("products").select("*").order("display_order");
    if (categorySlug && categorySlug !== "all") {
      query = query.eq("category_slug", categorySlug);
    }

    query.then(({ data: rows, error: err }) => {
      if (err) { setError(err.message); setLoading(false); return; }
      setData((rows ?? []).map(dbProductToProduct));
      setLoading(false);
    });
  }, [categorySlug]);

  return { data, loading, error };
}

export function useProduct(slug: string) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setData(staticProducts.find((p) => p.slug === slug) ?? null);
      setLoading(false);
      return;
    }

    supabase!.from("products").select("*").eq("slug", slug).single()
      .then(({ data: row, error: err }) => {
        if (err) { setError(err.message); setLoading(false); return; }
        setData(row ? dbProductToProduct(row) : null);
        setLoading(false);
      });
  }, [slug]);

  return { data, loading, error };
}

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setData(staticCategories);
      setLoading(false);
      return;
    }

    supabase!.from("categories").select("*").order("display_order")
      .then(({ data: rows }) => {
        setData((rows ?? []).map(dbCategoryToCategory));
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export async function submitOrder(orderData: {
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  division: string;
  district: string;
  thana: string;
  address: string;
  postcode?: string;
  paymentMethod: string;
  paymentNumber?: string;
  transactionId?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  items: Array<{
    productId?: string;
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
}) {
  if (!isSupabaseConfigured) {
    return { success: true, orderId: orderData.orderNumber };
  }

  const { data: order, error: orderErr } = await supabase!.from("orders").insert({
    order_number: orderData.orderNumber,
    customer_name: orderData.customerName,
    phone: orderData.phone,
    email: orderData.email || null,
    division: orderData.division,
    district: orderData.district,
    thana: orderData.thana,
    address: orderData.address,
    postcode: orderData.postcode || null,
    payment_method: orderData.paymentMethod,
    payment_number: orderData.paymentNumber || null,
    transaction_id: orderData.transactionId || null,
    subtotal: orderData.subtotal,
    delivery_fee: orderData.deliveryFee,
    total: orderData.total,
    notes: orderData.notes || null,
    status: "pending",
  }).select().single();

  if (orderErr || !order) {
    return { success: false, error: orderErr?.message };
  }

  const itemRows = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId || null,
    product_name: item.productName,
    product_image: item.productImage,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    total_price: item.totalPrice,
  }));

  const { error: itemsErr } = await supabase!.from("order_items").insert(itemRows);
  if (itemsErr) {
    return { success: false, error: itemsErr.message };
  }

  return { success: true, orderId: order.id };
}

export type { DbProduct, DbCategory, DbOrder, DbOrderItem, DbSiteSetting };
