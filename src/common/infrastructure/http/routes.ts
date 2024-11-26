import { productsRouter } from '@/products/infrastruture/http/routes/products.route'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Olá Dev!' })
})

routes.use('/products', productsRouter)

export { routes }
