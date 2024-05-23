import mongoose from "mongoose";

export const dbConection = async () => {
    try {
        const mongoDB = await mongoose.connect(
            process.env.DB_URL_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true, 
                // dbName: "toys-store"
            }
        );
        console.log("Conexión exitosa a la base de datos:", mongoDB.connections[0].name);
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        throw new Error(error);
    }
};
