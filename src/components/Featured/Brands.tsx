import Image from "next/image";

export default function Brands() {
  return (
    <div className="md:py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 className="font-semibold text-sm text-gray-600 text-center">
          TOP NOTCH BRANDS IN YOUR HADNS
        </h3>
        <div className="mt-6">
          <ul className="flex gap-y-6 flex-wrap items-center justify-center [&>*]:px-12 lg:divide-x">
            {/* LOGO 1 */}
            <li className="flex-none">
              <Image
                src="/image/brands/adidas.jpg"
                width={163}
                height={48}
                alt="Adidas Brand Logo"
                className="w-28"
              />
            </li>

            {/* LOGO 2 */}
            <li className="flex-none">
              <Image
                src="/image/brands/puma.jpg"
                width={163}
                height={48}
                alt="Puma Brand Logo"
                className="w-28"
              />
            </li>

            {/* LOGO 3 */}
            <li className="flex-none">
              <Image
                src="/image/brands/nike.png"
                width={163}
                height={48}
                alt="Nike Brand Logo"
                className="w-28"
              />
            </li>

            {/* LOGO 4 */}
            <li className="flex-none">
              <Image
                src="/image/brands/armani.jpg"
                width={163}
                height={48}
                alt="Armani Brand Logo"
                className="w-28"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
