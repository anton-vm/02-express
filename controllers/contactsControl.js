const fs = require('fs')
const path = require("path");
const { promises: fsPromises } = fs;
const ContactModel = require('../models/ContactModel');

const contactsPath = path.join("./db/", "contacts.json");


class ContactsController {
  

  listContacts(req, res) {
    return ContactModel.find({})
      .then((data) => res.status(200).send(data))
      .catch((err) => console.log(err));
  }

  async getContact(req, res) {
    try{
      const {contactId} = req.params;
      const contact = await ContactModel.findById({_id: contactId});
      if (!contact) {
        res.status(400).send({message: "Contact not found"});
      };
      res.status(200).send(contact)
      
    } catch (e) {
      console.error(e);
      res.status(500).send(e)
    }
  }



 async addContact( req, res) {

  try{
    const {name, email, phone, password, subscription} = req.body;
    const newContact = await ContactModel.create({name, email, phone, password, subscription});

    if(!newContact) {
      res.send({message: "Somethisng is wrong"});
    };
    res.send({message: "New contact is added"})

  } catch (e) {
    console.error(e);
    res.status(500).send(e)
  }

  }
 
  async updateContact(req, res) {
    try {
    const contactId = req.params.contactId;
    const {name, email, phone, password, subscription} = req.body

    if (!name || !subscription) {
      return res.send("Bad request")
    }

    const contact = await ContactModel.findByIdAndUpdate({_id:contactId}, {name, email, phone, password, subscription})

    res.status(200).send({message: "Data is succesfully changed"})
    } catch (e) {
      console.error("Error", e)
      res.status(500).send(e)
    }
  }

 async deleteContact(req, res) {
    try {
      const contactId = req.params.contactId;
      await ContactModel.findByIdAndDelete({_id: contactId})

      res.status(200).send({message: "contact is deleted"})

    } catch (e) {
      return res.status(500).send(e)
    }
  }
}

module.exports = ContactsController;
