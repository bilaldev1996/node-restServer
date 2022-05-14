

const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre : {
        type: 'String',
        require : [true,'El nombre es obligatorio']
    },
    correo : {
        type: 'String',
        require : [true,'El correo es obligatorio'],
        unique : true
    },
    password : {
        type: 'String',
        require : [true,'La contraseña es obligatoria']
    },
    img : {
        type: 'String'
    },
    rol : {
        type: 'String',
        require : [true,'El nombre es obligatorio'],
        emun : ['ADMIN_ROLE','USER_ROLE']
    },
    estado : {
        type: Boolean,
        default: true
    },
    google : {
        type: Boolean,
        default: false
    }
})

//Sobreescribir el método toJson para eliminar los campos que no queremos que se envien a la BBDD
UsuarioSchema.methods.toJSON = function(){
    const {__v,password,...usuario } = this.toObject();
    return usuario
}


module.exports = model('Usuario',UsuarioSchema);