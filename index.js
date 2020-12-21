'use strict'

const app = require('./app/app')

//database
require('./config/connection')

app.listen(app.get('port'), (error) => {
    if (error) {
        console.log(`Ha ocurrido un error: ${errror}`)
    } else {
        console.log(`server running on port: ${app.get('port')}`);
    }
})