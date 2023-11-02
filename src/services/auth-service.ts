import { UserRepository } from "../repositories/user-repository";
import { cartesian_operation } from "../utils/cartesian";
import { HashService } from "./hash-service";

type KeypadOption = number[]

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: HashService,
  ) { }

  public async auth(login: string, keyspresseds: KeypadOption[]): Promise<boolean> {
    const user = await this.userRepository.findByLogin(login)
    if (!user) {
      throw new Error(`User with login '${login}' not found!`)
    }
    const possibilities = cartesian_operation(keyspresseds)

    for (let i = 0; i < possibilities.length; i++) {
      const password = [...possibilities[i]].join('')
      if (await this.hasher.compare(user.password, password)) {
        return true
      }
    }
    return false
  }
}