"use client";

import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const ToastContainerClient = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1200}
      limit={1}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastContainerClient;
