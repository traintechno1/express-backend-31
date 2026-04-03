const express = require("express");
const router =  express.Router();

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

// router.get("/", (req, res)=> {
//     res.send("This is my first simple express API!!");
// })

router.get("/", (req, res)=> {
    res.status(200).json(users);
})

// :id is a path variable

router.get("/:userId", (req, res)=>{
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

router.post("/", (req,res)=>{
    let user = req.body;
    users.push(user);
    res.status(201).json({
        message: "User added successfuly!",
        users: users
    })
})

module.exports = router;