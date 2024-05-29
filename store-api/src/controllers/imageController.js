import { Images } from "../models/Images.js";

export const getImage = async (req, res) => {

    const { idImage } = req.params;

    try {
        const image = await Images.findById(idImage)
        // Búqueda por nombre:
        // const image = await Images.findOne({ filename: paramName})
        
        const imgBuffer = Buffer.from(image.img.data)

        //Escribir los valores que vamos a dar en el encabezados de nuestra response
        res.writeHead(200, {
            "Content-Type": image.img.contentType,
            "Content-Length": imgBuffer.length
        })
        res.end(imgBuffer)
    } catch (error) {
        res.status(500).send("No se pudo acceder a la imagen.")
    }
}