'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import BlogHome from '../../components/home'
import LoadingSpinner from '../../components/spinner';
import Home from '../page';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenblogIt');
    if (!token) {
      router.push('/login'); // Change '/home' to your desired route
    }else{
        setLoading(false)
    }
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />
      <BlogHome />
    </div>
  );
}
