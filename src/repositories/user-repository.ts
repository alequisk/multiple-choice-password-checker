type User = {
  id: string,
  login: string,
  password: string
}

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByLogin(login: string): Promise<User | null>
  findAll(): Promise<User[]>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}