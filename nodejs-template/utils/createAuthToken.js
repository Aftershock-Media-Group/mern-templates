import { sign } from 'jsonwebtoken'

export default (_id, expiration = '7d') => {
  return sign({ _id }, Buffer.from(process.env.JWT, 'base64'), {
    expiresIn: expiration,
  })
}
