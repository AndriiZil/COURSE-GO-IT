const nodemailer = require('nodemailer');

const { error } = require('dotenv').config();

if (error) {
    throw new Error(error);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    }
});

const mailOptions = {
    from: process.env.NODEMAILER_USER, // sender address
    to: "andrii.zilnyk@gmail.com", // ['test@gmail.com', 'example@gmail.com']
    subject: "Example Email delivery to account ✔", // Subject line
    text: "Hello Andrii", // plain text body
    html: "<b>Hello world?</b>", // html body
};

async function sendEmailWithNodemailer() {
    try {
        const result = await transporter.sendMail(mailOptions);

        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

sendEmailWithNodemailer();