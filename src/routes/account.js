const router = require("express").Router();
const {accountModel} = require("../models/accountModel");
/*
    Account: 

    _id: 
    name: 
    email: 
    balance: 

*/

/*

    Transaction:

    _id:
    receiver_email:
    amount:
    type: debit/credit
    sender_email:
*/


router.post("/", async (req, res)=>{
    const accountDetails = req.body;
    accountDetails.balance = 0;
    const account =  await accountModel.create(accountDetails);
    res.status(201).json({
        "message": "Account created with default balance as 0",
        account
    });
})


module.exports = router;
