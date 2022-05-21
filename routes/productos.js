const {Router} = require('express')
const { check } = require('express-validator')
const { obtenerProducto, 
        obtenerProductos, 
        crearProducto, 
        actualizarProducto, 
        borrarProducto 
    } = require('../controllers/productos')

const { idExisteCategoria,idExisteProducto } = require('../helpers/db-validators')

const {validarJWT,validarCampos, esAdminRole} = require('../middlewares')

const router = Router()

router.get('/',obtenerProductos)


router.get('/:id',[
    check('id','No es un id válido de mongo').isMongoId(),
    check('id').custom(idExisteProducto),
    validarCampos
],obtenerProducto)


router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id válido de mongo').isMongoId(),
    check('categoria').custom(idExisteCategoria),
    validarCampos
],crearProducto)


router.put('/:id',[
    validarJWT,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idExisteProducto),
    validarCampos
],actualizarProducto)


router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(idExisteProducto),
    validarCampos
],borrarProducto)

module.exports = router;