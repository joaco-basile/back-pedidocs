const expres = require("express");
const pedidoSchema = require("../models/pedidos");

const router = expres.Router();

//Crear pedido
router.post("/pedidos", (req, res) => {
    const pedido = pedidoSchema(req.body);
    console.log(req.body);
    pedido
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Obtener todos los pedidos
router.get("/pedidos/", (req, res) => {
    //    const { propietario } = req.params;

    pedidoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Obtener un pedidos de un usuario
router.get("/pedidos/:propietario", (req, res) => {
    const { propietario } = req.params;

    pedidoSchema
        .find({ propietario })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.get("/pedidosId/:id", (req, res) => {
    const { id } = req.params;

    pedidoSchema
        .findById({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Auctualizar pedido
router.put("/pedidos", (req, res) => {
    console.log(req.body);

    const {
        id,
        propietario,
        data: {
            nombreClient,
            apellidoClient,
            producto,
            cantidadProducto,
            fechas,
        },
    } = req.body;

    pedidoSchema
        .updateOne(
            { _id: id },
            {
                $set: {
                    propietario,
                    data: {
                        nombreClient,
                        apellidoClient,
                        producto,
                        cantidadProducto,
                        fechas,
                    },
                },
            }
        )

        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Borrar pedido
router.delete("/pedidos/:id", (req, res) => {
    const { id } = req.params;
    pedidoSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Borrar todos
router.delete("/pedidos/", (req, res) => {
    pedidoSchema
        .remove()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
