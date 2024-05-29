import * as jwt from 'jsonwebtoken'
import { users, addUser, findUserByEmail } from '../services/userService'
import { Response as ExpressResponse } from 'express'
import LoginRequest from '../models/LoginRequest'
import RegisterRequest from '../models/RegisterRequest'
import * as dotenv from 'dotenv'
import { compare } from 'bcrypt'

dotenv.config()

const secretKey: string = process.env.SECRET_KEY || ''

async function login(req: LoginRequest, res: ExpressResponse<any>) {
  const { email, password } = req.body
  const user = await findUserByEmail(email)

  if (user && (await compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, secretKey)
    res.status(200).json({ token })
  } else {
    res.status(403).json({ message: 'Invalid username or password' })
  }
}

async function register(req: RegisterRequest, res: ExpressResponse<any>) {
  const { username, email, password } = req.body
  const user = await findUserByEmail(email)

  if (user) {
    res.status(409).json({ message: 'Email is already used' })
  } else {
    const newUser = {
      id: users.length + 1,
      username: username,
      email: email,
      password: password,
      token: '',
      accessToken: '',
      isOAuth: false,
    }
    addUser(newUser)
    res.status(200).json({})
  }
}

export { login, register }
