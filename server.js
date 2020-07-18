require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_NAME = "db-contacts"
const CONNECTION_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.i7bgb.mongodb.net/${DATABASE_NAME}`;

class ContactsDatabase {
    constructor() {
       this.connection = null;
       this.database = null
    }

    errorHandler() {
        console.error("There is no connection");
        console.errror(e)

        process.exit(1)
    }

    async init() {
        try {
            this.connection = mongoose.connect(CONNECTION_URL, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })

            console.log("Database connection successful");

        } catch(e) {
            this.errorHandler(e);
        }
    }
}

module.exports = new ContactsDatabase()