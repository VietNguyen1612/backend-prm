const app = require("./src/app");

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
  console.log(`Server start with port ${PORT}`);
});
