import { Router } from 'express'
import { router as usersRouter } from './users'
import { router as googleRouter } from './google'
import { router as githubRouter } from './github'

const router = Router()
router.use('/', usersRouter)
router.use('/', googleRouter)
router.use('/', githubRouter)

export default router
