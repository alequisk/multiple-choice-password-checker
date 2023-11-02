import { randomUUID } from "crypto";
import { UserRepository } from "../repositories/user-repository";
import { HashService } from "./hash-service";

type UserDTO = {
  login: string,
  password: string
}

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: HashService,
  ) { }

  public async save(user: UserDTO) {
    const alreadyExists = await this.userRepository.findByLogin(user.login)
    if (alreadyExists) {
      throw new Error(`Login '${user.login}' already exists!`)
    }
    const userDB = {
      id: randomUUID(),
      login: user.login,
      password: await this.hasher.hash(user.password)
    }
    await this.userRepository.save(userDB)
  }

  public async delete(id: string) {
    const isUserPresent = await this.userRepository.findById(id)
    if (!isUserPresent) {
      throw new Error(`User with ID '${id}' doesn't exists!`)
    }
    await this.userRepository.delete(id)
  }

  public async listAll() {
    return this.userRepository.findAll();
  }
}