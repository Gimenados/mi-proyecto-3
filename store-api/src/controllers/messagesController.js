import { Messages } from "../models/Messages.js"

export const createMessage = async (req, res) => {
    try {
        const message = await Messages.create(req.body);

        if (!message) {
            return res.status(400).json({
                ok: false,
                msg: "El mensaje no ha podido ser enviado."
            })
        }

        res.json({
            ok: true,
            msg: "El mensaje ha sido enviado correctamente."
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