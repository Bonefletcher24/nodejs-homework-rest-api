const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '../contacts.json');

// Получение всех контактов
async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

// Получение контакта по ID
async function getById(id) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === id);
}

// Добавление нового контакта
async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// Удаление контакта
async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  }
  return false;
}

// Обновление контакта
async function updateContact(id, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }
  return null;
}

module.exports = { listContacts, getById, addContact, removeContact, updateContact };
