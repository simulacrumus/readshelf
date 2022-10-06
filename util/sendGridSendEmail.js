const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = async ({ to, subject, text, html }) => {
    const msg = { to, from: process.env.SENDGRID_SENDER_EMAIL_ADDRESS, subject, text, html };
    return await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error.response.body.errors)
    })
}