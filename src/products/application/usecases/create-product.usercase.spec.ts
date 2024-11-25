import { CreateProductUseCase } from './create-product.usercase'
import { ProductsRepository } from '../../repositories/products.repository'
import { ProductsInMemoryRepository } from '@/products/infrastruture/in-memory/repositories/products-in-memory.repository'

describe('CreateProductUsecase Unit Tests', () => {
  let sut: CreateProductUseCase.UseCase
  let repository: ProductsRepository

  beforeEach(() => {
    repository = new ProductsInMemoryRepository()
    sut = new CreateProductUseCase.UseCase(repository)
  })

  it('Should create a product', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = {
      name: 'Product 1',
      price: 10,
      quantity: 5,
    }
    const result = await sut.execute(props)
    expect(result.id).toBeDefined
    expect(result.created_at).toBeDefined
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })
})
