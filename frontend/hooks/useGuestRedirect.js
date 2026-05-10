"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function useGuestRedirect() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      if(user.userType=="admin"){
      router.push("/admin");
      }else{
      router.push("/dashboard");
      }
    }
  }, [user, loading, router]);
}