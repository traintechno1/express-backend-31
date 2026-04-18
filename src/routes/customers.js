const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    const customer = await customerModel.create(req.body);
    const token = jwt.sign({
        id: customer._id,
        email: customer.email,
        full_name: customer.first_name + " " + customer.last_name
    },
    "6fr5f6_632grdyqwgbaj");
    res.status(201).json({
        user: customer,
        token
    });
});

router.post("/login", async (req, res)=>{
    const { email, password } = req.body;
    const user = await customerModel.findOne({email});
    if(!user) res.status(401).json({ error: "Invalid Email Address"})
    
    if(user.password != password) res.status(401).json({ error: "Password is not matching"})
    
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        full_name: user.first_name + " " + user.last_name
    },
    "6fr5f6_632grdyqwgbaj");
    res.status(200).json({
        success: true, 
        message: "User logged in successfully!",
        token
    });
    console.log(user);
})

module.exports = router;