import { Resend } from 'resend';

export const resendDomain = process.env.RESEND_DOMAIN;

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
