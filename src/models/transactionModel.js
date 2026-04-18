const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    receiver_email: String,
    amount: Number,
    sender_email: String,
    timestamp: String
});

const transactionModel = mongoose.model("transactions", transactionSchema, "transaction");

module.exports = {transactionSchema, transactionModel}