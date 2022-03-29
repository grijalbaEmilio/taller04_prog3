const mongoose = require("mongoose");

const pruebaSchema = mongoose.Schema({
  hola: {
    type: Array,
    require: true[
      {
        persona: {
          type: Object,
          require: true,

          nombre: {
            type: String,
            require: true,
          },
          apellido: {
            type: String,
            require: true,
          },
          edad: {
            type: Number,
            require: true,
          },
        },
      }
    ],
  },
});

module.exports = mongoose.model("pruebaArray", pruebaSchema);
