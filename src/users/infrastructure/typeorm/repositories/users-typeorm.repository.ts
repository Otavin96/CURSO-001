import { SearchInput, SearchOutput } from "@/common/domain/repositories/repository.interface";
import { UserModel } from "@/users/domain/models/users.model";
import { CreateUsersProps, UsersRepository } from "@/users/domain/repositories/users.repository";
import { ILike, Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { ConflictError } from "@/common/domain/erros/conflict-error";

export class UserTypeormRepository implements UsersRepository {
  sortableFields: string[] = ['name', 'created_at']

  constructor(private usersRepository: Repository<User>){}


  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.usersRepository.findOneBy({ email })

    if(!user) {
      throw new NotFoundError(`User not found using emai ${email}`)
    }

    return user
  }
  async findByName(name: string): Promise<UserModel> {
    const user = await this.usersRepository.findOneBy({ name })

    if(!user) {
      throw new NotFoundError(`User not found using name ${name}`)
    }

    return user
  }
  async conflictingEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email })

    if(user) {
      throw new ConflictError('Email already used by another user')
    }
  }
  create(props: CreateUsersProps): UserModel {
    return this.usersRepository.create(props)
  }
  async insert(model: UserModel): Promise<UserModel> {
    return this.usersRepository.save(model)
  }
   async findById(id: string): Promise<UserModel> {
    return this._get(id)
  }
  async update(model: UserModel): Promise<UserModel> {
    await this._get(model.id)
    await this.usersRepository.update({id: model.id}, model)
    return model

  }
  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.usersRepository.delete(id) 
  }
  async search(props: SearchInput): Promise<SearchOutput<UserModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false
    const dirOps = ['asc', 'desc']
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) || false
    const orderByField = validSort ? props.sort : 'created_at'
    const orderByDir = validSortDir ? props.sort_dir : 'desc'
    const [users, total] = await this.usersRepository.findAndCount({
      ...(props.filter && {
        where: {
          name: ILike(props.filter),
        },
      }),
      order: {
        [orderByField]: orderByDir,
      },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    })
    return {
      items: users,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    }
  }

  protected async _get(id: string):Promise<UserModel> {
    const user = await this.usersRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundError(`User not found using ID ${id}`)
    }

    return user
  }

}