'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('tokenblogIt');
    if (token) {
      router.push('/home'); 
    } else {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <div>
     
    </div>
  );
}

