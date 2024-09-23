const express = require('express');
const router = express.Router();
const { listContacts, getById, addContact, removeContact, updateContact } = require('../../models/controllers/contactsController');
const { validateContact, validateUpdateContact } = require('../../middlewares/validateContact');

// Получение всех контактов
router.get('/', async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Получение контакта по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление нового контакта
router.post('/', validateContact, async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Удаление контакта
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Обновление контакта
router.put('/:id', validateUpdateContact, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedContact = await updateContact(id, body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
