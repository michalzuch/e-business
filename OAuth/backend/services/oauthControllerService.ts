import axios from 'axios'
import { AuthorizationCode, AuthorizationTokenConfig } from 'simple-oauth2'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { addUser, users } from './userService'

dotenv.config()
const secretKey: string = process.env.SECRET_KEY || ''

function oauthLogin(_: ExpressRequest, res: ExpressResponse, client: AuthorizationCode, callback: string) {
  const authorizationUri = client.authorizeURL({
    redirect_uri: callback,
    scope: 'profile',
  })

  res.redirect(authorizationUri)
}

async function oauthLoginCallback(
  req: ExpressRequest,
  res: ExpressResponse,
  oauthProvider: string,
  client: AuthorizationCode,
  callback: string,
  url: string
) {
  const authTokenConfig: AuthorizationTokenConfig = {
    code: req.query.code as string,
    redirect_uri: callback,
  }

  try {
    const accessToken = await client.getToken(authTokenConfig)
    const user = await axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken.token.access_token,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user data: ${error}`)
      })

    const token = jwt.sign(user.id, secretKey)
    const newUser = {
      id: users.length + 1,
      username: '',
      email: user.email,
      password: '',
      token: token,
      accessToken: accessToken.token.access_token,
      isOAuth: true,
    }
    await addUser(newUser)

    return res.cookie('token', token).redirect('http://localhost:5173')
  } catch (error) {
    return res.json(`${oauthProvider} OAuth failed`).status(500)
  }
}

export { oauthLogin, oauthLoginCallback }
