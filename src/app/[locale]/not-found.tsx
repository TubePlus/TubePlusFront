import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Image } from '@nextui-org/image';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('404');
  return (
    <>
      <Sidebar className={`x:bg-zinc-50 dark:x:bg-zinc-900`} isDrawerOnly>
        <MainSidebar />
      </Sidebar>

      <div
        className="col-span-full min-h-screen px-8
                    flex gap-4 justify-center items-center
                    sm:flex-row x:flex-col"
      >
        <Image
          className="min-w-[180px]"
          alt="404"
          src="/images/404monkey.png"
          width={180}
          height={180}
        />

        <div className="flex flex-col gap-2 sm:items-start x:items-center">
          <h1 className="sm:text-8xl x:text-6xl">404</h1>

          <div className="flex flex-col sm:items-start x:items-center">
            <h2 className="text-2xl">Not Founds</h2>
            <p>{t('description')}</p>
          </div>
        </div>
      </div>
    </>
  );
}
