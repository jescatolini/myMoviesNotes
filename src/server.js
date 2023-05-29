const express = require('express');

const app = express();

const routes = require('./routes');
const AppError = require('./utils/AppError');

app.use(express.json());
app.use('/', routes)
app.use((error, req, res, next) => {
  if ( error instanceof AppError ) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
});

const PORT = 5000;
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});