'use strict'

const dataModels = require('../models/vehiculo.model')

function getVehiculos(req, res) {

    dataModels.getVehiculos((data, error) => {
        res.json(data)
    })

}

function getUnVehiculo(req, res) {
    console.log("id : ", req.params)
    const { id } = req.params
    dataModels.getUnVehiculo(id, (data, error) => {
        res.json(data)
    })
}

function getInfoAlquiler(req, res) {
    const { id } = req.params
    dataModels.getInfoAlquiler(id, (data, error) => {
        res.json(data)
    })
}


function agregarVehiculo(req, res) {
    const { id_vehiculo, marca, modelo, anno, color, placa_vehiculo, foto, precio_dia } = req.body
    console.log(`vehiculos: ${id_vehiculo}, ${marca}, ${modelo}, ${anno}, ${color}, ${placa_vehiculo}, ${foto}, , ${precio_dia}`)
    dataModels.agregarVehiculo({ id_vehiculo, marca, modelo, anno, color, placa_vehiculo, foto, precio_dia }, (data, error) => {
        res.json(data)
    })
}

function editarVehiculo(req, res) {
    const { id } = req.params
    const { id_vehiculo, marca, modelo, anno, color, placa_vehiculo, foto, precio_dia } = req.body
    dataModels.editarVehiculo({ id, id_vehiculo, marca, modelo, anno, color, placa_vehiculo, foto, precio_dia }, (data, error) => {
        res.json(data)
    })
}

function eliminarVehiculo(req, res) {
    const { id } = req.params
    dataModels.eliminarVehiculo(id, (data, error) => {
        res.json(data)
    })

}

// El alquiler consta de dos partes, una que trae en backend el costo del auto x dia y multiplica su valor por los dias seleccionados para determinar el total.
function agregarAlquiler(req, res) {

    const { id_vehiculo, correo, full_name, telefono, documento, fecha_in, fecha_en, cantidad_dias } = req.body
        // console.log(`Alquiler: ${id_vehiculo}, ${correo}, ${full_name}, ${telefono}, ${documento}, ${fecha_in}, ${fecha_en}, ${cantidad_dias}`)
    let info;

    dataModels.getUnVehiculo(id_vehiculo, (data, error) => {
        // ??
        info = JSON.stringify(data)
        info = JSON.parse(info)
            // console.log(info[0]['precio_dia'])


        if (info.length > 0) {
            let precio_dia = info[0]['precio_dia']
            dataModels.agregarAlquiler({ id_vehiculo, correo, full_name, telefono, documento, fecha_in, fecha_en, cantidad_dias, precio_dia }, (data, error) => {
                //   console.log(data.status)
                res.json(data)
            })
        } else {
            console.log('ERROR, ID DESCONOCIDO');
            res.json({ mensaje: 'ERROR, El ID del vehiculo no existe, coloque uno que se encuentre registrado', status: '0' })
        }



        // res.json(data)

    })



}

function getUltReferencia(req, res) {
    console.log("id : ", req.params)
    const { id } = req.params
    dataModels.getUltReferencia(id, (data, error) => {
        res.json(data)
    })
}


module.exports = {
    getVehiculos,
    getUnVehiculo,
    agregarVehiculo,
    agregarVehiculo,
    editarVehiculo,
    eliminarVehiculo,
    agregarAlquiler,
    getUltReferencia,
    getInfoAlquiler
}