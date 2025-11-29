import ContestPageClient from './components/ContestPageClient';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContestPageClient />
    </Suspense>
  );
}
