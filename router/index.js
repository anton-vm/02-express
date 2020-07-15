const ContactsControler = require("../controllers/contactsControl");
const express = require('express');
const router = express.Router();

const contactsControler = new ContactsControler();

// console.log(contactsControler.getContacts().then(data=>console.table(data)));

router.get("/", contactsControler.listContacts)

router.get('/:contactId', 
    contactsControler.getContact
)

router.post('/', contactsControler.addContact)

router.put('/:contactId', contactsControler.updateContact)

router.delete('/:contactId', contactsControler.deleteContact)


module.exports = router;