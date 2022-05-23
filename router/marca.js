const {Router} = require('express');
const router = Router();
const Marca = require('../models/Marca');

router.post('/', async function(req, res){
    try {
        console.log('informacion de Marca recibida', req.body);

        let marca = new Marca(req.body);
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);

    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    };
});

router.get('/', async function(req, res){
    try {
        const marcas = await Marca.find();
        res.send(marcas); //aqui devuelve una lista con las marcas
    }catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.put('/:id', async function (req, res) {
    //console.log(req.params.id);
    try {
        let marca = await Marca.findById(req.params.id);
        // sino existe la marca muestra el error y entonces no actualiza la marca
        if (!marca) {
            return res.status(400).send(' La Marca ingresada con ese Id No existe');
        }

        const { nombre, estado } = req.body;
        const fechaActual = new Date();

        marca.nombre = nombre;
        marca.estado = estado;
        marca.fechaActualizacion = fechaActual;
        marca = await marca.save();
        res.send(marca);
        console.log('Modificacion exitosa');

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
});

module.exports = router;