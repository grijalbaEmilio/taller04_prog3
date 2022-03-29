const express = require('express')
serie_routes = require('./series_router')
pruba_router = require('./prueba_router')

function routerApi(app){
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/series', serie_routes)
  router.use('/pruebas', pruba_router)
}
'http://3000:localhost/api/v1/series'


module.exports = routerApi