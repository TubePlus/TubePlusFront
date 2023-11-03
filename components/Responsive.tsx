'use client';

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * @type        boolean
 * @returns     xValue
 * @description min-width: 0px
 */
export const XValue = () => {
  const [xValue, setXValue] = useState(false);
  const isXValue = useMediaQuery({
    query: '(min-width: 0px)',
  });

  useEffect(() => {
    setXValue(isXValue);
  }, [isXValue]);
  return xValue;
};
/**
 * @description min-width: 0px
 */
export const X = ({ children }: { children: React.ReactNode }) => {
  const isXValue = XValue();

  return <>{isXValue && children}</>;
};

/**
 * @type        boolean
 * @returns     xsValue
 * @description min-width: 480px
 */
export const XsValue = () => {
  const [xsValue, setXsValue] = useState(false);
  const isXsValue = useMediaQuery({
    query: '(min-width: 480px)',
  });

  useEffect(() => {
    setXsValue(isXsValue);
  }, [isXsValue]);
  return xsValue;
};
/**
 * @description min-width: 480px
 */
export const Xs = ({ children }: { children: React.ReactNode }) => {
  const isXsValue = XsValue();

  return <>{isXsValue && children}</>;
};

/**
 * @type        boolean
 * @returns     smValue
 * @description min-width: 640px
 */
export const SmValue = () => {
  const [smValue, setSmValue] = useState(false);
  const isSmValue = useMediaQuery({
    query: '(min-width: 640px) and (max-width: 992px)',
  });

  useEffect(() => {
    setSmValue(isSmValue);
  }, [isSmValue]);
  return smValue;
};
/**
 * @description min-width: 640px
 */
export const Sm = ({ children }: { children: React.ReactNode }) => {
  const isSmValue = SmValue();

  return <>{isSmValue && children}</>;
};

/**
 * @type        boolean
 * @returns     mdValue
 * @description min-width: 992px
 */
export const MdValue = () => {
  const [mdValue, setMdValue] = useState(false);
  const isMdValue = useMediaQuery({
    query: '(min-width: 992px)',
  });

  useEffect(() => {
    setMdValue(isMdValue);
  }, [isMdValue]);
  return mdValue;
};
/**
 * @description min-width: 992px
 */
export const Md = ({ children }: { children: React.ReactNode }) => {
  const isMdValue = MdValue();

  return <>{isMdValue && children}</>;
};

/**
 * @type        boolean
 * @returns     lgVlue
 * @description min-width: 1200px
 */
export const LgValue = () => {
  const [lgValue, setLgValue] = useState(false);
  const isLgValue = useMediaQuery({
    query: '(min-width: 1200px)',
  });

  useEffect(() => {
    setLgValue(isLgValue);
  }, [isLgValue]);
  return lgValue;
};
/**
 * @description min-width: 1200px
 */
export const Lg = ({ children }: { children: React.ReactNode }) => {
  const isLgValue = LgValue();

  return <>{isLgValue && children}</>;
};
