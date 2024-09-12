const express = require("express")
const router = express.Router()
const Machine = require("../models/machine")

// route for adding a machine
router.post("/add", async(req,res) => {
    try{
        const { machineProducer, machineName } = req.body;
        const machine = new Machine({
            machineProducer: machineProducer,
            machineName: machineName
        })

        const newMachine = await machine.save();
        if(newMachine) res.status(201).json({message: "Mašina je uspešno dodana"})
        
    }catch(e) {
        console.log(e)
    }
})

// route for getting number of machines
router.get("/activeMachines", async(req,res) => {
    try {
        const allMachines = await Machine.find();
        const rentedMachines = await Machine.find({ isRented: true });
        const allMachinesLength = allMachines.length;
        const rentedMachinesLength = rentedMachines.length;


        res.status(200).json({
         allMachines: allMachinesLength, rentedMachines: rentedMachinesLength
        })
    }catch(e) {
        console.log(e)
    }
})

// route for getting all machines

router.get("/allMachines", async(req,res) => {
    try {
        const allMachines = await Machine.find();
        res.status(200).json(allMachines)
    }catch(e) {
        console.log(e)
    }
})

// route for getting all not rented machines
router.get("/allAvailableMachines", async(req,res) => {
    try {
        const allAvailableMachines = await Machine.find({isRented: false});
        res.status(200).json(allAvailableMachines)
    }catch(e) {
        console.log(e)
    }
})

module.exports = router