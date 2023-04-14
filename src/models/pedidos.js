const mongo = require("mongoose");

const pedidoSchema = mongo.Schema({
    propietario: {
        type: String,
        required: true,
    },
    nombreCliente: {
        type: String,
        required: true,
    },
    apellidoCliente: {
        type: String,
        required: true,
    },
    producto: {
        type: String,
        required: true,
    },
    cantidadProducto: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String,
        required: false,
    },
    isFinish: {
        type: Boolean,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: false,
    },
});

module.exports = mongo.model("Pedido", pedidoSchema);
