import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { ProductModel } from '../domain/models/products.model'

export type ProductId = {
  id: string
}

export type CreateProductProps = {
  id: string
  name: string
  price: number
  created_at: Date
  updated_at: Date
}

export interface ProductsRepository
  extends RepositoryInterface<ProductModel, CreateProductProps> {
  findByName(name: string): Promise<ProductModel>
  findAllByIds(productIds: ProductId[]): Promise<ProductModel[]>
  confictingName(name: string): Promise<void>
}
