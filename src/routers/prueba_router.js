const express = require('express')
const pruebaSchema = require('../models/prueba')

const pruebaService = require('../services/pruebaService')
const prueba = new pruebaService
const router = express.Router()

router.post('/prueba', async (req, res)=>{
  const body = pruebaSchema(req.body)
  res.json(prueba.create(body))
})

module.exports = router

