import * as jwt from 'jsonwebtoken'
import { findUserByEmail } from '../services/userService'
import { Response as ExpressResponse } from 'express'
import LoginRequest from '../models/LoginRequest'

const secretKey: string = 'superSecretKey'

function login(req: LoginRequest, res: ExpressResponse<any>) {
  const { email, password } = req.body
  const user = findUserByEmail(email)

  if (user && user.password === password) {
    const token = jwt.sign({ userId: user.id }, secretKey)
    res.status(200).json({ token })
  } else {
    res.status(403).json({ message: 'Invalid username or password' })
  }
}

export { login }
