const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config')

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios' 
        this.autPath = '/api/auth'

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

        this.app.use(this.autPath,require('../routes/auth'))
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('listening on port',this.port)
        })
    }

}

module.exports = Server;