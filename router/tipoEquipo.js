const {Router} = require('express');
const router = Router();
const TipoEquipo = require('../models/TipoEquipo');

router.post('/', async function(req, res){
    try {
    console.log('informacion de TipoEquipo recibida', req.body);

    let tipoEquipo = new TipoEquipo(req.body);
    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaCreacion = new Date();
    tipoEquipo.fechaActualizacion = new Date();

    tipoEquipo = await tipoEquipo.save();
    res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    };

});
router.get('/', async function(req, res){
    try {
        const tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos); //aqui devuelve una lista con las marcas
    }catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }});

router.put('/:id', async function(req, res){
    try {
        let tipoEquipo = await TipoEquipo.findById(req.params.id);
        // sino existe el tipo de equipo muestra el error y entonces no actualiza la marca
        if (!tipoEquipo) {
            return res.status(400).send(' El tipoEquipo ingresado con ese Id No existe');
        }

        const { nombre, estado } = req.body;
        const fechaActual = new Date();

        tipoEquipo.nombre = nombre;
        tipoEquipo.estado = estado;
        tipoEquipo.fechaActualizacion = fechaActual;
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);
        console.log('Modificacion exitosa');

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }});

module.exports = router;