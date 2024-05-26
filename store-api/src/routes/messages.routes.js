import express from 'express'
import { body } from 'express-validator';

import { validationErrorResponse } from '../middlewares/validateResponse.js';
import { createMessage } from '../controllers/messagesController.js';

const route = express.Router();

route.post("/", [
    //Middlewares desde el body
    //Preguntamos sobre el name, minimo 1
    body("name").isString().isLength({ min: 1 }).withMessage("El nombre es requerido."),
    body("email").isEmail().withMessage("El email es incorrecto."),
    body("subject").isString().isLength({ min: 1 }).withMessage("El asunto es requerido."),
    body("body").isString().isLength({ min: 1 }).withMessage("El cuerpo del mensaje es requerido."),
    validationErrorResponse 
], createMessage)

export default route;