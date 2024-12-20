"use server";

import { VerifyEmailType, RestorePassType } from "@/lib/definitions";
import nodemailer from "nodemailer";

async function createEmailTransport() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "", 10),
      secure: Boolean(process.env.SMTP_SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

export async function sendEmailVerification({ email, code }: VerifyEmailType) {
    try {
      const transporter = await createEmailTransport();
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Verifica tu dirección de correo electrónico",
        text: `
          Buenaaas,
          \r\n
          Has creado una cuenta deCompeti para generar calendarios deportivos para competiciones de eSports.
          \r\n
          Verifica tu dirección de correo electrónico accediendo a la siguiente dirección web para poder identificarte en deCompeti.
          \r\n
          ${process.env.APP_DOMAIN}/api/auth/verify-email?code=${code}&email=${email}
          \r\n
          Saludos,
        `,
        html: `
          <p>Buenaaas,</p>
          <p>Has creado una cuenta deCompeti para generar calendarios deportivos para competiciones de eSports.</p>
          <p>Verifica tu dirección de correo electrónico para poder identificarte en deCompeti.</p>
          <p>
            <a href="${process.env.APP_DOMAIN}/api/auth/verify-email?code=${code}&email=${email}">
              Verificar esta dirección e–mail
            </a>
          </p>
          <p>Saludos,
        `
      });
      return info;
    }
    catch(message) {
      console.error(message);
      return null;
    };
  }
  
  export async function sendEmailRestorePass({ email, code }: RestorePassType) {
    try {
      const transporter = await createEmailTransport();
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Restaurar contraseña en deCompeti",
        text: `
          Buenaaas,
          \r\n
          Has solicitado restablecer la contraseña deCompeti. Para cambiarla accede a la siguiente dirección:
          \r\n
          ${process.env.APP_DOMAIN}/api/auth/restore-pass?email=${email}&code=${code}
          \r\n
          Si no has solicitado tú restablecer la contraseña, omite este correo electrónico.
          \r\n
          Saludos,
        `,
        html: `
          <p>Buenaaas,</p>
          <p>Has solicitado restablecer la contraseña deCompeti. Para cambiarla accede a la siguiente dirección:</p>
          <p>
            <a href="${process.env.APP_DOMAIN}/api/auth/restore-pass?email=${email}&code=${code}">
              Restablecer contraseña
            </a>
          </p>
          <p>Si no has solicitado tú restablecer la contraseña, omite este correo electrónico.</p>
          <p>Saludos,
        `
      });
      return info;
    }
    catch(message) {
      console.error(message);
      return null;
    };
  }