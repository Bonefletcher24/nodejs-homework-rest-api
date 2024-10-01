const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../models/controllers/contacts');
const validateContact = require('../../middlewares/validation');

// Существующие маршруты
router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', validateContact, addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', validateContact, updateContact);

// Новый маршрут для обновления статуса favorite
router.patch('/:contactId/favorite', updateStatusContact);

module.exports = router;

