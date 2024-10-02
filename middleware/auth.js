const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Unauthorized } = require('http-errors');

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw new Unauthorized('Not authorized');
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized('Not authorized'));
  }
};

module.exports = auth;
