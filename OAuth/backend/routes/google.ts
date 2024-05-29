import { Router } from 'express'
import { googleLogin, googleLoginCallback } from '../controllers/googleController'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

const router = Router()

router.get('/google', (req: ExpressRequest, res: ExpressResponse) => {
  googleLogin(req, res)
})

router.get('/google/callback', async (req: ExpressRequest, res: ExpressResponse) => {
  googleLoginCallback(req, res)
})

export { router }
