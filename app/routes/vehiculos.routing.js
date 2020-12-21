'use strict'

const route = require('express').Router()
const { getVehiculos, getUnVehiculo, agregarVehiculo, editarVehiculo, eliminarVehiculo, agregarAlquiler, getUltReferencia, getInfoAlquiler } = require('../controllers/vehiculo.controller')

route.route('/').get(getVehiculos)

route.route('/:id').get(getUnVehiculo)

route.route('/add-vehiculo').post(agregarVehiculo)

route.route('/editar-vehiculo/:id').put(editarVehiculo)

route.route('/eliminar-vehiculo/:id').delete(eliminarVehiculo)

route.route('/add-alquiler').post(agregarAlquiler)

route.route('/getultreferencia/:id').get(getUltReferencia)

route.route('/getinfo-alquiler/:id').get(getInfoAlquiler)

module.exports = route