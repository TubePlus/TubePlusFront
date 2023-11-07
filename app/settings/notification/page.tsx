'use client';
import SimpleCard from '@/components/SimpleCard';
import { CardHeader } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import React, { useState } from 'react';

const notifi = {
  label: 'Community Alert',
  value: true,
};

function Page() {
  const [isAlert, setIsAlert] = useState(true);

  return (
    <section className="flex flex-col gap-8 min-h-[800px]">
      <SimpleCard classNames={{ card: '!p-0' }}>
        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">Notification Setting</h2>
        </CardHeader>

        <div className="flex flex-col px-6 pb-6 ">
          <div className="flex items-center gap-4">
            <span>Community Alert</span>
            <Switch size="sm" isSelected={isAlert} onValueChange={setIsAlert}>
              {isAlert ? 'ON' : 'OFF'}
            </Switch>
          </div>
          <p className="text-default-500 text-sm mt-2">
            Controls notifications from the communities you join.
          </p>
        </div>
      </SimpleCard>
    </section>
  );
}

export default Page;
