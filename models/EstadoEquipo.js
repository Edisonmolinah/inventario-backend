const { Schema, model } = require('mongoose');

const EstadoEquipoSchema = Schema ({
    nombre: {
        type: 'string',
        required: true,
    },
    estado: {
        type: String,
        required: true,
        enum:[
            'Activo',
            'Inactivo',
        ]
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: String,
        required: true,
    }
});

module.exports = model('EstadoEquipo', EstadoEquipoSchema);