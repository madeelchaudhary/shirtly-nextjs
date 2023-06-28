const BASE_URL = process.env.STRAPI_API as string;

export const fetcher = async (endpoint: string, options?: RequestInit) => {
  const url =
    (BASE_URL || "https://strapi-production-ae6d.up.railway.app/api/") +
    endpoint;
  const res = await fetch(url, options);
  const data = res.json();
  return data;
};

export const productsFetcher = async (query = "") => {
  const endpoint = "products?populate=image" + query;
  const result: ApiReturnType<Product[]> = await fetcher(endpoint);
  return result.data;
};

export const fetchProduct = async (slug: string) => {
  const result: ApiReturnType<Product | null> = await fetcher(
    "slugify/slugs/product/" + slug + "?populate=image"
  );
  return result.data;
};
export const fetchProductById = async (id: string) => {
  const result: ApiReturnType<Product | null> = await fetcher(
    "products/" + id + "?fields=id&fields=title"
  );
  return result.data;
};

export const fetchProducts = async () => {
  const result = await productsFetcher("&sort[createdAt]=desc ");
  return result;
};

export const fetchDiscountedProducts = async () => {
  const result = await productsFetcher(
    "&filters[discountPercentage][$gt]=1&pagination[pageSize]=4"
  );
  return result;
};

export const fetchCategories = async () => {
  const result: ApiReturnType<Category[]> = await fetcher(
    "categories?populate=image"
  );
  return result.data;
};

export const fetchCategory = async (slug: string) => {
  const result: ApiReturnType<Category> = await fetcher(
    "categories?filters[name][$eq]=" + slug
  );
  return result.data;
};
export async function getCartItemsDetails(cartItemsIds: string[]) {
  const queryList = cartItemsIds.map(
    (id, itx) => `&filters[id][$in][${itx}]=${id}`
  );
  const query =
    queryList.join(``) + `&fields=title&fields=price&fields=discountPercentage`;
  const res = await productsFetcher(query);
  return res;
}
