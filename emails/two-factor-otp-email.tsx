import { APP_NAME } from '@/lib/constants/app';
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  pixelBasedPreset,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';

interface TwoFactorOTPEmailProps {
  otp: string;
}

const baseUrl = process.env.NEXT_PROD_SERVER_URL
  ? process.env.NEXT_PROD_SERVER_URL
  : '';

export const TwoFactorOTPEmail = ({ otp }: TwoFactorOTPEmailProps) => (
  <Tailwind config={{ presets: [pixelBasedPreset] }}>
    <Html>
      <Head>
        <Font
          fontFamily='Inter'
          fallbackFontFamily='sans-serif'
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>Enter this code to verify your identity</Preview>
      <Body className='bg-white font-plaid'>
        <Container className='bg-white border border-[#cbcbcb] border-solid rounded  mt-8 max-w-[360px] mx-auto px-6 h-[470px]'>
          <Img
            src={`${baseUrl}/static/icon-email-logo.png`}
            width='60'
            height='50'
            alt={`${APP_NAME} Logo`}
            className='mx-auto my-0'
          />
          <Text className='text-foreground text-[11px] font-bold h-4 tracking-[0] leading-[16px] mt-4 mb-2 mx-2 uppercase text-center'>
            Verify Your Identity
          </Text>
          <Heading className='text-black font-medium font-[HelveticaNeue-Medium,Helvetica,Arial,sans-serif] inline-block text-[18px] leading-[24px] my-0 text-center'>
            Enter the following code to authenticate your identity in {APP_NAME}
            .
          </Heading>
          <Section className='rounded mx-auto font-[HelveticaNeue-Bold] mt-4 mb-3.5 align-middle w-[280px] bg-gray-100'>
            <Text className='text-black text-[32px] font-bold tracking-[6px] leading-10 py-2 mx-auto my-0 block text-center'>
              {otp}
            </Text>
          </Section>
          <Text className='text-[#444] text-sm leading-[23px] tracking-[0] py-0 px-10 m-0 text-center'>
            Not expecting this email?
          </Text>
          <Text className='text-[#444] text-sm tracking-[0] py-0 px-10 m-0 text-center'>
            Please ignore it or contact support if you have any concerns.
          </Text>
          <Text className='text-[#444] text-xs leading-[23px] tracking-[0] py-0 px-10 m-0 text-center italic mt-20'>
            This code will expire in 15 minutes.
          </Text>
        </Container>
        <Text className='text-black text-xs font-extrabold tracking-[0] leading-[23px] m-0 mt-5 text-center uppercase'>
          Securely powered by {APP_NAME}
        </Text>
      </Body>
    </Html>
  </Tailwind>
);

TwoFactorOTPEmail.PreviewProps = {
  otp: '144829',
} as TwoFactorOTPEmailProps;

export default TwoFactorOTPEmail;
