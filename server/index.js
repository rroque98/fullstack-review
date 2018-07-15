const express = require('express');
let app = express();
var bodyParser = require('body-parser')
var githubHelper = require('../helpers/github');
var db = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  githubHelper.getReposByUsername(req.body.username, (err, repoResults) => {
    if (err) {
      res.send('error in posting!');
    } else {
      repoResults.forEach(function(repo) {
        repo.unique = true;
        db.save(repo);
      });
      res.send('successful post!')
    }
  });
});

app.get('/top25', function (req, res) {
  db.find(function(err, repos) {
    if (err) {
      res.send('error in getting repos');
    }
    res.send(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});