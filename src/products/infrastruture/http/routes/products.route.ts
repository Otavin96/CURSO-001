import { Router } from 'express'
import { createProductController } from '../controllers/create-product.controller'
import { getProductController } from '../controllers/get-product.controller'
import { updateProductController } from '../controllers/update-product.controller'
import { deleteProductController } from '../controllers/delete-product.controller'
import { searchProductController } from '../controllers/search-product.controller'

const productsRouter = Router()

productsRouter.post('/', createProductController)

productsRouter.get('/:id', getProductController)

productsRouter.put('/:id', updateProductController)

productsRouter.delete('/:id', deleteProductController)

productsRouter.get('/', searchProductController)

export { productsRouter }
