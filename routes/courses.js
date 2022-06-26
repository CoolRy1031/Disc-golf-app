import { Router } from 'express'
import * as coursesCtrl from '../controllers/courses.js'

const router = Router()

router.get('/', coursesCtrl.index)



export {
  router
}