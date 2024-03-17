import {PORT} from './config.js';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
} from './config.js'
import express from 'express'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
var app = express();

var con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
})
con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static('public'));

app.post('/agregarCarro',(req,res)=>{
    let carro=req.body.Carro;
    let modelo=req.body.Modelo
    let precio= req.body.Precio;
    console.log(carro)
    console.log(modelo)
    console.log(precio)
    con.query('INSERT INTO carros(nombre_coche,modelo_coche,precio_coche) VALUES ("'+carro+'","'+modelo+'","'+precio+'")', (err, respuesta, fields)=>{
        if(err)return console.log('ERROR: ', err);
        return res.send('<h1>Nombre del carro :</h1>+"'+carro+'"');

    });
});

//Delete
app.post('/borrarCarro', (req,res)=>{
    let dcarro = req.body.DCarro;
    console.log(dcarro)
    con.query('DELETE FROM carros WHERE id = "'+dcarro+'"', (err, respuesta, fields)=>{
        if(err)return console.log('ERROR: ', err);
        return res.send('<h1>Se ha borrado el carro con el id: </h1>+"'+dcarro+'"');
    });
    
});
//Update
//fun consultar


app.get('/obtenerCarro',(req,res)=>{
    
    con.query('select * from carros', (err,respuesta, fields)=>{
        if(err)return console.log('ERROR: ', err);
        var carrosHTML=``;
        var i=0;

        respuesta.forEach(carros => {
            i++;
            carrosHTML+= `  <tr>
                            <td>${i}</td>
                            <td>${carros.nombre_coche}</td>
                            <td>${carros.modelo_coche}</td>
                            <td>${carros.precio_coche}</td>  
                            <td>${carros.id}</td>
                            </tr>`;


        });

        return res.send(`<table>
                <tr>
                    <th>Num</th>
                    <th>Nombre</th>
                    <th>Modelo</th>
                    <th>Precio</th>
                    <th>ID</th>
                <tr>
                ${carrosHTML}
                </table>`
        );


    });
});

app.listen(PORT,()=>{

    console.log('servidor escuchando en el puerto ', PORT);

});