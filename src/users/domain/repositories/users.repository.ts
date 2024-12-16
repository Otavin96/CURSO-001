import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { UserModel } from '../models/users.model'

export type CreateUsersProps = {
  name: string
  email: string
  password: string
}

export interface UsersRepository
  extends RepositoryInterface<UserModel, CreateUsersProps> {
  findByEmail(email: string): Promise<UserModel>
  findByName(name: string): Promise<UserModel>
  conflictingEmail(email: string): Promise<void>
}
