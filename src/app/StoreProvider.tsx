"use client";

import { Provider } from "react-redux";
import { store } from "@/store";

const StoreProvider = ({ children }: { children: JSX.Element }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
