const express = require('express');
const router = express.Router();
const { login } = require('../../controllers/auth'); // Путь к контроллеру
const { updateAvatar } = require('../../controllers/users'); // Подключаем контроллер
const upload = require('../../middlewares/upload'); // Multer middleware для загрузки файлов
const { authenticate } = require('../../middlewares/authenticate'); // Middleware для проверки токена

// Маршрут для обновления аватара
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

// Добавьте маршрут для логина
router.post('/login', login);

module.exports = router;
