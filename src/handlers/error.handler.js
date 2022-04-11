function logError(err, req, res, next){
  console.log(err)
  next(err)
}

function errorHandler(err, req, res, next){
  res.ststus(400).json({
    message : err.message,
    stack : err.stack
  })
}

function boomErrorHandler(err, req, res, next){
  if (err.isBoom){
    const output = err.output
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = { logError, errorHandler, boomErrorHandler}

