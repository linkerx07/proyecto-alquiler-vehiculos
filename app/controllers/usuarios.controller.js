'use strict'

const dataModels = require('../models/usuarios.model')

function getUsuarios(req, res) {

    dataModels.getUsuarios((data, error) => {
        res.json(data)
    })

}

function getRegistro(req, res) {
    const { correo, pass, full_name, documento, telefono } = req.body
    console.log(`Usuario: ${correo}, ${pass}, ${full_name}, ${documento}, ${telefono}`)
    dataModels.getRegistro({ correo, pass, full_name, documento, telefono }, (data, error) => {
        console.log(data)

        res.json(data)
    })

}

function getLogin(req, res) {
    const { correo, pass } = req.body
    console.log(`Usuario: ${correo}, ${pass}`)
    dataModels.getLogin({ correo, pass }, (data, error) => {
        console.log(data)

        res.json(data)
    })
}


module.exports = {
    getUsuarios,
    getRegistro,
    getLogin
}