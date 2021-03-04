import { Application, application, request, response } from "express";
import express,{Request,Response} from 'express';
import ProductoController from './Controladores/productos';
import bodyp from 'body-parser';
import fs from 'fs';

const server:Application = express();

server.use(bodyp.json());
server.use(express.urlencoded({extended:true}));
server.use('/productos', ProductoController);
server.set('views', './views');
server.set('view engine', 'ntl');

interface Plantilla{
    title: string,
    mesagge: string
};

server.engine('ntl', (filepath:string, options: Plantilla, callback: Function): any=>{
    fs.readFile(filepath, function (err, content) {
        if(err) return callback(new Error(err.message));
        let rendered = content.toString()
        .replace('#title#',''+options.title+'')
        .replace('#mesagge#',''+options.mesagge+'');
        return callback(null,rendered);
    })
});


server.listen(8080,()=>{
    try {
        console.log("server iniciado en puerto 8080");
    } catch (error) {
        console.log("error: " + error);
    }
});