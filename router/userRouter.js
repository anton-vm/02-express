const express = require('express');
const UserModel = require('../models/UserModel');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        const existUser = await UserModel.findOne({email})

        if(existUser) {
            return res.status(409).send({message: "Such user is in use"})
        }

        const newUser = await UserModel.create({
            email,
            password,
        })


        res.status(200).send({
            _id: newUser._id,
            email: newUser.email,
            subscription: newUser.subscription
        })

    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email})

    if(!user) {
       return res.status(400).send({message: "Such user not found"})
    }
    if(! (await user.isPasswordValid(password))) {
        throw new Error ('not correct password')
    }

    user.token = user.generateToken()

    await user.save()


    res.send(user)
});

router.post('/logout', async (req, res) => {
    const id = req.body._id
  
    const user = await UserModel.findById(id)
    if(!user) {
       return res.status(404).send({message: "There is no such authorized user"})
    };
    user.token = "";
    await user.save();
    res.send({message: "Logout is success"})
})


router.get('/current', async (req, res) => {
    const user = req

    res.send({
        
    })
})

module.exports = router