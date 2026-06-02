'use client';

import PasswordVerificationForm from './password-verification-form';

const VerifyStep = ({
  onNext,
  setPassword,
}: {
  onNext: () => void;
  setPassword: (password: string) => void;
}) => {
  return (
    <PasswordVerificationForm
      mode='enable'
      onNext={onNext}
      setPassword={setPassword}
    />
  );
};

export default VerifyStep;
