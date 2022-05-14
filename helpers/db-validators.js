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


module.exports = {
    esRoleValido,
    emailExiste,
    idExiste
}