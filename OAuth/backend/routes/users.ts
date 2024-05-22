import { Router, Response as ExpressResponse } from 'express'
import LoginRequest from '../models/LoginRequest'
import { login, register } from '../controllers/userController'
import RegisterRequest from '../models/RegisterRequest'

const router = Router()

router.post('/login', (req: LoginRequest, res: ExpressResponse) => {
  login(req, res)
})

router.post('/register', (req: RegisterRequest, res: ExpressResponse) => {
  register(req, res)
})

export default router
