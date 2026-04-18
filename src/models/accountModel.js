const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    name: String,
    email: String,
    balance: Number
})

const accountModel = mongoose.model("account", accountSchema, "account");

module.exports = {accountModel, accountSchema};