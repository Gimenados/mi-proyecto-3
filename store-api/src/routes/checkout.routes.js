import express from 'express'
import { createCheckoutPreference } from '../controllers/CheckoutController.js';

const route = express.Router();

route
    .post("/", createCheckoutPreference)

export default route;