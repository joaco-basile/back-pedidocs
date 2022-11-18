//Imports
const expres = require("express");
const mongo = require("mongoose");
const userRoutes = require("./routes/users");
const pedidosRoutes = require("./routes/pedidos");
const cors = require("cors");

require("dotenv").config();

//Initial variables
const app = expres();
const port = process.env.PORT || 5000;

// middlwares
app.use(cors({ origin: "*", credentials: true }));
app.use(expres.json());
app.use("/api", [userRoutes, pedidosRoutes]);

//routes
app.get("/", (req, res) => { 
    res.send("Ya ingresaste a mi api");
});

//connect to Mongodb
mongo
    .connect(process.env.MONGODB_URI)
    .then((db) =>
        console.log("Conectado a la base de datos en:", db.connection.host)
    )
    .catch((error) => console.log(error));

//starting backend
app.listen(port, () =>
    console.log("Se inicio la coneccion en el puerto:", port)
);
