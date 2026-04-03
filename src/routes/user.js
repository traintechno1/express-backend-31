const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first: String,
    last: String,
    mobile: Number,
    email: String
})

const userModel = mongoose.model("user", userSchema, "user");

router.get("/", (req, res)=>{
    userModel.find().then(users=>{
        res.json({users});
    })
});

// API to get two users

// http://localhost:4000/user?id1=tyqterefq&id2=7831yg

router.get('/find-two', (req, res)=>{
    const {id1, id2} = req.query;

    if(!id1 || !id2 ){
        res.status(400).json({
            message: "Please provide both id1 and id2"
        })
    }

    if(!mongoose.Types.ObjectId.isValid(id1) 
        ||!mongoose.Types.ObjectId.isValid(id2) 
        ){
            res.status(400).json({
                message: "One or both ids are invalid"
            })  
        }

    Promise.all([
        userModel.findById(id1),
        userModel.findById(id2)
    ]).then(([user1, user2])=>{
        res.status(200).json({
            users: {user1, user2}
        });
    })

})

router.post("/find-many", (req,res)=>{
    const {ids}=  req.body;

    userModel.find({ _id: {$in: ids}})
    .then(users=>{
        if(users.length === 0 ){
            res.status(400).json({
                message: "No users found"
            })
        }else{
            res.status(200).json({
                users,
                count: users.length
            })
        }
    })

})

router.get("/:id", (req, res)=>{
    const id = req.params.id;

    userModel.findById(id).then(user=>{
        if(user){
            res.json({user: user});
        }
        else{
            res.status(204).send("No user found");
        }
    })
    .catch((e)=> {
        console.log(e);
        res.status(204);
    })
});

router.delete("/:id", (req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndDelete(id)
    .then(user=>{
        if(!user){
            res.status(404).json({
                message: "User not found"
            })
        }else{
         res.status(200).json({
            message: "user deleted successfully",
            user: user
         })
        }
    })
})

router.post("/", async (req, res)=>{
    let user = req.body;
    const newUser = await userModel.create(user);
    res.status(201).json({
        user: newUser
    })
})

router.put('/:id', async (req,res)=>{
    let user = req.body;
    let id = req.params.id;

    const updatedUser = await userModel.findOneAndReplace({_id: id}, user, {new: true});
    if(!updatedUser){
        res.status(404).json({
            error: "User not found"
        })
    }else{
        res.status(200).json({
            user: updatedUser,
            message: "User updated succssfully"
        })
    }
})


module.exports = router;