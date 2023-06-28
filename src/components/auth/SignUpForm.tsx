"use client";
import React from "react";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";

const validateEmail = (email: string) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
};

const validateName = (name: string) => {
  return name.length > 0;
};

const SignUpForm = () => {
  const {
    value: name,
    onChange: handleNameChange,
    onBlur: handleNameBlur,
    isValid: isNameValid,
  } = useInput(validateName);

  const {
    value: email,
    onChange: handleEmailChange,
    onBlur: handleEmailBlur,
    isValid: isEmailValid,
  } = useInput(validateEmail);

  const {
    value: password,
    onChange: handlePasswordChange,
    onBlur: handlePasswordBlur,
    isValid: isPasswordValid,
  } = useInput(validatePassword);

  let isValid = true;
  if (!isNameValid || !isEmailValid || !isPasswordValid) {
    isValid = false;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = { name, email, password };

    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateName(name)
    ) {
      toast.error("Invalid input");
      return;
    }

    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 400 || res.status === 422) {
          throw new Error("Invalid input");
        }

        if (res.status === 409) {
          throw new Error("Email already exists");
        }

        if (!res.ok)
          throw new Error("Something went wrong, please try again later");
        return res.json();
      })
      .then((data) => {
        toast.success("Sign up successful");
      })
      .catch((err) => {
        toast.error(
          err.message || "Something went wrong, please try again later"
        );
      });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="font-medium">Name</label>
        <input
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          type="text"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label className="font-medium">Email</label>
        <input
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          type="email"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label className="font-medium">Password</label>
        <input
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          type="password"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <button
        disabled={!isValid}
        type="submit"
        className="w-full px-4 py-2 text-white font-medium disabled:opacity-80 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 rounded-lg duration-150"
      >
        Create account
      </button>
    </form>
  );
};

export default SignUpForm;
