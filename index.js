const pg = require('pg');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.redirect('/db');
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    client.query('SELECT * FROM students', function (err, result) {
      done();
      if (err) {
        console.error("An error occurred on the server. Error: " + err);
      } else {
        const students = result.rows;
        response.render('pages/index', { students: students });
      }
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Listening on ${PORT} 😎 ...`);
});
