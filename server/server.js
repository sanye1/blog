import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

import User from './Schema/User.js'
import jwt from 'jsonwebtoken';
import cors from 'cors';

import admin from 'firebase-admin'
import serviceAccountKey from './blog-marn-firebase-adminsdk-wr17r-c658e16714.json' assert {type: 'json'}
import { getAuth } from 'firebase-admin/auth';
const app = express();


admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])|(?=.*[A-Z]).{6,20}$/; // regex for password

app.use(express.json())

app.use(cors())


mongoose.connect(process.env.DB_LOCATION, { autoIndex:true })



const formatDataToSend = (user)=>{
    const access_token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY, {expiresIn: '1h'})
    return {
        access_token,
        profile_img:user.personal_info.profile_img,
        fullname:user.personal_info.fullname,
        username:user.personal_info.username,
    }
}


const generateUsername = async (email)=>{
    const  username = email.split('@')[0];
    const isUsernameUnique = await User.exists({"personal_info.username": username});
    if(isUsernameUnique){
        return username + nanoid(3);
    }
    return username;
}
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
    
    bcrypt.hash(password, 10, async(err, hash) => {
        if(err){
            return res.status(500).json({"error": 'Internal server error'})
        }
        const username =await generateUsername(email)
        const user = new User({
            personal_info: {
                fullname,
                email,
                password: hash,
                username
            }
        })
        user.save().then((u) => {
            return res.json(formatDataToSend(u))
        })
        .catch(err => {
            if(err.code === 11000){
                return res.status(500).json({"error": 'Email is already registered'})
            }
            return res.status(500).json({"error": err.message})
        })
        // TODO: save the user to the database
        // res.json({"message": 'User registered successfully'})
    })
    // TODO: check if the email is already registered
})

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
   
    User.findOne({"personal_info.email": email})
    .then((user) => {
        if(!user){
            return res.json({status:'email not found'})
        }
        // 如果不是google 账号登录
        if(!user.google_auth){
            bcrypt.compare(password, user.personal_info.password, (err, result) => {
                if(err){
                    return res.status(403).json({error:"Error occured while login please try again"})
                }
                if(!result){
                    return res.status(403).json({error:"Incorrect password"})
                }else{
                    return res.json(formatDataToSend(user))
                }
            })
        }else{
            return res.status(403).json({error:"Account was created using google please login with google"})
        }
      
        // return res.json({status:'got usr document'})
    })
    .catch(err => {
        return res.status(500).json({"error": err.message})
    })
})

app.post('/google-auth', (req, res) => {
     let {access_token} = req.body;
     getAuth().verifyIdToken(access_token)
     .then(async(decodeUser)=>{
        let {email,name,picture} = decodeUser
        picture = picture.replace('s96-c','s384-c')
        let user = await User.findOne({'personal_info.email':email}).select('personal_info.fullname personal_info.profile_img personal_info.username google_auth')
        .then(u=>{
            return u || null
        }).catch(err=>{
            return res.status(500).json({'error':err.message})
        })
        if(user){
            if(!user.google_auth){
                return res.status(403).json({'error':'Please login with your email and password'})
            }
        }else{
            let username = await generateUsername(email)
            let newUser = new User({
                personal_info:{
                    fullname:name,
                    email,
                    profile_img:picture,
                    username
                },
                google_auth:true
            })
           user = await newUser.save().catch(err=>{
               return res.status(500).json({'error':err.message})
           })

        }
        return res.status(200).json(formatDataToSend(user))

     }).catch(err=>{
         return res.status(500).json({'error':'Failed to authenticate user. Try with some other google account.' })
     })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});