import { Router } from "express";
import { createProductController } from "./create-product.controller";


const productsRouter = Router()

productsRouter.post('/', createProductController)


export { productsRouter }
