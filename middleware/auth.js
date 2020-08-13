const express = require('express');
const userModel = require('../models/UserModel');

const auth = async (req, res, next) => {


    try {
        const { token } = { ...req.query, ...req.body, ...req.headers };


    
        if(!token) {
            return res.status(400).send({message: "Not correct parameters"})
        };

        const user = await userModel.findOne({token})

        if(!user) {
            return res.status(404).send({message: "Not found token"})
        }

        if (!userModel.isTokenValid(token)) {
            return res.status(403).res({message: "Accress denied"})
        }

         user.token.expires = +7200

         await user.save()

         req.user = user
         req.token = token

         next()

    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}

module.exports = auth