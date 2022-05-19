const { response } = require('express');
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify')



const login = async(req, res = response) => {
    const {correo,password} = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo})

        if(!usuario) {
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos - usuario'
            })
        }

        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg : 'El usuario no está activo en la BBDD'
            })
        }

        //Vefiicar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password)

        if (!validPassword){
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id )


        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'Hable con el administrador'
        })
    }
}

const google = async(req,res=response)=>{
    const { id_token } = req.body

    try{
        const {correo,nombre,img} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if(!usuario) {
            //Tengo que crearlo si no existe
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol:'USER_ROLE',
                google : true
            }

            usuario = new Usuario(data)
            await usuario.save()
        }


        //Si el usuario en DB tiene el estado en false = eliminado
        if( !usuario.estado ) {
            return res.status(401).json({
                msg : 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)



        res.json({
            usuario,
            token
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            ok: false,
            msg : 'EL token no se pudo verificar'
        })
    }

}


module.exports = {
    login,
    google
}