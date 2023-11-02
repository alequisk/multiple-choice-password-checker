import { z } from 'zod'
import { Router } from 'express'
import { UserService } from '../services/user-service'

export function makeUserRoutes(userService: UserService) {
  const router = Router()

  const createUserSchema = z.object({
    login: z.string().min(4, "login must have at least 4 characters"),
    password: z.string().length(6, "password must have 6 digits")
  })
  router.post('/users', async (request, response, next) => {
    try {
      const user = createUserSchema.parse(request.body)
      await userService.save(user)
      return response.status(200).send();
    } catch (err) {
      next(err)
    }
  })

  const deleteUserSchema = z.object({ id: z.string().uuid() })
  router.delete('/users', async (request, response, next) => {
    try {
      const { id } = deleteUserSchema.parse(request.body)
      await userService.delete(id)
      return response.status(200).send();
    } catch (err) {
      next(err)
    }
  })

  router.get('/users', async (_, response) => {
    return response.status(200).json({ users: await userService.listAll() })
  })

  return router
}