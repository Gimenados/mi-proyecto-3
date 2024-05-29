import { MercadoPagoConfig, Preference } from 'mercadopago';

export const createCheckoutPreference = async (req, res) => {
    //Desestrucuturamos body
    const {body} = req;
    try {
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const preference = new Preference(client);
        console.log(body)
        const response = await preference.create({
            body: {
                ...body,
                back_urls: {
                    success: `${process.env.FRONT_URL}/checkout/success`
                } 
            }})
        //Si encuentra el producto que me devuelva unicamente el Id 
        res.json({
            ok: true,
            preferenceId: response.id
        })
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        res.status(500).send("Error con el servidor")
    }
}