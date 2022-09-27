const { verify } = require('jsonwebtoken')
const handleError = require('../api/handleError')

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Authorization')
  try {
    if (!req.get('Authorization')) throw new Error('Not Authorized')
    const token = req.get('Authorization').split(' ')[1]
    let decoded
    try {
      decoded = verify(token, Buffer.from(process.env.JWT, 'base64'))
    } catch (err) {
      throw new Error('Not authorized')
    }
    req.body.userId = decoded._id
    req.userId = decoded._id
    next()
  } catch (err) {
    handleError(err, res)
  }
}
