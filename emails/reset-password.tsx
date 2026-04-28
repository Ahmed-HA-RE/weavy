import { APP_NAME } from '@/lib/constants/app';

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  pixelBasedPreset,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Font,
} from 'react-email';

const baseUrl = process.env.NEXT_PROD_SERVER_URL
  ? process.env.NEXT_PROD_SERVER_URL
  : '';

interface ResetPasswordProps {
  url: string;
}

export const ResetPassword = ({ url }: ResetPasswordProps) => (
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

      <Body className='m-0 text-center'>
        <Preview>
          You requested a password reset. Click the button below to reset your
          password.
        </Preview>
        <Container className='mt-0 mx-auto md:mt-8 w-full max-w-[640px]'>
          <Section>
            <Section className='mobile:px-2 px-6 py-4'>
              <Section className='bg-gray-50 px-6 py-12 rounded-[8px] md:px-[40px] md:py-[64px] text-center'>
                <Section className='mb-3'>
                  <Img
                    src={`${baseUrl}/static/icon-email-logo.png`}
                    alt='Logo'
                    width={40}
                    className='mx-auto mb-5 block'
                  />
                  <Heading as='h1' className='m-0 text-[28px] '>
                    Reset your password
                  </Heading>
                </Section>

                <Text className='text-base mx-auto mt-0 mb-8 max-w-[380px] text-center font-sans'>
                  Someone has requested a link to change your password, and you
                  can do this through the link below.
                </Text>

                <Section className='mb-6 text-center'>
                  <Button
                    href={url}
                    className='bg-[#6d7ecf] inlin-block py-4 px-7 rounded-lg text-white text-base'
                  >
                    Change your password
                  </Button>
                </Section>

                <Text className='text-[13px] mx-auto mt-8 mb-0 max-w-[400px] text-gray-500 text-center leading-5'>
                  If you didn&apos;t request this, please ignore this email.
                  Your password won&apos;t change until you access the link
                  above and create a new one.
                </Text>
                <Text className='text-xs mx-auto mt-8 mb-0 max-w-[400px] text-center font-bold '>
                  Note that the confirmation link will expire in 1 hour.
                </Text>
              </Section>

              {/* Footer */}
              <Section>
                <Row>
                  <Column className='px-6 py-10 text-center'>
                    <Text className='mx-auto mt-0 mb-4 max-w-[280px] text-center text-gray-500 '>
                      @{APP_NAME} {new Date().getFullYear()}. All rights
                      reserved.
                    </Text>

                    <Section>
                      <Link
                        href='https://www.instagram.com'
                        className='inline-block px-2 align-middle'
                      >
                        <Img
                          src={`${baseUrl}/static/instagram-email-logo.png`}
                          alt='instagram'
                          width={25}
                          className='block'
                        />
                      </Link>
                      <Link
                        href='https://www.facebook.com'
                        className='inline-block px-2 align-middle'
                      >
                        <Img
                          src={`${baseUrl}/static/facebook-email-logo.png`}
                          alt='Facebook'
                          width={22}
                          className='block'
                        />
                      </Link>
                      <Link
                        href='https://linkedin.com'
                        className='inline-block px-2 align-middle'
                      >
                        <Img
                          src={`${baseUrl}/static/linkedin-email-logo.png`}
                          alt='LinkedIn'
                          width={21}
                          className='block'
                        />
                      </Link>
                    </Section>
                  </Column>
                </Row>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

ResetPassword.PreviewProps = {
  url: 'https://example.com/',
} satisfies ResetPasswordProps;

export default ResetPassword;
