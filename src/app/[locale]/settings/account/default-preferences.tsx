import { languages } from '@/data/sidebar';
import useGlobalState from '@/hooks/use-global-state';
import { Avatar } from '@nextui-org/avatar';
import { Select, SelectItem } from '@nextui-org/select';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useState } from 'react';

const DefaultPreference = () => {
  const { data: session } = useSession();
  const [user, setUser] = useGlobalState('/settings');
  const [currentLocale, setCurrentLocale] = useState(
    languages.find(lang => lang.locale.includes(session?.user.locale!) || 'ko'),
  );

  const [selectedLangValue, setSelectedLangValue] =
    useState<(typeof languages)[0]>();

  useEffect(() => {
    if (!currentLocale)
      setCurrentLocale(
        languages.find(lang => lang.locale.includes(session?.user.locale!)),
      );
  }, [session]);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = languages.find(lang =>
      lang.name.includes(e.target.value),
    );

    if (selectedLanguage) {
      setSelectedLangValue(selectedLanguage);
      console.log(selectedLangValue?.locale);
    }
  };

  useEffect(() => {
    setUser({
      default: {
        ...user?.default,
      },
      editable: {
        ...user?.editable,
        locale: selectedLangValue?.locale || currentLocale?.locale,
      },
    });
  }, [selectedLangValue, currentLocale]);

  return (
    currentLocale && (
      <Select
        aria-label="Select Language"
        className="w-[200px]"
        classNames={{ trigger: 'h-[28px]', innerWrapper: 'py-0' }}
        // userLang.name의 타입이 string | undefined 여서 확정적이지 않을 경우 타입에러 발생
        defaultSelectedKeys={[currentLocale.name]}
        value={selectedLangValue?.name}
        onChange={handleSelectionChange}
        selectionMode="single"
        variant="bordered"
        disallowEmptySelection
        startContent={
          <span>
            <Avatar
              alt={selectedLangValue?.name || currentLocale.name}
              className="relative h-6 w-6"
              isBordered={
                (selectedLangValue?.locale.includes('ja' || 'ko')
                  ? true
                  : false) ||
                (currentLocale.locale.includes('ja' || 'ko') ? true : false)
              }
              src={selectedLangValue?.src || currentLocale?.src}
            />
          </span>
        }
      >
        {languages.map(lang => (
          <SelectItem
            aria-labelledby="Select Language"
            key={lang.name}
            value={lang.locale}
            startContent={
              <Avatar alt={lang.name} className="w-6 h-6" src={lang.src} />
            }
          >
            {lang.name}
          </SelectItem>
        ))}
      </Select>
    )
  );
};

export default DefaultPreference;
