import { UserRepository } from "../user-repository";

type User = {
  id: string,
  login: string,
  password: string,
};

export class UserRepositoryInMemory implements UserRepository {
  private users: User[] = []

  public async findAll(): Promise<User[]> {
    return [...this.users]
  }
  public async findById(id: string): Promise<User | null> {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users.at(i)!.id == id) {
        return { ...this.users[i] }
      }
    }
    return null
  }
  public async findByLogin(login: string): Promise<User | null> {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users.at(i)!.login == login) {
        return { ...this.users[i] }
      }
    }
    return null
  }
  public async save(user: User): Promise<void> {
    this.users.push(user)
  }
  public async delete(id: string): Promise<void> {
    this.users = this.users.filter((element) => {
      return element.id !== id
    })
  }

}