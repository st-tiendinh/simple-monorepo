'use client';
import { formatDate } from '@monorepo/packages/utils';
import { useEffect, useState } from 'react';

export const Calendar = () => {
  const [mounted, setMounted] = useState(false);
  const today = new Date();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span suppressHydrationWarning>Loading...</span>;
  }

  return <span suppressHydrationWarning>{formatDate(today, 'long')}</span>;
};
