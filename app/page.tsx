"use client";

import { useRouter } from "next/navigation";
import HomePage from "./home/page";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <main>
      <HomePage />
    </main>
  );
}
