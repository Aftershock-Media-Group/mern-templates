export default (err, res) => {
    if (res) {
      res.statusCode = err.message.length === 4 ? 500 : 400
      return res.send(err.message)
    } else {
      return true
    }
  }
  