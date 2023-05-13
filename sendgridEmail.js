const nodemailer = require('nodemailer');
const email = require('./utils/email'); 

exports.sendEmail = (req,res) => {

    console.log(req.body);  // Logging to check content on REQ Body.
    const mailObj = {
        fullName: req.body.name,
        email: req.body.mainEmail,
        sbdID: req.body.sbd,
    }
    
    let multi = [];
    if (req.body.multiEmails.length > 0) {
        multi = req.body.multiEmails.split(',');
    };
    
    const inScope = true;
    try {
        if (inScope) {
            const msg = new email(mailObj, inScope, multi);
            msg.sendWelcome(); 
        }
    
        const respText = multi.length > 0 ? `Emails were sent to ${multi.join(',')}`: `Email was sent to ${mailObj.email}. `;
        console.log(respText);
        res.status(200).send(respText);

    } catch (e) {
        res.status(500).send(`Error Occurred. ${e}`);
    };
     
}
