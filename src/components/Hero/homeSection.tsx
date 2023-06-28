import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHeroSection = () => {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 blur-xl h-[580px] -z-10"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="max-w-screen-xl mx-auto px-4 py-12 gap-12 text-gray-600 overflow-hidden md:px-8  grid md:grid-cols-10">
        <div className="space-y-5 pt-24 pb-12 md:py-28 max-w-xl col-span-5">
          <a
            href="#"
            className="inline-flex gap-x-6 items-center rounded-full p-1 pr-4 sm:pr-10 border text-sm font-medium duration-150 hover:bg-white"
          >
            <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
              Summer Sale
            </span>
            <p className="flex items-center">
              Up To 50% Off
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </a>
          <h1 className="text-4xl text-gray-800 font-bold sm:text-5xl lg:text-6xl xl:text-7xl">
            New Summer Collections For Man&apos;s Fashion.
          </h1>
          <p>
            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          </p>
          <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center gap-x-3 sm:text-sm">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
            >
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <a
              href="#"
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex"
            >
              Mega Discounts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="hidden md:block max-h-[550px] col-span-5 w-1/2">
          <Image
            src="/image/bg_5.png"
            width={600}
            height={400}
            alt=""
            className="max-w-xl object-center object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
