import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as coursesCtrl from '../controllers/courses.js'

const router = Router()

router.get('/new', isLoggedIn, coursesCtrl.new)



export {
  router
}