import { randomUUID } from 'node:crypto'
import { Product } from '../entities/products.entity'
import { testDataSource } from '../testing/data-source'
import { ProductTypeormRepository } from './products-typeorm.repository'
import { NotFoundError } from '@/common/domain/erros/not-found-error'
import { ProductsDataBuilder } from '../../testing/helpers/products-data-builder'

describe('ProductsTypeormRepository integration tests', () => {
  let ormRepository: ProductTypeormRepository

  beforeAll(async () => {
    await testDataSource.initialize()
  })

  afterAll(async () => {
    await testDataSource.destroy()
  })

  beforeEach(async () => {
    await testDataSource.manager.query('DELETE FROM products')
    ormRepository = new ProductTypeormRepository()
    ormRepository.productsRepository = testDataSource.getRepository(Product)
  })

  describe('findById', () => {
    it('should generate an error when  the product is not found', async () => {
      const id = randomUUID()

      await expect(ormRepository.findById(id)).rejects.toThrow(
        new NotFoundError(`Product not found using ID ${id}`),
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

  describe('create', () => {
    it('should create a new product object', () => {
      const data = ProductsDataBuilder({ name: 'Product 1' })
      const result = ormRepository.create(data)
      expect(result.name).toEqual(data.name)
    })
  })

  describe('insert', () => {
    it('should insert a new product', async () => {
      const data = ProductsDataBuilder({ name: 'Product 1' })
      const result = await ormRepository.insert(data)
      expect(result.name).toEqual(data.name)
    })
  })

  describe('update', () => {
    it('should generate an error when  the product is not found', async () => {
      const data = ProductsDataBuilder({})

      await expect(ormRepository.update(data)).rejects.toThrow(
        new NotFoundError(`Product not found using ID ${data.id}`),
      )
    })

    it('should update a product', async () => {
      const data = ProductsDataBuilder({})
      const product = testDataSource.manager.create(Product, data)
      await testDataSource.manager.save(product)
      product.name = 'nome atualizado'

      const result = await ormRepository.update(product)
      expect(result.name).toEqual('nome atualizado')
    })
  })

  describe('delete', () => {
    it('should generate an error when  the product is not found', async () => {
      const id = randomUUID()
      await expect(ormRepository.delete(id)).rejects.toThrow(
        new NotFoundError(`Product not found using ID ${id}`),
      )
    })

    it('should delete a product', async () => {
      const data = ProductsDataBuilder({})
      const product = testDataSource.manager.create(Product, data)
      await testDataSource.manager.save(product)

      await ormRepository.delete(data.id)

      const result = await testDataSource.manager.findOneBy(Product, {
        id: data.id,
      })
      expect(result).toBeNull()
    })
  })

  describe('findByName', () => {
    it('should generate an error when  the product is not found', async () => {
      const name = 'Product 1'

      await expect(ormRepository.findByName(name)).rejects.toThrow(
        new NotFoundError(`Product not found using name ${name}`),
      )
    })

    it('should finds a product by name', async () => {
      const data = ProductsDataBuilder({ name: 'Product 1' })
      const product = testDataSource.manager.create(Product, data)
      await testDataSource.manager.save(product)

      const result = await ormRepository.findByName(data.name)
      expect(result.name).toEqual('Product 1')
    })
  })
})
