//Modelo para guardar nuestras imagenes en la base de datos

import { Schema, model } from "mongoose";

const ImageSchema = new Schema({
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
})

export const Images = model("Images", ImageSchema)