const sgMail = require('@sendgrid/mail');
const path = require('path');

const { error } = require('dotenv').config();

if (error) {
    throw new Error(error);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'sergiy.emaar88@gmail.com', // Change to your recipient
  from: 'andrii.zilnyk@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

async function sendEmailWithSendGrid() {
    try {
        const result = await sgMail.send(msg);

        console.log(result);

        console.log('Email was send');

    } catch(err) {
        console.log(err);
    }
}

sendEmailWithSendGrid();