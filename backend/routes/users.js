const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { generateToken } = require("../utils/functions")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const { JWT_SECRET, JWT_EXPIRES, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;



const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true, 
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

// route for registration
router.post("/register", async(req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ message: "Korisnik sa ovom e-mail adresom je već registrovan" });
        
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword, 
            phoneNumber: req.body.phoneNumber,
            registrationToken: generateToken(20),
            registrationExpires: Date.now() + 3600000 

        });

        const newUser = await user.save();

        if (newUser) {
            const templatePath = path.join(__dirname, '../templates/activateAccount.html');
            let htmlContent = fs.readFileSync(templatePath, 'utf8');
        
            htmlContent = htmlContent.replace('{{token}}', newUser.registrationToken);
            htmlContent = htmlContent.replace("{{userName}}", newUser.firstName);
        
            await transporter.sendMail({
                from: '"PipeMont" <admin@isusivanjevlagesubotica.rs>',
                to: req.body.email,
                subject: "Molimo vas aktivirajte nalog",
                html: htmlContent // Use the generated HTML content
            });
        }
        return res.status(201).json({message: "Proveri e-mail inboks za aktivaciju naloga"});
    } catch (err) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" });
    }
})

//route for activating account
router.post("/activate", async(req,res) => {
    try{
        const { registrationToken, registrationExpires } = req.body;

        if (!registrationToken) return res.status(400).json({ message: "Token je obavezan" });
       
        const user = await User.findOne({ registrationToken });
        if (!user) return res.status(404).json({ message: "Korisnik nije pronađen" });

        if(registrationExpires < Date.now()) {
            user.registrationToken = undefined;
            user.registrationExpires = undefined;
            return res.status(400).json({message: "Token za registraciju je istekao"})
        }
        
        user.isActive = true; 
        user.registrationToken = undefined; 
        user.registrationExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Nalog je uspešno aktiviran" });

    }catch(err) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" })
    }
})

// route for login
router.post("/login", async(req,res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message: "Uneti podaci su pogrešni"})
        const isGoodPassword = await bcrypt.compare(password, user.password);
        if(!isGoodPassword) return res.status(401).json({message: "Uneti podaci su pogrešni"})
        const token = jwt.sign({ userId: user._id, firstName: user.firstName, lastName: user.lastName }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        return res.status(200).json({ token });

    }catch(e) {
        return res.status(500).json({ message: "Došlo je do greške na serveru" });
    }
})


module.exports = router