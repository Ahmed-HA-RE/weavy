import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp';

interface TwoFactorOTPInputProps {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
}

const TwoFactorOTPInput = ({ value, onChange, isInvalid }: TwoFactorOTPInputProps) => {
  const OTP_INPUT_LENGTH = 6;
  return (
    <InputOTP id='two-factor-otp' maxLength={OTP_INPUT_LENGTH} value={value} onChange={(value) => onChange(value)}>
      <InputOTPGroup className='gap-2 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border justify-center'>
        {Array.from({ length: OTP_INPUT_LENGTH }).map((_, i) => (
          <React.Fragment key={i}>
            <InputOTPSlot index={i} className='size-12 text-lg' aria-invalid={isInvalid} />
            {i === OTP_INPUT_LENGTH / 3 && <InputOTPSeparator />}
          </React.Fragment>
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default TwoFactorOTPInput;
