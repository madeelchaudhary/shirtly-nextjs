import Image from "next/image";
import Playstore from "./icons/playstore";
import Appstore from "./icons/appstore";

export default function Footer() {
  const footerNavs = [
    {
      href: "#",
      name: "Terms",
    },
    {
      href: "#",
      name: "License",
    },
    {
      href: "#",
      name: "Privacy",
    },
    {
      href: "#",
      name: "About us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <Image
              src="/image/logo.png"
              className="w-32"
              width={200}
              height={80}
              alt=""
            />

            <p className="max-w-md">
              Nulla auctor metus vitae lectus iaculis, vel euismod massa
              efficitur.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-800 hover:text-gray-500 duration-150"
                >
                  <a key={idx} href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the app</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="#">
                <Playstore />
              </a>
              <a href="#" className="mt-0 block sm:mt-3">
                <Appstore />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t text-center">
          <div className="flex justify-center mb-4">
            <Image
              className="max-h-6"
              src="/image/payments.svg"
              width={600}
              height={50}
              alt=""
            />
          </div>
          <p>© 2022 Shirtly Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
