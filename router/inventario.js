const {Router} = require('express');
const Inventario = require('../models/Inventario');

const router = Router();

router.post('/', async function(req, res){
    try {
        const existeInventarioPorSerial = await Inventario.findOne({serial: req.body.serial});
        if (existeInventarioPorSerial){
            return res.send('Ya existe este serial en el sistema');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();
        res.send(inventario);
    } catch (error) {
        console.error(error);
    }
});
router.get('/', async function(req, res){
    try{
        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario'
            },
            {
                path: 'marca'
            },
            {
                path: 'tipoEquipo'
            },
            {
                path: 'estadoEquipo'
            }

        ]);
        res.send(inventarios);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar inventarios')
    }
});

router.put('/:inventarioId', async function(req, res) {
    try {
        let inventario = await Inventario.findById(req.params.inventarioId);
        // verificamos y si no existe el inventario no se actualiza
        if (!inventario) {
            return res.status(400).send('No existe el inventario');
        } 

        const { serial, modelo, descripcion, color, foto, 
            precio, usuario, marca, tipoEquipo, estadoEquipo, fechaCompra } = req.body;
        
            // buscamos por serial pero distinto al inventario que estoy actualizando
            const inventarioExisteXSerial = await Inventario
                    .findOne({ serial: serial, _id: { $ne: inventario._id } });
            if (inventarioExisteXSerial) {
                return res.status(400).send('El serial ya existe');
            } 
            
            const fechaActual = new Date();

            inventario.serial = serial;
            inventario.modelo = modelo;
            inventario.descripcion = descripcion;
            inventario.color = color;
            inventario.foto = foto; 
            inventario.precio = precio;
            inventario.usuario = usuario._id;
            inventario.tipoEquipo = tipoEquipo._id;
            inventario.estadoEquipo = estadoEquipo._id;
            inventario.marca = marca._id;
            inventario.fechaCompra = fechaCompra;
            inventario.fechaActualizacion = fechaActual;
            inventario = await inventario.save();
            res.send(inventario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
    }
});

module.exports = router;