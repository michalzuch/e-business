import { Router } from 'express'
import { router as googleRouter } from './google'
import { router as usersRouter } from './users'

const router = Router()
router.use('/', usersRouter)
router.use('/', googleRouter)

export default router
