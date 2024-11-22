import { Product } from "../entities/products.entity"
import { testDataSource } from "../testing/data-source"
import { ProductTypeormRepository } from "./products-typeorm.repository"

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

  describe('method', () => {
    it('testing', () => {})
  })
})
