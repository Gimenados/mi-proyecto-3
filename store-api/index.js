import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet'; // Importa el middleware helmet

import productsRoutes from "./src/routes/products.routes.js"; 
import { dbConection } from "./src/database/dbConection.js";

const server = express()

dotenv.config()

const api = async () => {
    await dbConection()
    
    
    server.use(cors());

    server.use(helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
            scriptSrc: ["'self'", 'cdnjs.cloudflare.com']
          }
        }
      }));
      
    server.use(express.json())
    server.use('/public', express.static(`/temp/imgs`))
    server.use("/api/products", productsRoutes)
    
    server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
}

api()
