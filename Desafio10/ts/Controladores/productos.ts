import { Application, application, request, response } from "express";
import express,{Request,Response} from 'express';
import bodyp from 'body-parser';
import Producto from '../Clases/Productos';
import Path from 'path';

var router = express.Router()
router.use(bodyp.json());
router.use(express.urlencoded({extended:true}));


const productos = [
    {
        "title": "producto 1",
        "price": 230,
        "thumbnail": "url del primer producto"
    },
    {
        "title": "producto 2",
        "price": 123,
        "thumbnail": "url del segundo producto"
    },
    {
        "title": "producto 3",
        "price": 1280,
        "thumbnail": "url del tercer producto"
    },
    {
        "title": "producto 4",
        "price": 988,
        "thumbnail": "url del cuarto producto"
    },
    {
        "title": "producto 5",
        "price": 450,
        "thumbnail": "url del quinto producto"
    },
    {
        "title": "producto 6",
        "price": 890,
        "thumbnail": "url del sexto producto"
    },
    {
        "title": "producto 7",
        "price": 665,
        "thumbnail": "url del septimo producto"
    },
    {
        "title": "producto 8",
        "price": 1562,
        "thumbnail": "url del octavo producto"
    }
]

let aProductos : any[] = [];


router.get('/', VerificaArray, async (req:Request,res:Response) => { 
    try {
        res.status(200);
        res.json(aProductos);
    } catch (error) {
        res.status(400);
        res.json({ codigo: '400', mensaje : "error al intentar listar productos"});
    }
});

router.get('/:id', VerificaArray,  async (req:Request,res:Response) => { 
    try {
        let id: string = req.params.id;
        var productoSeleccionado = aProductos.filter((array) => array.Id == id);
        if (productoSeleccionado.length > 0){
            res.status(200);
            res.json(productoSeleccionado);
        } else {
            res.status(404);
            res.json({ codigo: 'Error', mensaje : "Producto no encontrado"});
        }
    } catch (error) {
        res.status(400);
        res.json({ codigo: '400', mensaje : "error al intentar listar productos"});
    }
});

router.get('/formulario/Crear', VerificaArray, async (req:Request, res:Response) => {
    res.status(200);
    res.sendFile(Path.join(__dirname, '../.././Public', 'index.html'));
});

router.put('/actualizar/:id', VerificaArray, verificarDatosProducto, async (req:Request, res:Response) => {
    let id: string = req.params.id;
    const { title, price, thumbnail } = req.body;
    const indiceElemento = aProductos.findIndex(prod => prod.Id == id); 
    if (indiceElemento) {
        let newProductos = [...aProductos];
        newProductos[indiceElemento] = {...newProductos[indiceElemento], Title: title};
        newProductos[indiceElemento] = {...newProductos[indiceElemento], Price: price};
        newProductos[indiceElemento] = {...newProductos[indiceElemento], Thumbnail: thumbnail};
        aProductos = newProductos;
        res.status(200);
        res.json(newProductos[indiceElemento]);
    } else {
        res.status(404);
        res.json({ codigo: '404', mensaje : "error, productono encontrado"});
    }
    
});

router.delete('/borrar/:id', VerificaArray, verificarDatosProducto, async (req:Request, res:Response) => {
    let id: string = req.params.id;
    const indiceElemento = aProductos.findIndex(prod => prod.Id == id); 
    if (indiceElemento) {
        let productoBorrado = aProductos[indiceElemento];
        aProductos.splice(indiceElemento,1);
        res.status(200);
        res.json(productoBorrado);
    } else {
        res.status(404);
        res.json({ codigo: '404', mensaje : "error, productono encontrado"});
    }
});

router.post("/",VerificaArray, verificarDatosinsertProducto, (req:Request,res:Response) => {
    try {
        const { title, price, thumbnail } = req.body;
        let objeto = {
            "title": title,
            "price": price,
            "thumbnail": thumbnail
        }
        let productoNuevo = new Producto(aProductos.length + 1, objeto);
        aProductos = [...aProductos, productoNuevo];
        res.status(200);
        res.json(productoNuevo);    
    } catch (error) {
        res.status(400);
        res.json({ codigo: 'Error', mensaje : "error inesperado, " + error});
    }
});



///////////////////  MIDDLEWARE  ///////////////////
function verificarDatosinsertProducto(req: Request, res: Response, next: Function) {
    const { title, price, thumbnail } = req.body;
    if (title == "" || !price || thumbnail == "") {
        res.status(400);
        res.json({codigo: '400', error : "Faltan valores, por favor verifique"});
    } else {
        next();
    }};

function verificarDatosProducto(req: Request, res: Response, next: Function) {
    const { title, price, thumbnail } = req.body;
    if (title == "" || !price || thumbnail == "") {
        res.status(400);
        res.json({codigo: '400', error : "Faltan valores, por favor verifique"});
    } else {
        next();
    }
};

async function VerificaArray(req: Request, res: Response, next: Function) {
    if (aProductos.length == 0) {
        GenerarListaProductos();
    }

    if (aProductos.length > 0) {
        next ();
    } else {
        res.status(400);
        res.json({ codigo: 'Error', mensaje : "No hay productos cargados"});
    }
}


///////////////////  FUNCIONES  ///////////////////
function GenerarListaProductos() {
    let indice: number = 0;
    productos.forEach(element => {
        indice ++;
        let X = new Producto(indice, element);
        aProductos = [...aProductos, X];
    });
}


export default  router;