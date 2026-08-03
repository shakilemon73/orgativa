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
    const getStatic = () =>
      categorySlug && categorySlug !== "all"
        ? staticProducts.filter((p) => p.categorySlug === categorySlug)
        : staticProducts;

    if (!isSupabaseConfigured) {
      setData(getStatic());
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      try {
        let query = supabase!.from("products").select("*").order("display_order");
        if (categorySlug && categorySlug !== "all") {
          query = query.eq("category_slug", categorySlug);
        }
        const { data: rows, error: err } = await query;
        if (err || !rows || rows.length === 0) {
          if (err) setError(err.message);
          setData(getStatic());
        } else {
          setData(rows.map(dbProductToProduct));
        }
      } catch (err: any) {
        setError(err?.message ?? "Error fetching products");
        setData(getStatic());
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categorySlug]);

  return { data, loading, error };
}

export function useProduct(slug: string) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const staticItem = staticProducts.find((p) => p.slug === slug) ?? null;

    if (!isSupabaseConfigured) {
      setData(staticItem);
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const { data: row, error: err } = await supabase!
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();
        if (err || !row) {
          if (err) setError(err.message);
          setData(staticItem);
        } else {
          setData(dbProductToProduct(row));
        }
      } catch (err: any) {
        setError(err?.message ?? "Error fetching product");
        setData(staticItem);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
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

    async function fetchCategories() {
      try {
        const { data: rows, error: err } = await supabase!
          .from("categories")
          .select("*")
          .order("display_order");
        if (err || !rows || rows.length === 0) {
          setData(staticCategories);
        } else {
          setData(rows.map(dbCategoryToCategory));
        }
      } catch {
        setData(staticCategories);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
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
