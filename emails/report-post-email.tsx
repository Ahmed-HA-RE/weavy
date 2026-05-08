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

interface ReportPostEmailProps {
  reporterName: string;
}

export const ReportPostEmail = ({ reporterName }: ReportPostEmailProps) => (
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
          We will review it and take appropriate action if necessary. Thank you
          for helping us keep the community safe.
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
                    Report Received
                  </Heading>
                </Section>

                <Text className='mx-auto mt-0 mb-8 max-w-[380px] text-center '>
                  Hi {reporterName},
                  <br />
                  We received your report about a post. Our moderation team will
                  review it against our community guidelines and take
                  appropriate action.
                </Text>
                <Text className='text-[14px] text-gray-400 italic'>
                  Thank you for helping us keep the community safe.
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

ReportPostEmail.PreviewProps = {
  reporterName: 'John Doe',
} satisfies ReportPostEmailProps;

export default ReportPostEmail;
