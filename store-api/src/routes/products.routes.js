import express from "express"
import upload from "../libs/storage.js";

import { createProduct, deleteProduct, editProduct, getProducts } from "../controllers/productsController.js";

const route = express.Router()

route
    .post("/", upload.single("image"), createProduct) //Con single decimos que se suba una sola imagen
    .get("/", getProducts)
    .put("/edit/:id", upload.single("image"), editProduct)
    .delete("/delete/:id", deleteProduct)

export default route;

