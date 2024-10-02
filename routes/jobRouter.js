import { Router } from 'express'
const router = Router()

import { createJob, deleteJob, editJob, getAllJobs, getSingleJob } from '../controllers/jobController.js'
import { validateIdParam, validateJobInput } from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'


router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob)

router.route('/:id').get(validateIdParam, getSingleJob).patch(checkForTestUser, validateJobInput, validateIdParam, editJob).delete(checkForTestUser, validateIdParam, deleteJob)

export default router