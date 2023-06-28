import React from "react";
import DetailTabs from "./DetailTabs";
import { SocailShare } from "./SocailShare";
import ProductImage from "./ProductImage";
import AddToCart from "../Cart/AddToCart";
import { getDiscountedPrice } from "@/lib/calcDiscount";

const ProductDetail = ({ prod }: { prod: Product }) => {
  const { title, description, image, price, excerpt, discountPercentage } =
    prod.attributes;
  const prodId = prod.id;

  const discountedPrice = discountPercentage
    ? getDiscountedPrice(price, discountPercentage)
    : 0;
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-xl lg:max-w-6xl mx-auto">
          <div className="flex flex-wrap -mx-4 mb-12">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="lg:w-full">
                <a
                  className="relative group block mb-6 h-112 w-full bg-blueGray-900 rounded-md"
                  href="#"
                >
                  <div className="absolute top-0 left-0 h-full w-full transform -translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition duration-300"></div>
                  <ProductImage url={image.data.attributes.url} />
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-lg">
                <h1 className="text-4xl text-gray-800 font-extrabold mb-1">
                  {title}
                </h1>
                <span className="block text-sm font-bold text-gray-600 mb-5">
                  Brand Name
                </span>
                <div className="flex items-center mb-4">
                  <button className="inline-block mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                        fill="#474BC5"
                      ></path>
                    </svg>
                  </button>
                  <button className="inline-block mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                        fill="#474BC5"
                      ></path>
                    </svg>
                  </button>
                  <button className="inline-block mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                        fill="#474BC5"
                      ></path>
                    </svg>
                  </button>
                  <button className="inline-block mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                        fill="#474BC5"
                      ></path>
                    </svg>
                  </button>
                  <button className="inline-block">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57429 0.42926 9.19098 0.682715 9.02267 1.07518L6.74005 6.41696L0.966583 6.94112C0.542377 6.98033 0.184092 7.26705 0.0524051 7.67203C-0.0792816 8.07701 0.0423341 8.5212 0.363235 8.80121L4.7266 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85249 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.342 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203Z"
                        fill="#E8E8F8"
                      ></path>
                      <defs>
                        <rect width="20" height="20" fill="white"></rect>
                      </defs>
                    </svg>
                  </button>
                </div>
                <p className="mb-4">
                  {discountPercentage ? (
                    <>
                      <span className=" text-2xl lg:text-3xl font-black text-gray-900 mr-2">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className=" text-sm font-bold text-gray-400 line-through">
                        ${price}
                      </span>
                    </>
                  ) : (
                    <span className=" text-2xl lg:text-3xl font-black text-gray-900">
                      ${price}
                    </span>
                  )}
                </p>
                <p className="font-medium text-gray-500 mb-2">{excerpt}</p>
                <AddToCart prodId={prodId} />
                <div className="flex flex-wrap gap-4">
                  <h4 className="font-semibold mb-2">Share on Social Media:</h4>
                  <SocailShare />
                </div>
              </div>
            </div>
          </div>
          <DetailTabs description={description} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
