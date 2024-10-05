const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const User = require('../models/user'); // Импортируем модель пользователя

const avatarsDir = path.join(__dirname, '../public/avatars'); // Директория для хранения аватаров

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, originalname } = req.file; // Получаем путь к загруженному файлу и его оригинальное имя
    const { _id } = req.user; // Получаем ID пользователя из токена

    // Создаем уникальное имя для файла
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    // Обработка изображения с помощью Jimp
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(resultUpload);

    // Удаляем временный файл после обработки
    await fs.unlink(tempUpload);

    // Обновляем URL аватарки в базе данных пользователя
    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(_id, { avatarURL });

    // Возвращаем обновленный URL аватарки
    res.json({ avatarURL });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update avatar' });
  }
};

module.exports = {
  updateAvatar,
};
