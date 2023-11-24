'use client';
import SimpleCard from '@/components/SimpleCard';
import { CardHeader } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const notifi = {
  label: 'Community Alert',
  value: true,
};

function Page() {
  const t = useTranslations('User');
  const [isAlert, setIsAlert] = useState(true);

  return (
    <section className="flex flex-col gap-8">
      <SimpleCard classNames={{ card: '!p-0' }}>
        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">{t('noti-settings')}</h2>
        </CardHeader>

        <div className="flex flex-col px-6 pb-6 ">
          <div className="flex items-center gap-4">
            <span>{t('noti-community-alert')}</span>
            <Switch size="sm" isSelected={isAlert} onValueChange={setIsAlert}>
              {isAlert ? 'ON' : 'OFF'}
            </Switch>
          </div>
          <p className="text-default-500 text-sm mt-2">
            {t('nofi-community-alert-description')}
          </p>
        </div>
      </SimpleCard>
    </section>
  );
}

export default Page;
