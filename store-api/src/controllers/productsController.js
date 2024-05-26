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

        //                                                            Que no sea null ni undefined
        const products = await Products.find({...searchBy, deletedAt: {$in: [null, undefined]}}) //"i" nos ahorramos errores colaterales con las minusculas y mayusculas 
        //Respuesta data del products
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

//PARA EDITAR UN PRODUCTO
export const editProduct = async (req, res) => {
    const {id} = req.params
    const {body, file} = req
    try {
        //Buscar el producto en la base de datos
        const product = await Products.findById(id)

        //Verificar si el producto existe o si ha sido eliminado
        if (!product || product.deletedAt) {
            return res.status(404)
                .json({
                    ok: false,
                    msg: "Producto no encontrado o id inválido"
                })
        }

        //Si se ha subido un archivo
        let imageUrl = product.imgUrl

        if (file) {
            //Se lee el archivo de imagen desde un directorio temporal
            const imageBuffer = fs.readFileSync(`./temp/imgs/${file.filename}`)
        
            //Se guarda la imagen en la base de datos creando un nuevo documento en el coleccion Images
            const image = await Images.create({
                fileName: file.filename,
                img: {
                    data: imageBuffer,
                    contentType: "image/png"
                }
            })
            
            //Si no se puede guardar la imagen
            if (!image) {
                return res.status(400)
                    .json({
                        ok: false,
                        msg: "No se pudo guardar correctamente la imagen."
                    })
            }

            //Se elimina el archivo temporal
            fs.rm(`./temp/imgs/${file.filename}`, error => {
                    if (error) {
                        console.log("Lo sentimos, no hemos podido eliminar el archivo")
                    }
                    console.log("El archivo se ha eliminado correctamente")
                })

            //Se actualiza la url de la imagen
            imageUrl =`${process.env.BASE_URL}/images/${image._id}`
        }

        //Actualiza el producto en la base de datos
        const productUpdated = await Products.findByIdAndUpdate(id, {
            ...body,
            imgUrl: imageUrl 
        }, { new: true });

        //Respuesta
        res.json({
            ok: true,
            product: productUpdated,
            msg: "El producto se actualizò correctamente."
        })
    //Manejo de errores
    } catch (error) {
        console.log("Ha habido un error al editar el producto.")
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error con el servidor"
            })
    }
}

//BORRAR UN PRODUCTO
export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Products.findById(id);

        if (!product || product.deletedAt) {
            return res.status(404).json({
                ok: false,
                msg: "El producto no fue encontrado."
            })
        }

        await Products.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });

        res.json({
            ok: true,
            msg: "Producto elemininado correctamente"
        })

    } catch (error) {
        console.log("Ha habido un error al editar el producto.")
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error con el servidor"
            })
    }
}