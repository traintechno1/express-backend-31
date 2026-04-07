const router = require("express").Router();
const mongoose = require("mongoose");


const customerSchema = mongoose.Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    email: String,
    mobile: Number,
    address: String,
    gender: String,
    aadhar: String,
    pan_number: String,
    password: String
})

const customerModel = mongoose.model("customers", customerSchema, "customers");


router.post("/", async (req, res)=>{
    const customer =  await customerModel.create(req.body);
    res.status(201).json({
        user: customer
    });
});

module.exports = router;