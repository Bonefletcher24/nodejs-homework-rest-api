const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/users');
const { logout } = require('../../controllers/users');
const { current } = require('../../controllers/users');
const { auth } = require('../../middleware/auth');


router.get('/current', auth, current);

router.post('/register', register);

router.post('/login', login);

router.post('/logout', auth, logout);

router.get('/', auth, getAll);

router.patch('/', auth, updateSubscription);




module.exports = router;
