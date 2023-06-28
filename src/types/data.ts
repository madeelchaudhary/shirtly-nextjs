type ImageType = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: null;
      caption: null;
      width: number;
      height: number;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: null;
      provider: string;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      createdAt: string;
      updatedAt: string;
    };
  };
};

type BaseType<T> = {
  id: number;
  attributes: T & { updatedAt: string; createdAt: string; publishedAt: string };
};

type ApiReturnType<T> = {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type CategoryType = {
  name: string;
  image: ImageType;
};

type Category = BaseType<CategoryType>;

type ProductType = {
  title: string;
  stock: number;
  slug: string;
  price: number;
  description: string;
  excerpt: string;
  discountPercentage: number;
  image: ImageType;
};

type Product = BaseType<ProductType>;
