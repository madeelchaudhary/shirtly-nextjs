import BtnGroup from "@/components/auth/BtnGroup";
import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import React from "react";

const SignUp = () => {
  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <Image
            src="/image/logo.png"
            width={150}
            height={70}
            alt="Shirtly UI logo"
          />
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Shop your favorite brands with us
            </h3>
            <p className="text-gray-300">
              Create an account and get access to thousands of products from top
              brands and designers.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <Image
                src="/image/user.jpg"
                width={50}
                height={50}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <Image
                src="/image/user.jpg"
                width={50}
                height={50}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <Image
                src="/image/user.jpg"
                width={50}
                height={50}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <Image
                src="/image/user.jpg"
                width={50}
                height={50}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 10.000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <Image
              src="/image/logo.png"
              width={150}
              height={70}
              alt="Shirtly UI logo"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
              <p className="">Already have an account?</p>
            </div>
          </div>
          <BtnGroup />
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </main>
  );
};

export default SignUp;
