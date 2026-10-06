import 'server-only';
import nodemailer from 'nodemailer';
import { createFarmoraEmailTemplate } from '@/lib/email-template';

function getMailer() {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass)
        throw new Error(
            'SMTP_USER and SMTP_PASS must be configured before email can be sent.',
        );
    return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
    });
}

type EmailContents = Parameters<typeof createFarmoraEmailTemplate>[0];

type SendEmailOptions = {
    to: string;
    subject: string;
    text: string;
    contents: EmailContents;
};

type RecipientOptions = {
    email: string;
    name?: string | null;
};

type RecipientWithUrlOptions = RecipientOptions & {
    url: string;
};

/** Sends a server-only, Farmora-branded email through Gmail SMTP. */
async function sendEmail({ to, subject, text, contents }: SendEmailOptions) {
    await getMailer().sendMail({
        from: `"Farmora" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html: createFarmoraEmailTemplate(contents),
    });
}

function greet(name?: string | null) {
    return `Hello ${name || 'there'},`;
}

export async function sendExistingUserEmail({ email, name }: RecipientOptions) {
    const loginUrl = new URL(
        '/login',
        process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    ).toString();

    await sendEmail({
        to: email,
        subject: 'Sign-up attempt on your Farmora account',
        text: `Someone tried to create a Farmora account using your email address. If this was you, sign in instead: ${loginUrl}. If not, you can safely ignore this email.`,
        contents: {
            preheader: 'Someone tried to sign up with your email',
            title: 'You already have an account',
            greeting: greet(name),
            message:
                'Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.',
            actionLabel: 'Sign in',
            actionUrl: loginUrl,
            footer: 'If you did not attempt to sign up, no action is needed. Your account remains secure.',
        },
    });
}

export async function sendVerificationEmail({
    email,
    name,
    url,
}: RecipientWithUrlOptions) {
    await sendEmail({
        to: email,
        subject: 'Verify your Farmora email address',
        text: `Verify your Farmora email address: ${url}`,
        contents: {
            preheader: 'Verify your Farmora account',
            title: 'Verify your email',
            greeting: greet(name),
            message:
                'Welcome to Farmora. Confirm your email address to activate your marketplace account.',
            actionLabel: 'Verify email',
            actionUrl: url,
        },
    });
}

export async function sendPasswordResetEmail({
    email,
    name,
    url,
}: RecipientWithUrlOptions) {
    await sendEmail({
        to: email,
        subject: 'Reset your Farmora password',
        text: `Reset your Farmora password: ${url}`,
        contents: {
            preheader: 'Reset your Farmora password',
            title: 'Reset your password',
            greeting: greet(name),
            message:
                'We received a request to reset your Farmora password. This link expires in one hour.',
            actionLabel: 'Reset password',
            actionUrl: url,
            footer: 'If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.',
        },
    });
}
