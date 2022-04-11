const serieSchema = require('../models/series')
const Boom = require("@hapi/boom");

class serieService{

  createSerie(serie){
    const respuesta = serie.save()
    return serie
  }
 
  listSeries(){
    return serieSchema.find()
  }

  async listOne(id){
    return serieSchema.findById({_id: id}).then(data => {
      if(!data){
        throw Boom.notFound('No se encontró la serie')
      }
      return data
    })
  }

  async removeOne(id){
    const remover = serieSchema.findById({_id : id})
    
    return serieSchema.deleteOne(remover).catch((erorr) => console.log('Serie no encontrada'))
   
  }

  update(id, serie, number_seasons, original_lenguage, features_seasons){
    const serie_find = serieSchema.findById(id)
    if(serie_find){
      return serieSchema.updateOne({id},{serie, number_seasons, original_lenguage, features_seasons})
    }
    return 'serie no encontrada'
  }

  //por nombre del actor
async listforNameActor(name){
    const series = await serieSchema.find()
    const filtradas = []
     series.forEach( e => {
      e.features_seasons.forEach(feature => {
        feature.cast.forEach( actor => {
          if(actor == name ){
            filtradas.push(e)
          }
        })
      })
    }) 
    let result = filtradas.filter((item,index)=>{
      return filtradas.indexOf(item) === index;
    })
    return result
  }


  //según la fecha de estreno de una tempoprada
  async listforDatePremier(date){
    const series = await serieSchema.find()
    const filtradas = []
     series.forEach( e => {
      e.features_seasons.forEach(feature => {
        if(feature.premier_date == date){
          filtradas.push(e)
        }
      })
    }) 
    let result = filtradas.filter((item,index)=>{
      return filtradas.indexOf(item) === index;
    })

    return result
  }

}

module.exports  = serieService