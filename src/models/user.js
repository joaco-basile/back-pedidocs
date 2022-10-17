const mongo = require("mongoose");

const userSchema = mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongo.model("User", userSchema);
