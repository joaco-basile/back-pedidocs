const expres = require("express");
const userSchema = require("../models/user");

const router = expres.Router();

//Crear usuario
router.post("/users", (req, res) => {
    const user = userSchema(req.body);

    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Obtener todos los usuarios
router.get("/users", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Obtener un usuario
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Auctualizar usuario
router.put("/users", (req, res) => {
    const { id, name, password } = req.body;

    userSchema
        .updateOne({ _id: id }, { $set: { name, password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Borrar usuario
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
