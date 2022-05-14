
const {Router} = require('express')
const { check } = require('express-validator')
const 
    { 
        usuariosGet,
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch 
    } = require('../controllers/usuarios')
const { esRoleValido, emailExiste,idExiste } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.get('/',usuariosGet)
router.put('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
],usuariosPut)
router.post('/',[
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser más de 6 letras').isLength({min : 6}),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost)
router.delete('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
],usuariosDelete)
router.patch('/',usuariosPatch)




module.exports = router;