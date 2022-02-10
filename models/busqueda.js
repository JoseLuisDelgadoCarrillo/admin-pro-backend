const {Schema, model} = require ('mongoose');

const BusquedaSchema = Schema({
    dato: {
        type: String,
        required: true
    }
}, {collection: 'busqueda'} );

BusquedaSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
  });

module.exports= model('Busqueda', BusquedaSchema);