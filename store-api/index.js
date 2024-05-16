// import express from 'express';
// import cors from "cors";
// import dotenv from "dotenv";

// import productsRoutes from "./src/routes/products.routes.js"; 
// import { dbConection } from "./src/database/dbConection.js";

// const server = express()

// dotenv.config()

// const api = async () => {
    
//     await dbConection()
//     server.use(cors());
    
//     server.use(express.json())
//     server.use('/public', express.static(`/temp/imgs`))
//     // server.use("/images", imagesRoutes)
//     server.use("/api/products", productsRoutes)
//     // server.use("/api/messages", messagesRoutes)
//     // server.use("/api/cart", cartRoutes)
    
//     server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
// }

// api()

import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

import productsRoutes from "./src/routes/products.routes.js"; 
import { dbConection } from "./src/database/dbConection.js";

const server = express()

dotenv.config()

const api = async () => {
    
    await dbConection()

    // Configuración de CORS para permitir solo los orígenes necesarios
    const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
    const corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    };

    // Usar CORS con opciones específicas
    server.use(cors(corsOptions));

    server.use(express.json())
    server.use('/public', express.static(`/temp/imgs`))
    server.use("/api/products", productsRoutes)
    
    server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
}

api()
