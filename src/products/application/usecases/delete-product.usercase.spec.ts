import 'reflect-metadata'
import { DeleteProductUseCase } from './delete-product.usercase'
import { ProductsInMemoryRepository } from '@/products/infrastruture/in-memory/repositories/products-in-memory.repository'
import { NotFoundError } from '@/common/domain/erros/not-found-error'
import { ProductsDataBuilder } from '@/products/infrastruture/testing/helpers/products-data-builder'
describe('DeleteProductUsecase Unit Tests', () => {
  let sut: DeleteProductUseCase.UseCase
  let repository: ProductsInMemoryRepository

  beforeEach(() => {
    repository = new ProductsInMemoryRepository()
    sut = new DeleteProductUseCase.UseCase(repository)
  })

  it('should throw error when product not found', async () => {
    await expect(sut.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  it('Should be able to delete a product', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const product = await repository.insert(ProductsDataBuilder({}))
    expect(repository.items.length).toBe(1)

    await sut.execute({ id: product.id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items.length).toBe(0)
  })
})
