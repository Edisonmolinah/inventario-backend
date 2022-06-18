const express = require('express');
const {getConnection} = require('./db/db-conection-mongo');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

getConnection();

//parseo a Json
app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/inventario', require('./router/inventario'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
