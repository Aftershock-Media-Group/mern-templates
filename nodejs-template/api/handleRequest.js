import handleError from './handleError'

async function handleRequest(req, res, apiFunction) {
  try {
    const payload = await apiFunction(req.body)
    return typeof payload === 'number'
      ? res.sendStatus(payload)
      : res.json(payload)
  } catch (err) {
    console.log(err)
    handleError(err, res)
  }
}

export default handleRequest
