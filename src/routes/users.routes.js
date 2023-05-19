const { Router } = require('express');

const usersRoutes = Router();

usersRoutes.post('/', (req, res) => {
  const {name,password, email} = req.body;
  res.status(200).json ({name, password, email});
})

module.exports = usersRoutes;