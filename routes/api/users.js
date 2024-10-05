const express = require('express');
const { register, verifyEmail, resendVerificationEmail } = require('../../controllers/users'); // Импортируем функции
const router = express.Router();

// Эндпоинт для регистрации пользователя
router.post('/register', register);

// Эндпоинт для верификации email
router.get('/verify/:verificationToken', verifyEmail);

// Эндпоинт для повторной отправки email с верификацией
router.post('/verify', resendVerificationEmail);

module.exports = router;
