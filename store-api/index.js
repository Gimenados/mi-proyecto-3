import express from 'express';
import cors from "cors";
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

import productsRoutes from "./src/routes/products.routes.js"; 
import { dbConection } from "./src/database/dbConection.js";

const server = express()

dotenv.config()

const api = async () => {
    await dbConection()
    
    const __filename = fileURLToPath(import.meta.url) 
    const __dirname = path.dirname(__filename)
    
    server.use(cors());
      
    server.use(express.json())
    server.use('/public', express.static(path.join(__dirname, '/temp/imgs'))) 
    server.use("/api/products", productsRoutes)
    
    server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
}

api()