import express from 'express';
import cors from "cors";
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

import imagesRoutes from "./src/routes/images.routes.js";
import productsRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import messagesRoutes from "./src/routes/messages.routes.js";
import checkoutRoutes from "./src/routes/checkout.routes.js";

import { dbConection } from "./src/database/dbConection.js";

const server = express()

dotenv.config()

const api = async () => {
    await dbConection()
    
    const __filename = fileURLToPath(import.meta.url) 
    const __dirname = path.dirname(__filename)
    
    server.use(express.json())
    server.use(cors());
      
    server.use('/public', express.static(path.join(__dirname, '/temp/imgs'))) //En base al endpoint public sirva los archivos de forma static que estan en la carpeeta temp/imgs
    server.use("/images", imagesRoutes)
    server.use("/api/products", productsRoutes)
    server.use("/api/messages", messagesRoutes)
    server.use("/api/cart", cartRoutes)
    server.use("/api/checkout", checkoutRoutes)
    
    server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
}

api()