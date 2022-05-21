const { response,request } = require("express");
const { Categoria} = require("../models")



//ObtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req=request, res=response) =>{
    const [total,categorias] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true}).populate('usuario','nombre')
    ])
    res.json({
        total,
        categorias
    })
}


//ObtenerCategoria - populate {}
const obtenerCategoria = async(req=request, res=response) =>{

    const { id } = req.params
    const categoria = await Categoria.findById(id).populate('usuario','nombre')
    if(!categoria.estado){
        res.status(404).json({
            msg : `No existe ninguna categoria con este id : ${id} en la DB`
        })
    }
    res.json({
        categoria
    })
    
}
const crearCategoria = async(req=request, res=response) =>{
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({ nombre })

    if(categoriaDB) {
        res.status(400).json({ 
            msg : `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    //Generar la data a guardar
    const data = { 
        nombre,
        usuario : req.usuario._id
    }

    const categoria = new Categoria( data )

    //Guardar DB para
    await categoria.save()


    res.status(201).json(categoria)
}


// actualizarCategoria
const actualizarCategoria = async(req=request, res=response) =>{

    const { id } = req.params
    const {estado,usuario,...data} = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true})

    res.json({
        categoria
    })
}


//borrarCategoria - estado : false
const borrarCategoria = async(req=request, res=response) =>{
    const {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate(id,{ estado: false},{new:true})
    res.json({
        categoria
    })
}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}