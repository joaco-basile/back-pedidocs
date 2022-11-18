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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    vip: {
        type: Boolean,
        require: true,
        default: false,
    },
});

module.exports = mongo.model("User", userSchema);
