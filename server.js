const production = true
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));


if (production){
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.sendFile('./public/index.html');
  });
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});