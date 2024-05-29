import User from '../models/User'
import { hash } from 'bcrypt'

let users: User[] = []

async function findUserByEmail(email: string): Promise<User> {
  return users.find((user) => user.email === email) as User
}

async function addUser(user: User): Promise<void> {
  const hashedPassword = await hash(user.password, 10)
  user.password = hashedPassword
  users.push(user)
}

export { users, findUserByEmail, addUser }
