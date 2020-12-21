'use strict'

const http = require('http')

const express = require('express')

const path = require('path')

var moment = require('moment'); // require


const port = (process.env.PORT || 3000)

// Inizializations

const app = express()

// settings

app.set('port', port)

// middlewares

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// Include files Resources
app.use(express.static(path.join(__dirname, '/html/css')));
app.use(express.static(path.join(__dirname, '/html/js')));

// default URL for website
app.use('/web', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/', function(req, res) {
    res.redirect('/web');
});


// Routes for ApiRest (EndPoinds)
app.use('/vehiculos', require('./routes/vehiculos.routing'))
app.use('/user', require('./routes/usuarios.routing'))

module.exports = app