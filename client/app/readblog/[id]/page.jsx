'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Article from '../../../components/blogpage'
import LoadingSpinner from '../../../components/spinner';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenblogIt');
    if (!token) {
      router.push('/login'); 
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
    < Article />
    </div>
  );
}
