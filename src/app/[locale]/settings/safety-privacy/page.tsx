import SimpleCard from '@/components/SimpleCard';
import { CardHeader } from '@nextui-org/card';
import { Switch } from '@nextui-org/switch';
import { useTranslations } from 'next-intl';
import React from 'react';

const privacy = [
  { id: 1, content: 'Personalized ads based on your activities', value: true },
  {
    id: 2,
    content:
      'Personalize recommendations based on your activities with our partners',
    value: true,
  },
];

function Page() {
  const t = useTranslations('User');

  return (
    <section className="flex flex-col gap-8 ">
      <div className="">
        <h2 className="px-2 text-lg">{t('safety-privacy')}</h2>
        <p className="px-2 text-sm">{t('safety-privacy-description')}</p>
      </div>

      <SimpleCard classNames={{ card: '!p-0' }}>
        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">{t('safety-policy')}</h2>
        </CardHeader>

        <div className="px-6 pb-6 flex flex-col items-center border-b-1 border-default-300 divide-y">
          {privacy.map(p => (
            <div
              key={p.id}
              className="grid grid-cols-5 flex-row gap-4 w-full text-sm items-center py-2"
            >
              <p className="col-span-4">{p.content}</p>
              <div className="col-span-1 text-end">
                <Switch isSelected={p.value} />
              </div>
            </div>
          ))}
        </div>
      </SimpleCard>
    </section>
  );
}

export default Page;
