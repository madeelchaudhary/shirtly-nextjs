import { useSession } from "next-auth/react";
import React from "react";

const IfAuthElse = ({
  ifAuth,
  notAuth,
}: {
  ifAuth: React.ReactNode;
  notAuth: React.ReactNode;
}) => {
  const { status } = useSession();

  if (status === "authenticated") {
    return <>{ifAuth}</>;
  }

  return <>{notAuth}</>;
};

export default IfAuthElse;
