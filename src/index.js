const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const dummyUserRoute = require("./routes/dummy-user");
const customerRoute = require("./routes/customers");
const accountRoute = require("./routes/account");
const transactionRoute = require("./routes/transact");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// middleware
app.use(express.json());
app.use(cors())
app.use("/customer", customerRoute);

// to check whether the token provided is valid or not?

const protect = (req, res, next) =>{
 const auth = req.headers.authorization;
 if(!auth && !auth.startsWith("Bearer ")){
    res.status(401).json({
        success: false,
        error: "Provide valid authorization"
    })
 }
 try{
    const token = auth.split(" ")[1];
    const decode = jwt.verify(token, "6fr5f6_632grdyqwgbaj");
    next();
 }catch(error){
    res.status(401).json({
        success: false,
        error: "Provide valid authorization"
    })
 }
}

app.use(protect);
app.use("/user", userRoute);
app.use("/dummy-user", dummyUserRoute);
app.use("/account", accountRoute);
app.use("/transact", transactionRoute);

mongoose.connect("mongodb://localhost:27017/React31")
.then(res=> {
    console.log("Connection established with mongodb database on port: 27017");
})

app.listen(3300, ()=> {
    console.log("Express Server started on port 3300");
});