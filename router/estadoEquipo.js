const { Router} = require('express');

const router = Router();
const EstadoEquipo = require('../models/EstadoEquipo');


router.get('/', async function (req, res){
    try {
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos); // []
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
});

router.post('/', async function (req, res){
    try {
        console.log('informacion de estadoEquipos recibida', req.body);

        let estadoEquipo = new EstadoEquipo(req.body);
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    };
});

router.put('/:id', async function (req, res) {
    try {
        let estadoEquipo = await EstadoEquipo.findById(req.params.id);
        // sino existe el usuario muestro el error y entonces no actualizo
        if (!estadoEquipo) {
            return res.status(400).send(' el estadoEquipo No existe');
        }

        const { nombre, estado } = req.body;
        const fechaActual = new Date();

        estadoEquipo.nombre = nombre;
        estadoEquipo.estado = estado;
        estadoEquipo.fechaActualizacion = fechaActual;
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
        console.log('Modificacion exitosa');

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
});

module.exports = router;

