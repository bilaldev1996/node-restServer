const {response,request} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const usuariosGet = async(req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
                            .skip(Number(desde))
                            .limit(Number(limite))
    ])
    
    res.json({
        total,
        usuarios
    })
}

const usuariosPost =  async (req, res) => {
    
    const {nombre,correo,password,rol}= req.body
    const usuario = new Usuario({nombre,correo,password,rol})
    
    //Verificar si el correo existe

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10)
    usuario.password = bcryptjs.hashSync( password,salt )

    //Guardar en BBDD
    await usuario.save()
    res.json({
        usuario
    })
}

const usuariosPut =  async(req, res) => {
    const {id} = req.params

    const { _id,password,google,correo,...rest } = req.body


    //TODO : validar contra BBBD
    if (password){
        const salt = bcryptjs.genSaltSync(10)
        rest.password = bcryptjs.hashSync( password,salt )
    }

    const usuario = await Usuario.findByIdAndUpdate(id,rest,{new:true})
    res.json({
        usuario
    })
}


const usuariosDelete =  async(req, res) => {
    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

    
    res.json({
        usuario
    })
}


const usuariosPatch =  (req, res) => {
    res.json({
        msg : 'patch API - controlador'
    })
}


module.exports =  {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}