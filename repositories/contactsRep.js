const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const { promises: fsPromises } = fs;

const contactsPath = path.join("./db/", "contacts.json");


class Contacts  {
 constructor() {
   this.contacts = new Map()
 }



takeData() {
    return fsPromises
  .readFile(contactsPath, "utf-8")
  .then(data => JSON.parse(data))
  .catch(err => err)
  }

 getContact(id) {
     return this.contacts.get(id)
 };

 postContact(data) {
     return this.contacts.set(id, data)
 };

 updateContact(id, data) {
     const contact = this.contacts.get(id) || {};
     this.contacts.set(id, {...contact, ...data})
 };

 deleteContact(id) {
     this.contacts.delete(id)
 };

}

module.exports = new Contacts()

// module.exports = {listContacts}