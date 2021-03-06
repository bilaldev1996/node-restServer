const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config')

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            'auth':       '/api/auth',
            'buscar':       '/api/buscar',
            'categorias': '/api/categorias',
            'usuarios':   '/api/usuarios',
            'productos':   '/api/productos'
        }
        //Conectar a BBDD
        this.conectarDB()

        // Middlewares
        this.middlewares()

        //Rutas de mi aplicación
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        //cors
        this.app.use(cors());

        //lECTURA Y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.usuarios,require('../routes/usuarios')),
        this.app.use(this.paths.categorias,require('../routes/categorias')),
        this.app.use(this.paths.productos,require('../routes/productos')),
        this.app.use(this.paths.buscar,require('../routes/buscar'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('listening on port',this.port)
        })
    }

}

module.exports = Server;