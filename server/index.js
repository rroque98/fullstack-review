const express = require('express');
let app = express();
var bodyParser = require('body-parser')
var githubHelper = require('../helpers/github');
var db = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // res.send('hola');
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // console.log('req debugging:', req.body.username)
  githubHelper.getReposByUsername(req.body.username, (err, repoResults) => {
    if (err) {
      res.send('error in posting!');
    } else {
      // console.log('this should be correct repos:', repoResults);
      // save the repo information in the database
      db.find
      db.save(repoResults);

      res.send('successful post!')
    }
  });
});

app.get('/top25', function (req, res) {
  // TODO - your code here!
  res.send('yayyy')
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

