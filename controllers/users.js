const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Функция для регистрации пользователя
const register = async (req, res) => {
  const { email, password } = req.body;
  const verificationToken = uuidv4();

  const user = new User({
    email,
    password, // Убедитесь, что вы хешируете пароль перед сохранением
    verificationToken,
  });

  await user.save();

  // Отправка email с ссылкой на верификацию
  const msg = {
    to: email,
    from: "your-email@example.com", // Замените на ваш email-отправитель
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/users/verify/${verificationToken}`,
    html: `<p>Please verify your email by clicking the following link: <a href="${process.env.BASE_URL}/users/verify/${verificationToken}">Verify Email</a></p>`,
  };

  await sgMail.send(msg);

  res.status(201).json({ message: "User created. Please verify your email." });
};

// Функция для верификации email
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.status(200).json({ message: "Verification successful" });
};

// Функция для повторной отправки email с верификацией
const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res.status(400).json({ message: "Verification has already been passed" });
  }

  const msg = {
    to: email,
    from: "your-email@example.com",
    subject: "Resend Email Verification",
    text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/users/verify/${user.verificationToken}`,
    html: `<p>Please verify your email by clicking the following link: <a href="${process.env.BASE_URL}/users/verify/${user.verificationToken}">Verify Email</a></p>`,
  };

  await sgMail.send(msg);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  register,
  verifyEmail,
  resendVerificationEmail,
};
