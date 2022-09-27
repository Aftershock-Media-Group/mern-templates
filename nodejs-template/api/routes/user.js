import { Router } from 'express'
import getUser from '../../services/user/get.user'
import handleRequest from '../handleRequest'

const router = Router()

router.get('/get', (req, res) => {
  handleRequest(req, res, getUser)
})

export default router
