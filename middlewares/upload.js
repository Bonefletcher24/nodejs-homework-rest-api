const multer = require('multer');
const path = require('path');

// Указываем временную директорию для загрузок
const tmpDir = path.join(__dirname, '../tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);  // Сохранение загруженного файла в папку tmp
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}_${file.originalname}`);  // Создание уникального имени для файла
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // Ограничение на размер файла: 1MB
  },
});

module.exports = upload;
