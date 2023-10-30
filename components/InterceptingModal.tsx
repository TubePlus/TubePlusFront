'use client';
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, Kbd } from '@nextui-org/react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const InterceptingModal = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onRoot = useCallback(() => {
    window.location.assign('/');
  }, []);

  const onClick: MouseEventHandler = useCallback(
    e => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[530px] p-6"
      >
        <Card
          classNames={{
            base: 'bg-white dark:bg-zinc-800 mx-auto border border-zinc-300/20',
          }}
          shadow="lg"
          isBlurred
        >
          <CardHeader>
            <div className="justify-start w-full">
              <Button
                startContent={<ChevronLeftIcon />}
                endContent={<Kbd keys={['escape']}>ESC</Kbd>}
                onClick={onRoot}
                tabIndex={0}
              >
                Home
              </Button>
            </div>
          </CardHeader>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default InterceptingModal;
