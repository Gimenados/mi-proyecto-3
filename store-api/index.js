import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

import productsRoutes from "./src/routes/products.routes.js"; 
import { dbConection } from "./src/database/dbConection.js";

const server = express()

dotenv.config()

const api = async () => {
    await dbConection()

    server.use(express.json())
    server.use(cors())
    
    //Archivos staticos que se refiere a archivos que no son partes de nuestro codigo, que estan en nuestro servidor
    server.use('/public', express.static(`./temp/imgs`)) //Hace referencia a la ubicacion donde este alojado el proyecto ya sea en un servidor o local
    server.use("/api/products", productsRoutes) //La ruta y despues de la coma a donde va a ir 
    
    server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
}

api()