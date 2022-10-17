//Imports
const expres = require("express");
const mongo = require("mongoose");
const userRoutes = require("./routes/user");

require("dotenv").config();

//Initial variables
const app = expres();
const port = process.env.PORT || 9000;

// middlwares
app.use(expres.json());
app.use("/api", userRoutes);

//routes
app.get("/", (req, res) => {
    res.send("Ya ingresaste a mi api");
});

//connect to Mongodb
mongo
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado my bro"))
    .catch((error) => console.log(error));

//starting backend
app.listen(port, () =>
    console.log("Se inicio la coneccion en el puerto:", port)
);
