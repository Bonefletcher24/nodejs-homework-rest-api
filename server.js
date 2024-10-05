const app = require('./app'); // Убедитесь, что путь правильный

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
