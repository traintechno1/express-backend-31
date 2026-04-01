const express = require("express");
const app = express();

// middleware
app.use(express.json());

const users = [
    {
        id: 1,
        name: "Hemant",
        mobile: 9867568962,
        email: "hemant@gmail.com"
    },
    {
        id: 2,
        name: "Anubhav",
        mobile: 7877568962,
        email: "anubhav@gmail.com"
    }
];

app.get("/", (req, res)=> {
    res.send("This is my first simple express API!!");
})

app.get("/users", (req, res)=> {
    res.status(200).json(users);
})

// :id is a path variable

app.get("/user/:userId", (req, res)=>{
    const userId = req.params.userId;
    const user = users.find(r=> r.id == userId);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(204).json({
            message: `user with id ${userId} not found`
        });
    }
})

app.post("/user", (req,res)=>{
    let user = req.body;
    users.push(user);
    res.status(201).json({
        message: "User added successfuly!",
        users: users
    })
})

app.listen(3300, ()=> {
    console.log("Express Server started on port 3300");
});