const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { Unauthorized } = require('http-errors');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized('Email or password is wrong');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Unauthorized('Email or password is wrong');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
  
    res.status(204).send();
  };

const current = async (req, res, next) => {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });
  };

  const updateSubscription = async (req, res, next) => {
    const { _id } = req.user;
    const { subscription } = req.body;
  
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
  
    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  };
  
  
  module.exports = {
    register,
    login,
    logout,
    current,
  };
  