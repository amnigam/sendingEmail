const dotenv = require('dotenv').config( {path: __dirname + '/config.env'}); 
const nodemailer = require('nodemailer'); 

// This is a very simple code to see how I can send emails - First to Mail Trap service.
// Step 1 - Create a Transport
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

// Step 2 - Specify Options
const mailOptions = { 
    from: `Chappandi Swami <${process.env.EMAIL_FROM}>`,
    to: 'Idi Undi <batman@marvel.inc>', 
    subject: 'Testing Email with Nodemailer',
    text: 'Hello from the nodemailer!'
}; 

// Step 3 - Sending the email
transport.sendMail(mailOptions, (error,info) => {
    if (error) {
        return console.log(error); 
    }
    console.log(`Messsage Sent. ${info.messageId}`);     
});
