const { response } = require('express')
const { ObjectId } = require('mongoose').Types;
const {Usuario,Categoria,Producto} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res=response) =>{

    const esMongoID = ObjectId.isValid( termino )
    
    if( esMongoID ){
        
        const categoria = await Usuario.findById( termino )
        return res.json({
            results : (categoria) ? [ categoria ] : []
        })
    }

    const regex = new RegExp( termino,'i' )
    const usuarios = await Usuario.find({ 
        $or: [{ nombre : regex },{ correo:regex }],
        $and: [{estado: true}]
     })

    res.json( { 
        results : usuarios
    })
}

const buscarCategorias = async(termino = '', res=response) =>{
    const esMongoID = ObjectId.isValid( termino )
    
    if( esMongoID ){
        
        const categoria = await Categoria.findById( termino )
        return res.json({
            results : (categoria) ? [ categoria ] : []
        })
    }

    const regex = new RegExp( termino,'i' )
    const categorias = await Categoria.find({ nombre : regex, estado:true })

    res.json( { 
        results : categorias
    })
}

const buscarProductos = async(termino = '', res=response) =>{
    const esMongoID = ObjectId.isValid( termino )
    
    if( esMongoID ){
        
        const productos = await Producto.findById( termino )
                                        .populate('categoria','nombre')
        return res.json({
            results : (productos) ? [ productos ] : []
        })
    }

    const regex = new RegExp( termino,'i' )
    const productos = await Producto.find({ nombre : regex, estado:true })
                                    .populate('categoria','nombre')

    res.json( { 
        results : productos
    })
}


const buscar = (req,res=response) => {

    const { coleccion, termino } = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg : `Las colecciones permitidas son ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;

        case 'categorias':
            buscarCategorias(termino,res)
            break;
        
        case 'productos':
            buscarProductos(termino,res)
            break;
    
        default:
            res.status(500).json({
                msg : 'Se le olvido hacer la busqueda '
            })
    }

}

//Buscar todos los productos de una categoria
const busqueda = async(req, res=response) => {
    const { categoria } = req.params

    const esMongoID = ObjectId.isValid( categoria )
    if(!esMongoID){
        res.status(404).json({ msq : 'No es un id de mongo valido'})
    }
    const productos = await Producto.find({ categoria : ObjectId(categoria) })

    const todosProductos = []
    productos.forEach(producto =>{
        console.log(producto.nombre)
        todosProductos.push(producto.nombre)
    })
    res.json(todosProductos)

}


module.exports = {
    buscar,
    busqueda
}