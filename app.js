const dotenv = require('dotenv').config( {path: __dirname + '/config.env'}); 
const express = require('express'); 
const sendgrid = require('./sendgridEmail'); 

const app = express(); 

app.set('view engine', 'pug'); 
app.use(express.urlencoded( {extended: true} )); 

app.get('/', (req, res) => {
    res.render('dataCapture'); 
})

app.post('/formdata', sendgrid.sendEmail)

module.exports = app; 