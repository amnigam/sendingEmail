const dotenv = require('dotenv').config( {path: __dirname + '/config.env'}); 
const nodemailer = require('nodemailer');
const email = require('./utils/email'); 

const sampleUser = {
    fullName: 'Amit Nigam',
    email: 'amit.nigam@iiml.org',
    sbdID: 'SBD1234'
}; 

// const multi = ['sbd-check@mailsac.com', 'amit.nigam@hackerlens.com']; 

const inScope = true;

if (inScope) {
    // const msg = new email(sampleUser,inScope, multi);
    const msg = new email(sampleUser, inScope)
    msg.sendWelcome(); 
}