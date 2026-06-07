import { APP_NAME } from '@/lib/constants/app';

import {
  Body,
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

interface ConfirmationTicketEmailProps {
  name: string;
  subject: string;
}

export const ConfirmationTicketEmail = ({
  name,
  subject,
}: ConfirmationTicketEmailProps) => (
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
          We&apos;ve received your support ticket and will get back to you
          within 48 hours.
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
                  <Heading as='h1' className='m-0 text-[28px]'>
                    Ticket Received
                  </Heading>
                </Section>

                <Text className='mx-auto mt-4 mb-2 max-w-[420px] text-center text-base'>
                  Hi {name},
                </Text>

                <Text className='mx-auto mt-0 mb-6 max-w-[420px] text-center text-base'>
                  We&apos;ve successfully received your support ticket regarding
                  &ldquo;{subject}&rdquo;. One of our support team members will
                  review it and get back to you as soon as possible.
                </Text>

                <Section className='bg-white border border-gray-200 rounded-[6px] px-6 py-5 mb-6 text-left'>
                  <Text className='m-0 text-[13px] text-gray-500 uppercase tracking-wider font-bold mb-2'>
                    What to expect
                  </Text>
                  <Text className='m-0 text-[14px] text-gray-700 leading-6'>
                    Our support team typically responds within{' '}
                    <strong>48 hours</strong>. We&apos;ll reach out to the email
                    address you provided with a resolution or follow-up
                    questions.
                  </Text>
                </Section>

                <Text className='text-[14px] text-gray-400 italic mx-auto mb-0 max-w-[380px]'>
                  Thank you for reaching out to us. We appreciate your patience
                  and look forward to helping you.
                </Text>
              </Section>

              {/* Footer */}
              <Section>
                <Row>
                  <Column className='px-6 py-10 text-center'>
                    <Text className='mx-auto mt-0 mb-4 max-w-[280px] text-center text-gray-500'>
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

ConfirmationTicketEmail.PreviewProps = {
  name: 'John Doe',
  subject: 'Unable to reset my password',
} satisfies ConfirmationTicketEmailProps;

export default ConfirmationTicketEmail;
