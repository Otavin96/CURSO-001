import 'reflect-metadata'
import { GetProductUseCase } from './get-product.usercase'
import { ProductsRepository } from '../../repositories/products.repository'
import { ProductsInMemoryRepository } from '@/products/infrastruture/in-memory/repositories/products-in-memory.repository'
import { NotFoundError } from '@/common/domain/erros/not-found-error'
describe('GetProductUsecase Unit Tests', () => {
  let sut: GetProductUseCase.UseCase
  let repository: ProductsRepository

  beforeEach(() => {
    repository = new ProductsInMemoryRepository()
    sut = new GetProductUseCase.UseCase(repository)
  })

  it('Should be able to get a product', async () => {
    const spyFindById = jest.spyOn(repository, 'findById')
    const props = {
      name: 'Product 1',
      price: 10,
      quantity: 5,
    }
    const model = repository.create(props)
    await repository.insert(model)

    const result = await sut.execute({ id: model.id })
    expect(result).toMatchObject(model)
    expect(spyFindById).toHaveBeenCalledTimes(1)
  })

  it('should throw error when product not found', async () => {
    await expect(sut.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })
})
