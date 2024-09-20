'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Login from '../../components/login';
import LoadingSpinner from '../../components/spinner';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenblogIt');
    if (token) {
      router.push('/home'); // Change '/home' to your desired route
    } else {
      setLoading(false); // Stop loading if no token
    }
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
}
