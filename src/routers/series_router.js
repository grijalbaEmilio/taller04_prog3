const express = require('express')
const serieModel = require('../models/series')
const serieService = require('../services/serieService')
const service = new serieService()

const serieRouter = express.Router()


serieRouter.post('/serie', async (req, res)=>{
  const newSerie = serieModel(req.body)
  const create = service.createSerie(newSerie)
  res.json(create)
})

serieRouter.get('/',  async (req, res) => {
  res.send( await service.listSeries())
})

serieRouter.get('/:id', async(req, res) => {
  const id = (req.params).id
  res.json(await service.listOne(id))
})

serieRouter.delete('/:id', async(req, res) =>{
  const id = req.params.id
  res.json({message : await service.removeOne(id)})
})

serieRouter.put('/:id', async(req, res) =>{
  const id = req.params.id
  const {serie, number_seasons, original_lenguage, features_seasons} = req.body
  res.json(await service.update(id, serie, number_seasons, original_lenguage, features_seasons))
})

serieRouter.get('/actor/:name', async (req, res) =>{
  const name = req.params.name
  res.json(await service.listforNameActor(name))
})

serieRouter.get('/premier/:date', async (req, res) =>{
  const date = req.params.date
  res.json(await service.listforDatePremier(date))
})

module.exports  = serieRouter