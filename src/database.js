const mongo = require("mongoose");

mongo
    .connect(process.env.MONGODB_URI)
    .then((db) =>
        console.log("Conectado a la base de datos en:", db.connection.host)
    )
    .catch((error) => console.log(error));
