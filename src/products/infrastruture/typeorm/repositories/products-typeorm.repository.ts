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
import { NotFoundError } from '@/common/domain/erros/not-found-error'
import { ConflictError } from '@/common/domain/erros/conflict-error'

export class ProductTypeormRepository implements ProductsRepository {
  sortableFields: string[] = ['name', 'created_at']
  productsRepository: Repository<Product>

  construtor() {
    this.productsRepository = dataSource.getRepository(Product)
  }

  async findByName(name: string): Promise<ProductModel> {
    const product = await this.productsRepository.findOneBy({ name })

    if (!product) {
      throw new NotFoundError(`Product not found using name ${name}`)
    }

    return product
  }

  findAllByIds(productIds: ProductId[]): Promise<ProductModel[]> {
    throw new Error('Method not implemented.')
  }

  async confictingName(name: string): Promise<void> {
    const product = await this.productsRepository.findOneBy({ name })

    if (product) {
      throw new ConflictError('Name already used by another product')
    }

    return product
  }

  create(props: CreateProductProps): ProductModel {
    return this.productsRepository.create(props)
  }

  async insert(model: ProductModel): Promise<ProductModel> {
    return this.productsRepository.save(model)
  }

  async findById(id: string): Promise<ProductModel> {
    return this._get(id)
  }

  async update(model: ProductModel): Promise<ProductModel> {
    await this._get(model.id)
    await this.productsRepository.update({ id: model.id }, model)
    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.productsRepository.delete({ id })
  }

  search(props: SearchInput): Promise<SearchOutput<ProductModel>> {
    throw new Error('Method not implemented.')
  }

  protected async _get(id: string): Promise<ProductModel> {
    const product = await this.productsRepository.findOneBy({ id })

    if (!product) {
      throw new NotFoundError(`Product not found using ID ${id}`)
    }

    return product
  }
}
