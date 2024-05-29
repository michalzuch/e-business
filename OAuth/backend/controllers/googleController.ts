import { AuthorizationCode } from 'simple-oauth2'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { oauthLogin, oauthLoginCallback } from '../services/oauthControllerService'

const GOOGLE_CALLBACK = 'http://localhost:3000/api/google/callback'

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
  oauthLogin(_, res, googleClient, GOOGLE_CALLBACK)
}

async function googleLoginCallback(req: ExpressRequest, res: ExpressResponse) {
  oauthLoginCallback(req, res, 'Google', googleClient, GOOGLE_CALLBACK, 'https://www.googleapis.com/oauth2/v2/userinfo')
}

export { googleLogin, googleLoginCallback }
