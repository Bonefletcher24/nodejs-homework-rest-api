// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const app = require('./app');

const PORT = process.env.PORT || 3000;  // Используем порт из переменной окружения, если есть
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

