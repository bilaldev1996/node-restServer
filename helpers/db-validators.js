const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BBDD`)
    } 
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail) {
        throw new Error(`Este correo: ${correo} ya está registrado en la BBDD`)
    }
}

const idExiste = async(id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario) {
        throw new Error(`No hay ningún usuario con este id: ${id} en la BBDD`)
    }
}

const idExisteCategoria = async(id = '') => {
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria) {
        throw new Error(`No hay ninguna categoria con este id: ${id} en la BBDD`)
    }
}

const idExisteProducto = async(id = '') => {
    const existeProducto = await Producto.findById(id)
    if(!existeProducto) {
        throw new Error(`No hay ninguna categoria con este id: ${id} en la BBDD`)
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
    idExisteCategoria,
    idExisteProducto
}