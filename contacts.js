const fs = require("fs").promises;
// const { nanoid } = require("nanoid");
const path = require("path");

const contactPath = path.resolve("./bd/contacts.json");

// console.table(fs.readFile(contactPath));
async function listContacts() {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
}

async function getContactByid(contactId) {
  const contacts = await listContacts();
  const filteredContact = contacts.filter((item) => item.id === contactId);
  return filteredContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactDelate = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactPath, JSON.stringify(contactDelate));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactByid,
  removeContact,
  addContact,
};
