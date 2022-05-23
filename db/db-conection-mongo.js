const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        
        const url = 'mongodb://user_bd:khSEXV5b92fEihrF@cluster0-shard-00-00.vkfas.mongodb.net:27017,cluster0-shard-00-01.vkfas.mongodb.net:27017,cluster0-shard-00-02.vkfas.mongodb.net:27017/inventario-productos?ssl=true&replicaSet=atlas-dk4b5m-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(url);

        console.log('Coneccion Exitosa');
    } catch (error) {
        console.error(error);
    }
} 

module.exports = {
    getConnection,
}