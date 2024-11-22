import { randomUUID } from "node:crypto"
import { Product } from "../entities/products.entity"
import { testDataSource } from "../testing/data-source"
import { ProductTypeormRepository } from "./products-typeorm.repository"
import { NotFoundError } from "@/common/domain/erros/not-found-error"
import { ProductsDataBuilder } from "../../testing/helpers/products-data-builder"

describe('ProductsTypeormRepository integration tests', () => {
  let ormRepository: ProductTypeormRepository

  beforeAll(async () => {
    await testDataSource.initialize()
  })

  afterAll( async () => {
    await testDataSource.destroy()
  })

  beforeEach( async () => {
    await testDataSource.manager.query('DELETE FROM products')
    ormRepository = new ProductTypeormRepository()
    ormRepository.productsRepository = testDataSource.getRepository(Product) 
  })

  describe('findById', () => {
    it('should generate an error when  the product is not found', async () => {
      const id = randomUUID()

      await expect(ormRepository.findById(id)).rejects.toThrow(
        new NotFoundError(`Product not found using ID ${id}`)
      )
    })

    it('should finds a product by id', async () => {
      const data = ProductsDataBuilder({})
      const product = testDataSource.manager.create(Product, data)
      await testDataSource.manager.save(product)
      
      const result = await ormRepository.findById(product.id)
      expect(result.id).toEqual(product.id)
      expect(result.name).toEqual(product.name)
    })
  })
})
