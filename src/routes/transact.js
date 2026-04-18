const router = require("express").Router();
const {transactionModel} = require("../models/transactionModel");
const {accountModel} = require("../models/accountModel");

router.post("/", async (req, res)=>{
    let transactionRequest = req.body;
    transactionRequest.timestamp = new Date().toISOString();

    const senderAccount = await accountModel.findOne({email: transactionRequest.sender_email})
    const receiverAccount = await accountModel.findOne({email: transactionRequest.receiver_email})

    if(senderAccount && senderAccount.balance >= transactionRequest.amount){    
        // debit amount from sender account
        const senderRequest = {
            balance : senderAccount.balance - transactionRequest.amount
        }
        
        const updatedSenderAccount = await accountModel.findByIdAndUpdate(senderAccount._id, {$set: senderRequest}, {new: true});

        // credit amount to receiver's account
        const receiverRequest = {
            balance: receiverAccount.balance + transactionRequest.amount
        }
        
        await accountModel.findByIdAndUpdate(receiverAccount._id, {$set: receiverRequest}, {new: true});

        await transactionModel.create(transactionRequest);

        res.status(201).json({
            message: `Amount of ${transactionRequest.amount} sent successfully!`,
            balance: updatedSenderAccount.balance
        })
    }else{
        res.status(200).json({
            message: "Balance is less than the transaction amount",
            balance: senderAccount.balance,
            amount: transactionRequest.amount
        })
    }
   
})

module.exports = router;