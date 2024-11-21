import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/repository.interface'
import { ProductModel } from '@/products/domain/models/products.model'
import {
  CreateProductProps,
  ProductId,
  ProductsRepository,
} from '@/products/repositories/products.repository'
import { Repository } from 'typeorm'
import { Product } from '../entities/products.entity'
import { dataSource } from '@/common/infrastructure/typeorm'

export class ProductTypeormRepository implements ProductsRepository {
  sortableFields: string[] = ['name', 'created_at']
  productsRepository: Repository<Product>

  construtor() {
    this.productsRepository = dataSource.getRepository(Product)
  }

  findByName(name: string): Promise<ProductModel> {
    throw new Error('Method not implemented.')
  }

  findAllByIds(productIds: ProductId[]): Promise<ProductModel[]> {
    throw new Error('Method not implemented.')
  }

  confictingName(name: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  create(porps: CreateProductProps): ProductModel {
    throw new Error('Method not implemented.')
  }

  insert(model: ProductModel): Promise<ProductModel> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<ProductModel> {
    throw new Error('Method not implemented.')
  }

  update(model: ProductModel): Promise<ProductModel> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  search(props: SearchInput): Promise<SearchOutput<ProductModel>> {
    throw new Error('Method not implemented.')
  }
}
