import fs from "fs";

import { Images } from "../models/Images.js"
import { Products } from "../models/Products.js"


//Para crear un producto
export const createProduct = async (req, res) => {
    const {body, file} = req
    try {

        if (!file) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: "La foto es obligatoria."
                })
        }

        const imageBuffer = fs.readFileSync(`./temp/imgs/${file.filename}`)
        
        const image = await Images.create({
            fileName: file.filename,
            img: {
                data: imageBuffer,
                contentType: "image/png"
            }
        })
        
        if (!image) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: "No se pudo guardar correctamente la imagen."
                })
        }

        const product = await Products.create({
            ...body,
            // para el caso que la imagenes queden alojadas permanentemente en nuestro servidor
            // imgUrl: `${process.env.BASE_URL}/public/${file.filename}`
            imgUrl: `${process.env.BASE_URL}/images/${image._id}`
        });

        fs.rm(`./temp/imgs/${file.filename}`, error => {
                if (error) {
                    console.log("Lo sentimos, no hemos podido eliminar el archivo")
                }
                console.log("El archivo se ha eliminado correctamente")
            })

        if (!product) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: "No se pudo crear el producto."
                })
        }


        res.json({
            product, //Se crea el producto
            msg: "Se ha creado el producto correctamente"
        })
    } catch (error) {
        console.log("Ha habido un error al crear el producto", error)
        console.log(error); 

        res.status(500).json({
            ok: false,
            msg: "Ha habido un error con el servidor"
        })  //Error interno
    }
} 

export const getProducts = async (req, res) => {

    const { search } = req.query;

    try {

        const searchBy = search ? { name: new RegExp(search, "i") } : {}

        const products = await Products.find({...searchBy, deletedAt: {$in: [null, undefined]}}) //"i" nos ahorramos errores colaterales con las minusculas y mayusculas 
        //Nuestra data del products
        res.json({
            products
        })
    } catch (error) {
        console.log("Ha habido un error al obtener los productos."); 
        res.status(500)
          .json({
            ok: false,
            msg: "Ha habido un error con el servidor"
        })  //Error interno
    }
}