"use client";

import { useAuth } from "./Context/AuthContext";
import EShop from "./e-shop/page";
import SignupForm from "./signup/page";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <EShop /> : <SignupForm />;
}
