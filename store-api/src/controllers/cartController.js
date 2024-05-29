import { Cart } from "../models/Cart.js";

export const createCart = async (req, res) => {
  try {
    
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ ok: false, msg: 'Datos inválidos: los items son requeridos y deben ser un array.' });
    }

    for (const item of items) {
      if (!item.product || !item.quantity) {
        return res.status(400).json({ ok: false, msg: 'Datos inválidos: cada item debe tener un product y quantity.' });
      }
    }

    const newCart = await Cart.create(req.body);

    const cart = await Cart.findById(newCart._id)
      .populate({
        path: "items.product"
      });

    res.json({
      ok: true,
      cart
    });
  } catch (error) {
    console.error("Ha habido un error al crear el carrito.", error);
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor"
    });
  }
};


export const editCart = async (req, res) => {
    const {id} = req.params;

    try {
        const cartFinded = await Cart.findById(id);
        if (!cartFinded) {
            return res.status(400).json({
                ok: false,
                msg: "No existe el carrito a editar"
            })
        }

        const newCart = await Cart.findByIdAndUpdate(id, req.body, {new: true})
                                .populate({
                                    path: "items.product"
                                })

        res.json({
            ok: true,
            cart: newCart,
            msg: "Carrito actualizado con éxito."
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

export const getById = async (req, res) => {
    const {id} = req.params;
    try {
        const cart = await Cart.findById(id)
                        .populate({
                            path: "items.product"

                        })

        res.json({
            ok: true,
            cart
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