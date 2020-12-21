'use strict'
var moment = require('moment'); // require
const connection = require('../../config/connection')

var dataModels = {
    getVehiculos: (callback) => {
        if (connection) {
            let sql = `select * from vehiculos`

            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback(rows)
            })
        }
    },
    getUnVehiculo: (data, callback) => {
        if (connection) {
            let sql = `select * from vehiculos where id_vehiculo = ${connection.escape(data)}`

            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback(rows)
            })
        }
    },
    getInfoAlquiler(data, callback) {
        if (connection) {
            let sql = `select * from alquiler_vehiculo, vehiculos where referencia = ${connection.escape(data)} and alquiler_vehiculo.id_vehiculo = vehiculos.id_vehiculo`

            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback(rows)
            })
        }
    },
    agregarVehiculo: (data, callback) => {
        let disp = 'Disponible'
        if (connection) {
            let sql = `INSERT INTO vehiculos (id_vehiculo, marca, modelo, anno, color, placa_vehiculo, foto, precio_dia, disponibilidad) VALUES(${connection.escape(data.id_vehiculo)}, ${connection.escape(data.marca)}, ${connection.escape(data.modelo)}, ${connection.escape(data.anno)}, ${connection.escape(data.color)}, ${connection.escape(data.placa_vehiculo)},${connection.escape(data.foto)}, ${connection.escape(data.precio_dia)}, ${connection.escape(disp)}) `
            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback({ message: 'Vehiculo Registrado' })
            })
        }
    },
    editarVehiculo: (data, callback) => {
        if (connection) {
            let sql = `update vehiculos set id_vehiculo = ${connection.escape(data.id_vehiculo)}, marca = ${connection.escape(data.marca)}, modelo = ${connection.escape(data.modelo)}, anno = ${connection.escape(data.anno)}, color = ${connection.escape(data.color)}, placa_vehiculo = ${connection.escape(data.placa_vehiculo)}, foto = ${connection.escape(data.foto)}, precio_dia = ${connection.escape(data.precio_dia)} where id_vehiculo = ${connection.escape(data.id)}`
            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback({ message: 'Vehiculo Actualizado, Placa: ' + data.id_vehiculo })
            })
        }

    },
    eliminarVehiculo: (data, callback) => {

        if (connection) {
            let sql = `delete from vehiculos where id_vehiculo = ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback({ message: 'Vehiculo Eliminado, Placa: ' + data })
            })
        }
    },
    agregarAlquiler: (data, callback) => {

        var d = new Date();
        let referencia = d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + Math.floor(Math.random() * (100000 - 999999));


        let fecha1 = moment(data.fecha_in, "YYYY-MM-DD")
        let fecha2 = moment(data.fecha_en, "YYYY-MM-DD")
        let total_dias = fecha2.diff(fecha1, 'days')

        let total_alquiler = (data.precio_dia * total_dias)

        //  console.log('precio x dia xddd: ' + data.precio_dia)

        if (connection) {
            let sql = `INSERT INTO alquiler_vehiculo (id_vehiculo, correo, full_name, telefono, documento, fecha_in, fecha_en, referencia, cantidad_dias, total_alquiler) VALUES(${connection.escape(data.id_vehiculo)}, ${connection.escape(data.correo)}, ${connection.escape(data.full_name)}, ${connection.escape(data.telefono)}, ${connection.escape(data.documento)}, ${connection.escape(data.fecha_in)}, ${connection.escape(data.fecha_en)}, ${connection.escape(referencia)}, ${connection.escape(total_dias)}, ${connection.escape(total_alquiler)}) `
            connection.query(sql, (error, rows) => {

                if (error) throw error
                callback({ message: 'Alquiler Registrado', status: '1' })



            })
        }

    },
    getUltReferencia: (data, callback) => {
        if (connection) {
            let sql = `SELECT id_alquiler, referencia FROM alquiler_vehiculo  WHERE (id_alquiler, referencia) IN ( SELECT id_alquiler , MAX(referencia)FROM alquiler_vehiculo where correo = ${connection.escape(data)} GROUP BY id_alquiler) order by id_alquiler  desc limit 1`

            connection.query(sql, (error, rows) => {
                if (error) throw error
                callback(rows)
            })
        }
    },


}

module.exports = dataModels