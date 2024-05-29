import { Router } from 'express'
import { githubLogin, githubLoginCallback } from '../controllers/githubController'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

const router = Router()

router.get('/github', (req: ExpressRequest, res: ExpressResponse) => {
  githubLogin(req, res)
})

router.get('/github/callback', async (req: ExpressRequest, res: ExpressResponse) => {
  githubLoginCallback(req, res)
})

export { router }
