import * as jwt from 'jsonwebtoken'
import { users, addUser, findUserByEmail } from '../services/userService'
import { Response as ExpressResponse } from 'express'
import LoginRequest from '../models/LoginRequest'
import RegisterRequest from '../models/RegisterRequest'

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

function register(req: RegisterRequest, res: ExpressResponse<any>) {
  const { name, email, password } = req.body
  const user = findUserByEmail(email)

  if (user) {
    res.status(409).json({ message: 'Email is already used' })
  } else {
    const newUser = { id: users.length + 1, name, email, password }
    addUser(newUser)
    res.status(200).json({})
  }
}

export { login, register }
