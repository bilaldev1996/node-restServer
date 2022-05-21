const {Router} = require('express')
const { check } = require('express-validator')
const { 
    obtenerCategorias, 
    obtenerCategoria, 
    crearCategoria, 
    actualizarCategoria, 
    borrarCategoria, 
} = require('../controllers/categorias')
const { idExisteCategoria } = require('../helpers/db-validators')

const {validarJWT,validarCampos, esAdminRole} = require('../middlewares')

const router = Router()

/* 
** {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/',obtenerCategorias)

//Obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id válido de mongo').isMongoId(),
    check('id').custom(idExisteCategoria),
    validarCampos
],obtenerCategoria)

//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idExisteCategoria),
    validarCampos
],actualizarCategoria)

//Borrar una categoria - solo si es ADMIN
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idExisteCategoria),
    validarCampos
],borrarCategoria)



module.exports = router;