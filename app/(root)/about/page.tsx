import { ABOUT_STATS, APP_NAME, APP_VALUES } from '@/lib/constants/app';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NumberTicker } from '@/components/ui/number-ticker';

export const metadata: Metadata = {
  title: `About ${APP_NAME}`,
  description: `Learn more about ${APP_NAME} — a social platform built for real conversations and genuine connections.`,
};

const AboutPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isSessionActive = !!session;

  return (
    <div className='flex flex-col'>
      {/* ── Section 1 · Hero ─────────────────────────────────────── */}
      <section className='bg-primary text-primary-foreground'>
        <div className='container max-w-5xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center gap-6'>
          <Badge
            variant='outline'
            className='border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 text-xs tracking-widest uppercase'
          >
            About {APP_NAME}
          </Badge>
          <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl'>
            Where the internet comes together
          </h1>
          <p className='text-primary-foreground/80 text-lg md:text-xl max-w-2xl leading-relaxed'>
            {APP_NAME} is home to thousands of communities, billions of
            conversations, and authentic human connection — all in one place.
          </p>
          <div className='flex flex-wrap gap-3 justify-center mt-2'>
            {!isSessionActive ? (
              <Button
                asChild
                size='lg'
                className='bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold'
              >
                <Link href='/sign-up'>Join {APP_NAME}</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold'
              >
                <Link href='/'>Explore Feed</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 2 · Mission ───────────────────────────────────── */}
      <section className='py-20 bg-muted/50'>
        <div className='container max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center'>
          <div className='flex-1 flex flex-col gap-5'>
            <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
              Our Mission
            </span>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
              Bring people closer through honest conversation
            </h2>
            <Separator className='w-12 h-0.5 bg-primary rounded-full' />
            <p className='text-muted-foreground leading-relaxed'>
              We started {APP_NAME} because we believed the internet deserved a
              better place for discussion — one that rewards curiosity over
              clout, depth over doomscrolling, and community over content farms.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Every feature we build points back to that belief. Whether you are
              here to learn something new, share what you know, or simply find
              your people — Weavy is your home.
            </p>
          </div>
          <div className='flex-1 grid grid-cols-2 gap-4'>
            {[
              'Open Discussion',
              'No Algorithms',
              'User Controlled',
              'Ad-Free Future',
            ].map((pill) => (
              <div
                key={pill}
                className='rounded-xl bg-card ring-1 ring-foreground/10 px-5 py-6 flex items-center justify-center text-center text-sm font-semibold text-foreground'
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 · Stats ─────────────────────────────────────── */}
      <section className='py-20 bg-background'>
        <div className='container max-w-5xl mx-auto px-4'>
          <div className='text-center mb-14'>
            <span className='text-xs font-semibold uppercase tracking-widest text-primary mb-3 block'>
              By the numbers
            </span>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
              Weavy in numbers
            </h2>
            <p className='mt-3 text-muted-foreground max-w-md mx-auto'>
              A growing community of people who believe in open, honest
              conversation.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {ABOUT_STATS.map((stat) => (
              <div
                key={stat.label}
                className='flex flex-col items-center justify-center rounded-xl bg-card ring-1 ring-foreground/10 py-8 px-4 gap-2 text-center'
              >
                <p className='text-4xl font-extrabold text-primary tabular-nums leading-none'>
                  <NumberTicker
                    value={stat.value}
                    decimalPlaces={stat.decimalPlaces}
                  />
                  {stat.suffix}
                </p>
                <p className='text-sm text-muted-foreground font-medium'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 · Values ───────────────────────────────────── */}
      <section className='py-20 bg-muted/50'>
        <div className='container max-w-5xl mx-auto px-4'>
          <div className='text-center mb-14'>
            <span className='text-xs font-semibold uppercase tracking-widest text-primary mb-3 block'>
              What we stand for
            </span>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
              Our values
            </h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {APP_VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className='rounded-xl bg-card ring-1 ring-foreground/10 p-6 flex flex-col gap-4'
              >
                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <Icon className='w-5 h-5 text-primary' />
                </div>
                <h3 className='font-semibold text-foreground text-base'>
                  {title}
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 · CTA ──────────────────────────────────────── */}
      <section className='py-20 bg-background'>
        <div className='container max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-6'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
            Ready to join the conversation?
          </h2>
          <p className='text-muted-foreground text-lg max-w-xl leading-relaxed'>
            Millions of people are already here. Find communities you love, post
            your thoughts, and help shape what {APP_NAME} becomes next.
          </p>
          <Button asChild size='lg' className='font-semibold px-10'>
            <Link href={isSessionActive ? '/' : '/sign-up'}>
              {isSessionActive
                ? 'Start posting'
                : "Create your account — it's free"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
