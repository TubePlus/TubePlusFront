'use client'; // Error components must be Client Components

import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex felx-col gap-4">
      <h2 className="text-2xl text-red-600">{t('title')}</h2>

      <div className="flex justify-center">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          {t('try-again')}
        </Button>
      </div>
    </div>
  );
}
