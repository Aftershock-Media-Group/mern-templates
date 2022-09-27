import cors from 'cors'
import express, { json } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import googleLogin from '../services/auth/googleLogin'
import authMiddleware from '../middlewares/auth.middleware'
import fs from 'fs'
const api = express()
require('dotenv').config()

api.use(helmet())
api.use(cors())
api.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION,
  })
)

api.use(passport.initialize())
api.use(passport.session())

morgan.token('body', (req, _res) => JSON.stringify(req.body))

api.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
)

googleLogin(passport, api)

api.use(json())

api.use('/api', authMiddleware)

fs.readdir('./api/routes', (err, files) => {
  files.forEach((file) => {
    console.log('added routes: ' + file.split('.')[0])
    api.use(`/api/${file.split('.')[0]}`, require('./routes/' + file).default)
  })
})

export default api
