import { AuthorizationCode } from 'simple-oauth2'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { oauthLogin, oauthLoginCallback } from '../services/oauthControllerService'

const GITHUB_CALLBACK = 'http://localhost:3000/api/github/callback'

const githubOAuth = {
  client: {
    id: process.env.GITHUB_CLIENT_ID || '',
    secret: process.env.GITHUB_CLIENT_SECRET || '',
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
}

const githubClient = new AuthorizationCode(githubOAuth)

function githubLogin(_: ExpressRequest, res: ExpressResponse) {
  oauthLogin(_, res, githubClient, GITHUB_CALLBACK)
}

async function githubLoginCallback(req: ExpressRequest, res: ExpressResponse) {
  oauthLoginCallback(req, res, 'GitHub', githubClient, GITHUB_CALLBACK, 'https://api.github.com/user')
}

export { githubLogin, githubLoginCallback }
