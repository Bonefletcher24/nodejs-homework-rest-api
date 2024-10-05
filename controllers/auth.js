const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Найти пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Проверить пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Создать JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login,
};
