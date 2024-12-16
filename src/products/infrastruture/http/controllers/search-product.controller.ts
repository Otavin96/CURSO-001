import { dataValidation } from '@/common/infrastructure/validation/zod'
import { Request, Response } from 'express'
import { z } from 'zod'
import { SearchProductUseCase } from '@/products/application/usecases/search-product.usecase'
import { container } from 'tsyringe'

export async function searchProductController(
  request: Request,
  response: Response,
): Promise<Response> {
  const querySchema = z.object({
    page: z.coerce.number().optional(),
    per_page: z.coerce.number().optional(),
    sort: z.coerce.string().optional(),
    sort_dir: z.coerce.string().optional(),
    filter: z.coerce.string().optional(),
  })

  const { page, per_page, sort, sort_dir, filter } = dataValidation(
    querySchema,
    request.query,
  )

  const searchProductUseCase: SearchProductUseCase.UseCase = container.resolve(
    'SearchProductUseCase',
  )

  const products = await searchProductUseCase.execute({
    page: page ?? 1,
    per_page: per_page ?? 15,
    sort: sort ?? null,
    sort_dir: sort_dir ?? null,
    filter: filter ?? null,
  })

  return response.status(200).json(products)
}
