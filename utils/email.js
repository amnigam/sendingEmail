const nodemailer = require('nodemailer'); 
const pug = require('pug'); 
const htmlToText = require('html-to-text'); 

module.exports = class Email {
    // User object contains => 1. Email     2. Full Name    3. SBD Deal ID
    constructor (user, inScope) {
        this.to = user.email;
        this.firstName = user.fullName.split(' ')[0];
        this.inScope = inScope; 
        this.sbdID = user.sbdID;
        this.from = `Chappandi Swami <${process.env.EMAIL_FROM}>`; 
    }; 

    newTransport() {
        return nodemailer.createTransport( {
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
    }; 

    // Send the actual email
    async send(template, subject) {
        // Step 1: Render template into HTML format by using PUG
        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`,
            {
                firstName: this.firstName,
                inScope: this.inScope,
                sbdID: this.sbdID,
                subject
            }
        );

        // Step 2: Define Email Options
        const htmlToTextOptions = {
            wordwrap: 130
        };
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html,htmlToTextOptions)
        }; 

        // Step 3: Create Transport and send email
        await this.newTransport().sendMail(mailOptions)
    }; 

    async sendWelcome() {
        await this.send('welcome', 'Attention: Important update relating to your project')
    };
};
