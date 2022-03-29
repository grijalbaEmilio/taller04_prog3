const pruebaSchema = require('../models/prueba')

class prueba{

  create(prueba){
    prueba.save()
    return prueba;
  }
}

module.exports = prueba