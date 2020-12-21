'use strict'

const route = require('express').Router()
const { getUsuarios, getRegistro, getLogin } = require('../controllers/usuarios.controller')

route.route('/todos').get(getUsuarios)

route.route('/registro').post(getRegistro)

route.route('/login').post(getLogin)


module.exports = route