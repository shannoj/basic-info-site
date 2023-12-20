const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');
const router = express.Router();

let homepage = './pages/index.html';
let about = './pages/about.html';
let contactpage = './pages/contact-me.html';

let page404;
fs.readFile('./pages/404.html', (err, data) => {
  if (!err) {
    page404 = data;
  }
});

app.use(express.static('styles'));

router.get('/', (req, res) => {
  fs.readFile(homepage, (err, data) => {
    if (err) {
      res.status(404).set('Content-Type', 'text/html');
      res.send(page404);
    } else {
      res.status(200).set('Content-Type', 'text/html');
      res.send(data);
    }
  });
});

router.get('/about', (req, res) => {
    fs.readFile(about, (err, data) => {
        if (err) {
            res.status(404).set('Content-Type', 'text/html');
            res.send(page404);
        } else {
          res.status(200).set('Content-Type', 'text/html');
          res.send(data);
        }
      });
});   

router.get('/contact-me', (req, res) => {
    fs.readFile(contactpage, (err, data) => {
        if (err) {
            res.status(404).set('Content-Type', 'text/html');
            res.send(page404);
        } else {
          res.status(200).set('Content-Type', 'text/html');
          res.send(data);
        }
      });
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
