const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const dummyUserRoute = require("./routes/dummy-user");
const customerRoute = require("./routes/customers");
const cors = require("cors");
// middleware
app.use(express.json());
app.use(cors())
app.use("/user", userRoute);
app.use("/dummy-user", dummyUserRoute);
app.use("/customer", customerRoute);

mongoose.connect("mongodb://localhost:27017/React31")
.then(res=> {
    console.log("Connection established with mongodb database on port: 27017");
})

app.listen(3300, ()=> {
    console.log("Express Server started on port 3300");
});