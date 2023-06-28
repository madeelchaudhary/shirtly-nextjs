import { useSession } from "next-auth/react";
import React from "react";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "authenticated") {
    return <>{children}</>;
  }
  return <></>;
};

export default CheckAuth;
