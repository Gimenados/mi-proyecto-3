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
        
        console.log(body)
        console.log(file.filename)

        const product = await Products.create({
            ...body,
            imgUrl: `${process.env.BASE_URL}/public/${file.filename}` //Armamos la base url del archivo
        });

        //Validar que por si alguna razon no valido nada
        if (!product) {
            return res.status(400)
            .json({
                ok: false,
                msg: "No se pudo crear el producto"
            })
        } 

        res.json({
            product, //Se crea el producto
            msg: "Se ha creado el producto correctamente"
        })
    } catch (error) {
        console.log("Ha habido un error al crear el producto")
        console.log(error); 

        res.status(500).json({
            ok: false,
            msg: "Ha habido un error con el servidor"
        })  //Error interno
    }
} 

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find() 
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