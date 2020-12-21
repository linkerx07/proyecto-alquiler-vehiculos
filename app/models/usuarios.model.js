'use strict'

const connection = require('../../config/connection')

var dataModels = {
    getUsuarios: (callback) => {
        if (connection) {
            let sql = `select * from users`

            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback(rows)
            })
        }
    },
    getRegistro(data, callback) {
        if (connection) {
            let sql = `INSERT INTO users (iduser_mail, password, full_name, documento, telefono) VALUES(${connection.escape(data.correo)}, ${connection.escape(data.pass)}, ${connection.escape(data.full_name)}, ${connection.escape(data.documento)}, ${connection.escape(data.telefono)} ) `
            connection.query(sql, (error, rows) => {

                if (!error) {
                    callback({ message: 'Usuario Registrado Correctamente, ya puede iniciar sesión!', status: '1', correo: data.correo })
                } else {
                    callback({ message: 'ERROR, el usuario con el correo: ' + data.correo + ' ya existe.', status: '0', })
                }
            })
        }
    },
    getLogin(data, callback) {

        if (connection) {
            let sql = `select * from users where iduser_mail = ${connection.escape(data.correo)} and password = ${connection.escape(data.pass)} `

            connection.query(sql, (error, rows) => {
                console.log(rows.length);
                if (rows.length == 0) {
                    callback({ mensaje: 'ERROR, Datos de Usuario incorrecto', status: '0' })
                } else if (!error) {
                    callback({ mensaje: 'Bienvenido al sistema: ' + rows[0].iduser_mail + '<br><br><h5>Ya puede reviar su perfil en Mi Cuenta, espere un momento!!!</h5>', correo: rows[0].iduser_mail, full_name: rows[0].full_name, documento: rows[0].documento, telefono: rows[0].telefono, status: '1' })
                }

            })
        }

    },


}

module.exports = dataModels