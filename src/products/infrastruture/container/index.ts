import { CreateProductUseCase } from '@/products/application/usecases/create-product.usercase'
import { ProductTypeormRepository } from '@/products/infrastruture/typeorm/repositories/products-typeorm.repository'
import { container } from 'tsyringe'
import { Product } from '@/products/infrastruture/typeorm/entities/products.entity'
import { dataSource } from '@/common/infrastructure/typeorm'
import { GetProductUseCase } from '@/products/application/usecases/get-product.usercase'
import { UpdateProductUseCase } from '@/products/application/usecases/update-product.usercase'
import { DeleteProductUseCase } from '@/products/application/usecases/delete-product.usercase'

container.registerSingleton('ProductRepository', ProductTypeormRepository)
container.registerSingleton(
  'CreateProductUseCase',
  CreateProductUseCase.UseCase,
)
container.registerSingleton(
  'UpdateProductUseCase',
  UpdateProductUseCase.UseCase,
)
container.registerInstance(
  'ProductsDefaultTypeormRepository',
  dataSource.getRepository(Product),
)

container.registerSingleton('GetProductUseCase', GetProductUseCase.UseCase)

container.registerSingleton(
  'DeleteProductUseCase',
  DeleteProductUseCase.UseCase,
)
