const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

// Настройка для чтения переменных окружения из .env файла
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port ${PORT}`);
});

// Получаем строку подключения из переменных окружения
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("Строка подключения отсутствует. Проверьте переменную MONGO_URI в файле .env");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('Database connection successful'))
  .catch((error) => {
    console.error('Database connection error:', error.message);
    process.exit(1);
  });

console.log('MONGO_URI:', process.env.MONGO_URI); // Убедитесь, что в продакшн среде это не выводится
