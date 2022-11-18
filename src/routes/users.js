const expres = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const router = expres.Router();
 
//Crear usuario
router.post("/users", (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
            const user = new userSchema({
                name: name,
                password: hashPassword,
                email: email,
            });

            user.save()
                .then((data) => res.json(data))
                .catch((error) => res.json({ message: error }));

            console.log("se creo con exito");
        })
        .catch((error) => {
            console.log(error);
        });
});

//Obtener un usuario
router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    userSchema
        .findById(id)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

//Obtener un usuarios
router.get("/users", (req, res) => {
    console.log("se entro")
    userSchema
        .find()
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

//Logiar un usuario
router.post("/login/", (req, res) => {
    const { email, password } = req.body;

    console.log("se esta ferificando los valores", email, password);

    userSchema.findOne({ email }, (error, user) => {
        //error al buscar el usuario
        if (error) {
            console.log("No se encontro el usuario");
            return res.status(500).json({
                ok: false,
                err: error,
            });
        }

        //el user no existe
        if (user == null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos",
                },
            });
        }

        //error al validar la password
        if (!bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos",
                },
            });
        }

        //respuesta en caso de que todo este ok
        res.json({
            ok: true,
            usuario: user,
        });
    });
});

//Auctualizar usuario
router.put("/users", (req, res) => {
    console.log(typeof req.body);
    const { id, name, password } = req.body;

    console.log(id, name, password);
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
