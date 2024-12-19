import { container } from "tsyringe";
import { UserTypeormRepository } from "../typeorm/repositories/users-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { User } from "../typeorm/entities/users.entity";

container.registerSingleton('UsersRepository', UserTypeormRepository)
container.registerInstance(
  'UsersDefaultTypeormRepository',
  dataSource.getRepository(User)
)
