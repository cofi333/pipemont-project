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
        if(newMachine) return res.status(201).json({message: "Mašina je uspešno dodana"})
        
    }catch(e) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" })
    }
})

// route for getting number of machines
router.get("/activeMachines", async(req,res) => {
    try {
        const allMachines = await Machine.find();
        const rentedMachines = await Machine.find({ isRented: true });
        const allMachinesLength = allMachines.length;
        const rentedMachinesLength = rentedMachines.length;


        return res.status(200).json({
         allMachines: allMachinesLength, rentedMachines: rentedMachinesLength
        })
    }catch(e) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" });
    }
})

// route for getting all machines
router.get("/allMachines", async(req,res) => {
    try {
        const allMachines = await Machine.find();
        return res.status(200).json(allMachines)
    }catch(e) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" });
    }
})

// route for getting all not rented machines
router.get("/allAvailableMachines", async(req,res) => {
    try {
        const allAvailableMachines = await Machine.find({isRented: false});
        return res.status(200).json(allAvailableMachines)
    }catch(e) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" });   
    }
})

// route for deleting the machine
router.delete("/delete/:id", async(req,res) => {
    try{
        const machineID = req.params.id;
        const machine = await Machine.findById(machineID);
        if(machine.isRented === true) {
            return res.status(403).json({message: "Ne možete obrisati mašinu koja je na terenu"})
        }
        if(!machine) {
            return res.status(404).json({message: "Mašina nije pronađena"})
        }

        await Machine.findByIdAndDelete(machineID);
        return res.status(200).json({message: "Mašina je uspešno obrisana"})
    }catch(e) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" });
    }
})



module.exports = router