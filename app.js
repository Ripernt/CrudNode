const express = require('express');
const mysql = require("mysql2")

var app = express();

var bodyParser = require("body-parser");

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GAty_w42',
    database: 'mybase'
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

app.listen(8080,()=>{

    console.log('servidor escuchando en el puerto 8080');

});