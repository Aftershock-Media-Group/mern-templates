require('dotenv').config()

import http from 'http'
import api from './api/api.js'
import initSocket from './socket/initSocket.js'
import './utils/randomUtils'
import verboseLogging from './utils/veboseLogging'
import mongoose from 'mongoose'
import { UserModel } from './models/user.model.js'

async function startup() {
  const server = http.Server(api)
  initSocket()

  await mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.log(err)
    })

  server.listen(process.env.PORT, async () => {
    if (process.env.NODE_ENV !== 'production') verboseLogging()
  })

  console.log(`server started at ${process.env.PORT}`)
}
startup()
