import { z } from 'zod'
import { Router } from 'express'
import { AuthService } from '../services/auth-service'

export function makeAuthRoutes(authService: AuthService) {
  const router = Router()
  const authSchema = z.object({
    login: z.string(),
    keypads: z.array(z.array(z.number()).length(2)).length(6)
  })
  router.post('/auth', async (request, response, next) => {
    try {
      const data = authSchema.parse(request.body)
      const isLogged = await authService.auth(data.login, data.keypads)
      return response.status(isLogged ? 200 : 401).send()
    } catch (err) {
      next(err)
    }
  })

  return router
}
