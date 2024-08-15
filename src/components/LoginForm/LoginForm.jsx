"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
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

    console.log("Email:", email);
    console.log("Password:", password);

    const dummyEmail = "jgardner@gmail.com";
    const dummyPassword = "12345678";

    if (email === dummyEmail && password === dummyPassword) {
      try {
        router.push("/e-shop");
      } catch (err) {
        setError(err.message);
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
            <span className="text-black">Welcome back to </span>
            <span className="text-black">
              {" "}
              <br />
              e-shop!
            </span>
          </h1>
        </div>
        <form className="space-y-3 mt-4" onSubmit={handleSubmit}>
          <input
            className="w-full bg-[#EBEBEB] outline-[#999999] p-2 h-10 rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <input
            className="w-full bg-[#EBEBEB] outline-[#999999] p-2 h-10 rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full h-10 border rounded-lg bg-black text-white"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm font-normal text-[#606060]">
            <span>Don&apos;t have an account? </span>
            <Link className="text-black" href="/signup">
              <span>Sign up.</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
