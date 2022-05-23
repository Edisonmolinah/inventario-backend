const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');

router.post('/', async function (req, res) {
    try {
        console.log('info usiario recibida', req.body);

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        console.log('respuesta existe usuario', existeUsuario)
        if (existeUsuario) {
            return res.send('Existe un usuario registrado con este Email')
        }

        let usuario = new Usuario(req.body);
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    };

});

router.get('/', async function (req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios); //devuelve una lista de usuarios []
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
});
router.put('/:id', async function (req, res) {
    //console.log(req.params.id);
    try {
        let usuario = await Usuario.findById(req.params.id);
        // sino existe el usuario muestro el error y entonces no actualizo
        if (!usuario) {
            return res.status(400).send(' el usuario No existe');
        }

        const { nombre, email, estado } = req.body;
        const fechaActual = new Date();

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.estado = estado;
        usuario.fechaActualizacion = fechaActual;
        usuario = await usuario.save();
        res.send(usuario);
        console.log('Modificacion exitosa');

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
});

module.exports = router;