

const  validarCampos  = require('../middlewares/validar-campos')
const  validaRoles  = require('../middlewares/validar-roles')
const  validarJWT  = require('../middlewares/validar-jwt')


module.exports = {
    ...validarCampos,
    ...validaRoles,
    ...validarJWT
}