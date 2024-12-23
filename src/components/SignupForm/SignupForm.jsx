"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dummy credentials for testing
    const dummyFullName = "hello2000";
    const dummyEmail = "abcdefgh@gmail.com";
    const dummyPassword = "12345678";

    console.log("Submitted:", { fullName, email, password });

    if (
      fullName === dummyFullName &&
      email === dummyEmail &&
      password === dummyPassword
    ) {
      try {
        console.log("Navigating to /e-shop");
        await router.push("/e-shop");
      } catch (err) {
        console.error("Navigation error:", err);
        setError("Failed to navigate.");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white px-4">
      <div className="border rounded-2xl space-y-4 bg-white w-full max-w-md p-8 md:p-10 border-[#CECECE]">
        <div className="flex justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            <span className="text-black">Welcome to </span>
            <span className="text-black">e-shop!</span>
          </h1>
        </div>
        <form className="space-y-3 mt-4" onSubmit={handleSubmit}>
          <input
            className="w-full bg-[#EBEBEB] outline-[#999999] p-2 h-10 rounded-lg"
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={handleInputChange(setFullName)}
            autoComplete="off"
          />
          <input
            className="w-full bg-[#EBEBEB] outline-[#999999] p-2 h-10 rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            autoComplete="off"
          />
          <input
            className="w-full bg-[#EBEBEB] outline-[#999999] p-2 h-10 rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            autoComplete="off"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full h-10 border rounded-lg bg-black text-white"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm font-normal text-[#606060]">
            <span>Already have an account? </span>
            <Link className="text-black" href="/login">
              <span>Log in.</span>
            </Link>
          </p>
        </div>
             <div className="mt-8 border-t pt-4 text-sm text-center text-[#606060]">
{/*           <p>Use the following credentials to test:</p> */}
          <p>
            <strong>Full Name:</strong> hello2000
          </p>
          <p>
            <strong>Email:</strong> abcdefgh@gmail.com
          </p>
          <p>
            <strong>Password:</strong> 12345678
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
