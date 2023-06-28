import ProductDetail from "@/components/Products/ProductDetail";
import { fetchProduct } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 60;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const productSlug = params.slug;

  const prod = await fetchProduct(productSlug);

  if (prod)
    return {
      title: prod.attributes.title,
      description: prod.attributes.excerpt,
    };

  return {
    title: "Product not found",
    description: "Product not found",
  };
};

const ProductOverview = async ({ params }: any) => {
  const productSlug = params.slug;

  const prod = await fetchProduct(productSlug);

  if (!prod) {
    return notFound();
  }

  return <ProductDetail prod={prod} />;
};

export default ProductOverview;
