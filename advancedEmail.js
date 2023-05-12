const dotenv = require('dotenv').config( {path: __dirname + '/config.env'}); 
const nodemailer = require('nodemailer');
const email = require('./utils/email'); 

const sampleUser = {
    fullName: 'Bob Livingstone',
    email: 'bob.livingstone@awesome.org',
    sbdID: 'AX1234'
}; 

const inScope = true;

if (inScope) {
    const msg = new email(sampleUser,inScope);
    msg.sendWelcome(); 
}