import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
  pool: true,
});

const domain = process.env.NEXT_PUBLIC_EMAIL_URL;
const name = process.env.NEXT_PUBLIC_APP_NAME;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: `${name} <onboarding@${domain}>`,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: `${name} <onboarding@${domain}>`,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: `${name} <onboarding@${domain}>`,
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendInviteEmail = async (email: string, token: string) => {
  const acceptLink = `${domain}/invite?token=${token}`;

  await transporter.sendMail({
    from: `${name} <organization@${domain}>`,
    to: email,
    subject: 'You have been invited to join the team',
    html: `<p>Click <a href="${acceptLink}">here</a> to join.</p>`,
  });
};
