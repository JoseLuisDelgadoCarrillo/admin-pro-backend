require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//crear servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
dbConnection();


//Rutas
app.get( '/', (req, res) => {

    res.json({
        ok:true,
        msg: 'Hola Mundo'
    })
    
} );


//mean_user 
//H9fmR3C3aQMifUft


app.listen(process.env.PORT, ( )=> {
    console.log('Servidor corriendo', + process.env.PORT)
});