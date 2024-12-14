// lib/mail.ts

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendcontactConfirmation(contact: any) {
  // Email au patient
  const patientMailOptions = {
    from: `"Aesthetica" <${process.env.SMTP_USER}>`,
    to: contact.email,
    subject: "Confirmation de votre demande",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #4CAF50;">Bonjour ${contact.name},</h2>
        <p>Nous avons bien reçu votre demande concernant :</p>
        <p style="font-style: italic; font-size: 1.1em;">"${contact.object}"</p>
        <p>Notre équipe vous répondra dans les plus brefs délais, sous 24h ouvrées.</p>
        ${contact.message ? `<p><strong>Votre message :</strong> ${contact.message}</p>` : ""}
        <p style="color: #999;">Si vous avez des questions, n'hésitez pas à nous contacter directement.</p>
        <p>Cordialement,</p>
        <p><strong>L'équipe Aesthetica</strong></p>
      </div>
    `,
  };

  // Email à l'administrateur
  const adminMailOptions = {
    from: `"Système Aesthetica" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Nouvelle demande de contact",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Nouvelle demande de contact reçue</h2>
        <ul>
          <li><strong>Nom :</strong> ${contact.name}</li>
          <li><strong>Email :</strong> ${contact.email}</li>
          <li><strong>Téléphone :</strong> ${contact.phone}</li>
          <li><strong>Objet :</strong> ${contact.object}</li>
          ${contact.message ? `<li><strong>Message :</strong> ${contact.message}</li>` : ""}
        </ul>
        <p style="color: #999;">Merci de traiter cette demande dans les plus brefs délais.</p>
      </div>
    `,
  };

  // Envoi des emails
  await transporter.sendMail(patientMailOptions);
  await transporter.sendMail(adminMailOptions);
}


export async function sendAppointmentConfirmation(appointment: any) {
  // Email au patient
  await transporter.sendMail({
    from: '"Aesthetica" <no-reply@aesthetica.fr>',
    to: appointment.email,
    subject: "Confirmation de votre rendez-vous",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Confirmation de votre rendez-vous</h2>
        <p>Cher(e) ${appointment.firstName},</p>
        <p>Votre rendez-vous a bien été enregistré :</p>
        <ul>
          <li>Date : ${new Date(appointment.date).toLocaleDateString('fr-FR')}</li>
          <li>Heure : ${appointment.time}</li>
          <li>Service : ${appointment.service}</li>
        </ul>
        <p>Nous vous attendons à notre clinique.</p>
      </div>
    `,
  });

  // Email à la clinique
  await transporter.sendMail({
    from: '"Système de RDV" <no-reply@aesthetica.fr>',
    to: process.env.ADMIN_EMAIL,
    subject: "Nouveau rendez-vous",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Nouveau rendez-vous</h2>
        <p>Détails du rendez-vous :</p>
        <ul>
          <li>Patient : ${appointment.firstName} ${appointment.lastName}</li>
          <li>Email : ${appointment.email}</li>
          <li>Téléphone : ${appointment.phone}</li>
          <li>Date : ${new Date(appointment.date).toLocaleDateString('fr-FR')}</li>
          <li>Heure : ${appointment.time}</li>
          <li>Service : ${appointment.service}</li>
          ${appointment.message ? `<li>Message : ${appointment.message}</li>` : ''}
        </ul>
      </div>
    `,
  });
}