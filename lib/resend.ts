import { Resend } from 'resend';

const resendDomain = process.env.RESEND_DOMAIN;

const resend = new Resend(process.env.RESEND_API_KEY);

export { resend, resendDomain };
