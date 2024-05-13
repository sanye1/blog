import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

import bcrypt from 'bcrypt';


import User from './Schema/User.js'
const app = express();


let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])|(?=.*[A-Z]).{6,20}$/; // regex for password

app.use(express.json())

mongoose.connect(process.env.DB_LOCATION, { autoIndex:true })

app.post('/signup', (req, res) => {
    const {fullname, email, password} = req.body;
    if(!fullname || !email || !password){
        return res.status(403).json({"error": 'Please fill all the fields'})
    }
    // TODO: validate the data
    if(fullname.length<3){
        return res.status(403).json({"error": 'Fullname must be at least 3 characters long'})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({"error": 'Password must be at least 6 characters long and contain at least one  letter and one number'})
    }
    if(!emailRegex.test(email)){
            return res.status(403).json({"error": 'Email is not valid'})
    }
    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({"error": 'Internal server error'})
        }
        const username = email.split('@')[0];
        const user = new User({
            personal_info: {
                fullname,
                email,
                password: hash,
                fullname
            }
        })
        user.save().then(() => {
            return res.json({"message": 'User registered successfully'})
        })
        .catch(err => {
            return res.status(500).json({"error": err.message})
        })
        // TODO: save the user to the database
        // res.json({"message": 'User registered successfully'})
    })
    // TODO: check if the email is already registered
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});