import User from '../models/User'

let users: User[] = [{ id: 1, name: 'test', email: 'test@test.com', password: 'test' }]

function findUserByEmail(email: string) {
  return users.find((user) => user.email === email)
}

function addUser(user: User) {
  users.push(user)
}

export { users, findUserByEmail, addUser }
