const nodemailer = require('nodemailer')

async function sendConfirmationEmail (email, token) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASSWORD
        }
    })
    const sendEmail = await transporter.sendMail({
        to: email,
        subject: 'Jobdesk Email Verification',
        html: `Welcome to Jobdesk
        <br>
        <br>
        Please verify your email <a href="https://jobdesk-hubb.herokuapp.com/confirm/${token}">here</a>
        <br>
        <br>
        Glad to welcome you =)
        <br>
        <br>
        <b>Jobdesk Team</b>`
    })
    console.log(sendEmail, '<<<<< hasil dari send confirmation email');
}

module.exports = {
    sendConfirmationEmail
}