'use client';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const MobileValue = () => {
  const [lgMobile, setLgMobile] = useState(false);
  const isLgMobile = useMediaQuery({
    query: '(max-width: 640px)',
  });

  useEffect(() => {
    setLgMobile(isLgMobile);
  }, [isLgMobile]);
  return lgMobile;
};
export const Mobile = ({ children }: { children: React.ReactNode }) => {
  const isLgMobile = MobileValue();

  return <>{isLgMobile && children}</>;
};

export const TabletValue = () => {
  const [tablet, setTablet] = useState(false);
  const isTablet = useMediaQuery({
    query: '(min-width: 640px)',
  });

  useEffect(() => {
    setTablet(isTablet);
  }, [isTablet]);
  return tablet;
};
export const Tablet = ({ children }: { children: React.ReactNode }) => {
  const isTablet = TabletValue();

  return <>{isTablet && children}</>;
};

export const DesktopValue = () => {
  const [desktop, setDesktop] = useState(false);
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  useEffect(() => {
    setDesktop(isDesktop);
  }, [isDesktop]);
  return desktop;
};
export const Desktop = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = DesktopValue();

  return <>{isDesktop && children}</>;
};
