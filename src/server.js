const app = require('express') ();

app.get('/', (req, res) => {
  res.status(202).send("Hello, world!");
})

const PORT = 5000;
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});