'use client';

import { Button } from '@monorepo/packages/ui';
import { formatDate } from '@monorepo/packages/utils';

export default function Home() {
  const today = new Date();

  return (
    <main style={{ padding: '50px', fontFamily: 'system-ui' }}>
      <h1>Next.js App</h1>
      <p>Today is: {formatDate(today, 'long')}</p>
      <Button onClick={() => alert('Hello from Next.js!')}>Click me</Button>
    </main>
  );
}
