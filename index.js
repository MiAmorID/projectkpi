const express = require('express');
const { env } = process
async function startServer() {
  const app = express();

  await require('./loaders')(app);

  app.listen(env.PORT, err => {
    if (err) {
      process.exit(1);
      return;
    }
    console.log("Port opened at " + env.PORT);
  });
}

startServer();
