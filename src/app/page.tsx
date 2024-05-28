"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /connections on load
      router.push('/connections');
  }, [router]);

  return null;
};

export default HomePage;
