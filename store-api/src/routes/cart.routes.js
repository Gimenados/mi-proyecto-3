import express from 'express'
import { createCart, editCart, getById } from '../controllers/cartController.js';

const route = express.Router();

route
    .post("/", createCart)
    //Sobre un determinado id
    .get("/get/:id", getById)
    .put("/edit/:id", editCart)

export default route;