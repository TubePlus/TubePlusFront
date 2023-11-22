import TubePlusLogo from '@/components/TubePlusLogo';
import { useTranslations } from 'next-intl';
import React from 'react';

const Footer = () => {
  const t = useTranslations('Home');

  return (
    <section className="w-full border-t-1 border-default-300 mx-auto mt-1 p-0 pb-8">
      <div className="xl:max-w-[1400px] lg:max-w-[1200px] md:max-w-[992px] sm:max-w-[640px] mx-auto pt-9">
        <div className="flex gap-x-12 gap-y-5 justify-center items-center flex-wrap-reverse px-4">
          <div className="flex items-center gap-2">
            <TubePlusLogo classNames={{ base: 'w-[64px] grayscale' }} />
            <div
              className="flex gap-1 items-center
                          md:flex-col md:justify-between
                          x:flex-row
                          "
            >
              <h3 className="text-xl leading-6">TubePlus</h3>

              <p className="text-sm">©2023 Aces</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-24 gap-y-1 justify-center items-center text-sm">
            <span>{t('footer.terms')}</span>
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.security')}</span>
            <span>{t('footer.status')}</span>
            <span>{t('footer.docs')}</span>
            <span>{t('footer.about')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
