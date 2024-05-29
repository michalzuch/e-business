import axios from 'axios'
import { AuthorizationCode, AuthorizationTokenConfig } from 'simple-oauth2'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

const GOOGLE_CALLBACK = 'http://localhost:3000/api/google/callback'

dotenv.config()
const secretKey: string = process.env.SECRET_KEY || ''

const googleOAuth = {
  client: {
    id: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  auth: {
    tokenHost: 'https://accounts.google.com',
    tokenPath: '/o/oauth2/token',
    authorizePath: '/o/oauth2/auth',
  },
}

const googleClient = new AuthorizationCode(googleOAuth)

function googleLogin(_: ExpressRequest, res: ExpressResponse) {
  const authorizationUri = googleClient.authorizeURL({
    redirect_uri: GOOGLE_CALLBACK,
    scope: 'profile',
  })

  res.redirect(authorizationUri)
}

async function googleLoginCallback(req: ExpressRequest, res: ExpressResponse) {
  const authTokenConfig: AuthorizationTokenConfig = {
    code: req.query.code as string,
    redirect_uri: GOOGLE_CALLBACK,
  }

  try {
    const accessToken = await googleClient.getToken(authTokenConfig)
    const user = await axios
      .get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: 'Bearer ' + accessToken.token.access_token,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user data: ${error}`)
      })

    const token = jwt.sign(user.id, secretKey)
    return res.cookie('token', token).redirect('http://localhost:5173')
  } catch (error) {
    return res.json('Google OAuth failed').status(500)
  }
}

export { googleLogin, googleLoginCallback }
