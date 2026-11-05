'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendActivationEmail = async (emailAddress, token) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const emailFrom =
    process.env.EMAIL_FROM || '"Pensário" <contato@pensario.com>';

  const info = await transporter.sendMail({
    from: emailFrom,
    to: emailAddress,
    subject: 'Ative sua conta - Pensário',
    text: `Olá! Este é um e-mail para ativar a sua conta no Pensário. Acesse: ${frontendUrl}/activate/${token}`,
    html: `<p>Olá! Seja bem-vindo ao Pensário.</p><p><a href="${frontendUrl}/activate/${token}">Clique aqui para ativar sua conta</a></p>`,
  });

  return info;
};

const sendPasswordResetEmail = async (emailAddress, token) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const emailFrom =
    process.env.EMAIL_FROM || '"Pensário" <contato@pensario.com>';

  const resetPassword = await transporter.sendMail({
    from: emailFrom,
    to: emailAddress,
    subject: 'Redefina sua senha - Pensário',
    text: `Olá! Este é um e-mail para redefinir a sua senha no Pensário. Acesse: ${frontendUrl}/password-reset/${token}`,
    html: `<p>Olá!</p><p><a href="${frontendUrl}/password-reset/${token}">Clique aqui para redefinir sua senha</a></p>`,
  });

  return resetPassword;
};

module.exports = {
  sendActivationEmail,
  sendPasswordResetEmail,
};
