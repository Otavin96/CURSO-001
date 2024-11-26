import { Router } from "express";
import { createProductController } from "../controllers/create-product.controller";
import { getProductController } from "../controllers/get-product.controller";


const productsRouter = Router()

productsRouter.post('/', createProductController)
productsRouter.get('/:id', getProductController)


export { productsRouter }
