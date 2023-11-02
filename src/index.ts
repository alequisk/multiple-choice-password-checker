import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

import { UserRepositoryInMemory } from './repositories/implementation/user-repository-in-memory'
import { makeAuthRoutes } from './routes/auth.routes'
import { makeUserRoutes } from './routes/user.routes'
import { AuthService } from './services/auth-service'
import { HashServiceBcrypt } from './services/implementation/hash-service-bcrypt'
import { UserService } from './services/user-service'
import { array_shuffle } from './utils/array-shuffle'

const userRepository = new UserRepositoryInMemory();

const hashService = new HashServiceBcrypt()
const userService = new UserService(userRepository, hashService)
const authService = new AuthService(userRepository, hashService)

const server = express()
server.use(express.json())

server.use(makeUserRoutes(userService))
server.use(makeAuthRoutes(authService))

server.get('/genkeypad', (_, response) => {
  const permutation = array_shuffle(Array.from({ length: 10 }, (_, i) => i + 1))
  const keypads = []
  for (let i = 0; i < 10; i += 2) {
    keypads.push([permutation[i], permutation[i + 1]])
  }
  return response.status(200).json({ keypads })
})

// Default error handler
server.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  return res.status(500).send({
    error: err
  })
})

server.listen(3000, '127.0.0.1', () => {
  console.log(`Server is listen at http://127.0.0.1:3000`)
})