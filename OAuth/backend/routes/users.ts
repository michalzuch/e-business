import { Router, Response as ExpressResponse } from 'express'
import LoginRequest from '../models/LoginRequest'
import { login } from '../controllers/userController'

const router = Router()

router.post('/login', (req: LoginRequest, res: ExpressResponse) => {
  login(req, res)
})

export default router
