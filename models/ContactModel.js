const mongoose = require('mongoose')

const  ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, 
        validate: email => {
            if (!email.includes("@"))
            throw new Error("Wrong format of email")
         }
    },
    phone: {type: String, required:true},
    subscription: {type: String, enum: ["free", "pro", "premium"], default: "free"},
    password: {type: String, required: true}
})

module.exports = mongoose.model('contacts', ContactSchema)