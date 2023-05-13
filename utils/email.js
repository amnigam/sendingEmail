const nodemailer = require('nodemailer'); 
const pug = require('pug'); 
const htmlToText = require('html-to-text'); 

// Create a class with methods that send out emails with pre-defined templates
// Class Constructor takes 3 args- User Object, inScope Boolean and multi Array (OPTIONAL. to handle multiple target emails)
module.exports = class Email {
    // User object contains => 1. Email     2. Full Name    3. SBD Deal ID
    constructor (user, inScope, multi=[]) {
        this.firstName = user.fullName.split(' ')[0];
        this.inScope = inScope; 
        this.sbdID = user.sbdID;
        this.from = `Amit Nigam <${process.env.EMAIL_FROM}>`; 
        if (multi.length == 0) {
            // TO list contains only 1 email to be sent to. 
            this.to = user.email;
        } else {
            // TO list contains multiple emails. 
            multi.push(user.email);
            this.to = multi.join(","); 
            console.log(multi.join(","));   // Testing to see right parameters were passed to TO field.
        }
    }; 

    // A transport method for our class to setup the right Transport object for Nodemailer.
    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // Create Transport for Sendgrid
            return nodemailer.createTransport( {
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASS
                }
            })
        }; 

        // Setup transport for MAILTRAP otherwise.
        return nodemailer.createTransport( {
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
    }; 

    // Generic method defined to send an email based on the Template & Subject passed to it. 
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

    // Method that leverages generic SEND method to send a Welcome Message intimating users for attention.
    async sendWelcome() {
        await this.send('welcome', 'Welcome to Secure By Design Program. Onboarding Message Ahead.');
    };
};
