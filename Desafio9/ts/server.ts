import { Application, application, request, response } from "express";
import express,{Request,Response} from 'express';
import ProductoController from './Controladores/productos';
import bodyp from 'body-parser';

const server:Application = express();

server.use(bodyp.json());
server.use(express.urlencoded({extended:true}));
server.use('/productos', ProductoController);

server.listen(8080,()=>{
    try {
        console.log("server iniciado en puerto 8080");
    } catch (error) {
        console.log("error: " + error);
    }
});