'use client';

import { useSearchParams } from 'next/navigation';
import { Navbar } from './navbar';

export function ConditionalNavbar() {
  const searchParams = useSearchParams();
  const hideNavbar = searchParams.get('hideNavbar') === 'true';

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}