'use client';

import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from '@teispace/next-themes';
import React, { RefObject } from 'react';

const GoogleRecaptcha = ({
  onChange,
  ref,
}: {
  onChange: (value: string | null) => void;
  ref: RefObject<ReCAPTCHA | null>;
}) => {
  const { theme } = useTheme();

  return (
    <div className='my-2'>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}
        theme={theme === 'dark' ? 'dark' : 'light'}
        onChange={onChange}
        ref={ref}
        onExpired={() => onChange(null)}
      />
    </div>
  );
};

export default GoogleRecaptcha;
