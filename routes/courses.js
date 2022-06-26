import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as coursesCtrl from '../controllers/courses.js'

const router = Router()

router.get('/', isLoggedIn, coursesCtrl.index)
router.get('/new', isLoggedIn, coursesCtrl.new)
router.get('/:id', isLoggedIn, coursesCtrl.show)
router.post('/', isLoggedIn, coursesCtrl.create)
router.post('/:id/reviews', isLoggedIn, coursesCtrl.createReview)
router.delete('/:id', isLoggedIn, coursesCtrl.delete)




export {
  router
}