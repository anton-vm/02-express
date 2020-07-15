// const contactsRepository = require("../repositories/contactsRep");
// const { takeData } = require("../repositories/contactsRep");
const fs = require('fs')
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join("./db/", "contacts.json");


class ContactsController {
  takeData() {
    return fsPromises
  .readFile(contactsPath, "utf-8")
  .then(data => JSON.parse(data))
  .catch(err => err)
  };

  

  listContacts(req, res) {
    return fsPromises
    .readFile(contactsPath, "utf-8")
      .then((data) => res.status(200).send(JSON.parse(data)))
      .catch((err) => console.log(err));
  }

  getContact(req, res) {
      const {contactId} = req.params;
      fsPromises
      .readFile(contactsPath, "utf-8")
      .then((data) => {
      const array = JSON.parse(data).find((inside) => inside.id === Number(contactId))
      if (!array) {
          res.status(400).send({message: "Not fond"})
      }
      res.status(200).send(array)
      }
      )
  }

//   postContact(id, data) {
//     return contactsRepository.postContact(id, data);
//   }

 addContact( req, res) {
     fs.readFile(contactsPath, "utf-8", (err, data) => {
        const array  = JSON.parse(data);
        const newContact = {
            ...req.body,
            id: array.length + 1
        } 
          array.push(newContact)
          fs.writeFile(contactsPath, JSON.stringify(array), "utf-8", function (err) {
              if (err) throw err
              console.log("Contact is added");
          })
          res.status(200).send(newContact)
      })
 
      
  }
 
  async updateContact(req, res) {
    try {
    const contactId = Number(req.params.contactId);
    const contactsData = await fsPromises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const {name, email, phone} = req.body

    const contactIndex = contacts.findIndex(contact => contact.id === contactId)

    if (contactIndex === -1) {
      console.error("Error")
     return res.status(404).send({message: "Contact not found"})
    }

    contacts[contactIndex] = {...contacts[contactIndex],  name, email, phone}

    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts), "utf-8")

    res.status(200).send({message: "Data is succesfully changed"})
    } catch (e) {
      console.error("Error", e)
      res.status(500).send(e)
    }
  }

 async deleteContact(req, res) {
    try {

      console.log('hellllloo');
      const contactId = Number(req.params.contactId);
      const contactsData = await fsPromises.readFile(contactsPath, "utf-8");
      const contacts = JSON.parse(contactsData);
      const contactIndex = contacts.findIndex(contact => contact.id === contactId);

      if( contactIndex === -1) {
        return res.status(404).send({message: "contact not found"})
      };

      contacts.splice(contactIndex, 1);

      await fsPromises.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');

      res.status(200).send({message: "contact is deleted"})

    } catch (e) {
      return res.status(500).send(e)
    }
  }
}

module.exports = ContactsController;
