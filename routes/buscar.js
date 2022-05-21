
const { Router } = require('express')
const { buscar,busqueda } = require('../controllers/buscar')

const router = Router()

router.get('/:coleccion/:termino',buscar)

router.get('/:categoria',busqueda)





module.exports = router;