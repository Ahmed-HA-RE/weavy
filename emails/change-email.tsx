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

const baseUrl = process.env.NEXT_PROD_SERVER_URL ? process.env.NEXT_PROD_SERVER_URL : '';

interface ChangeEmailProps {
  callbackUrl: string;
  newEmail: string;
}

export const ChangeEmail = ({ callbackUrl, newEmail }: ChangeEmailProps) => (
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
        <Preview>We received a request to change your email address. Confirm it&apos;s you to continue.</Preview>
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
                  <Heading as='h1' className='m-0 text-[28px]'>
                    Change email address
                  </Heading>
                </Section>

                <Text className='mx-auto mt-0 mb-8 max-w-[450px] text-center'>
                  We received a request to change the email address associated with your {APP_NAME} account to{' '}
                  <strong>{newEmail}</strong>. Click the button below to confirm it&apos;s you before proceeding.
                </Text>

                <Section className='mb-6 text-center'>
                  <Button
                    href={callbackUrl}
                    className='bg-[#6d7ecf] inlin-block py-4 px-7 rounded-lg text-white text-base'
                  >
                    Confirm
                  </Button>
                </Section>

                <Text className='text-sm mx-auto mt-8 mb-0 max-w-[400px] text-center '>
                  If you didn&apos;t request this change,
                  <br />
                  please ignore this email.
                </Text>
              </Section>

              {/* Footer */}
              <Section>
                <Row>
                  <Column className='px-6 py-10 text-center'>
                    <Text className='mx-auto mt-0 mb-4 max-w-[280px] text-center text-gray-500 '>
                      @{APP_NAME} {new Date().getFullYear()}. All rights reserved.
                    </Text>

                    <Section>
                      <Link href='https://www.instagram.com' className='inline-block px-2 align-middle'>
                        <Img
                          src={`${baseUrl}/static/instagram-email-logo.png`}
                          alt='instagram'
                          width={25}
                          className='block'
                        />
                      </Link>
                      <Link href='https://www.facebook.com' className='inline-block px-2 align-middle'>
                        <Img
                          src={`${baseUrl}/static/facebook-email-logo.png`}
                          alt='Facebook'
                          width={22}
                          className='block'
                        />
                      </Link>
                      <Link href='https://linkedin.com' className='inline-block px-2 align-middle'>
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

ChangeEmail.PreviewProps = {
  callbackUrl: 'https://example.com/',
  newEmail: 'ahmed@example.com',
} satisfies ChangeEmailProps;

export default ChangeEmail;
