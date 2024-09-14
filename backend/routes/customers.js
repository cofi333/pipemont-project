const express = require("express")
const router = express.Router()
const Customer = require("../models/customer")
const Machine = require("../models/machine")



// route for adding a customer
router.post("/add", async(req,res)=> {
    try{
        const {machine, customerName, customerAddress, customerPhoneNumber} = req.body;
        const selectedMachine = await Machine.findOne({_id: machine});
        selectedMachine.isRented = true;
        await selectedMachine.save();
        const customer = new Customer({
            machineId: machine,
            customerName: customerName,
            customerAddress: customerAddress,
            customerPhoneNumber: customerPhoneNumber
        })
        const newCustomer = await customer.save();


        if(newCustomer) return res.status(201).json({message: "Klijent je uspešno dodan"})
    }catch(e){
        return res.status(500).json({ message: "Došlo je do greške na serveru" })    
    }
})

// route for getting customers informations
router.get("/getCustomerInformations/:id", async(req,res) => {
    try {
        const machineID = req.params.id;
        const customer = await Customer.findOne({machineId: machineID});
        if(!customer) {
            return res.status(404).json({message: "Klijent nije pronađen"})
        }
        return res.status(200).json(customer)
    }catch(e) {
        return res.status(500).json({message:"Došlo je do greške na serveru"})
    }
})

module.exports = router