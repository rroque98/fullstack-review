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
      // db.find
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
    console.log('finally : ', repos)
    res.send(repos);

  });
  // Goal: retrieve up to 25 repos with the highest number of forks
  // invoke async function that retrieves data
  // db.retrievedRepos(db.find, function(err, repos) {
  //   if (err) {
  //     console.log('ERROR');
  //   } else {
  //     console.log('sending back repos:', repos)
  //     res.send(repos);
  //   }
  // })
  // var retrievedRepos = db.find;
  // console.log('retrieved repos before sent back:', retrievedRepos)
  // res.send(retrievedRepos);

  // var exampleData = [
  //   {full_name: 'rroque98/movieList',
  //   description: null,
  //   url: 'https://api.github.com/repos/rroque98/movieList',
  //   forks: 0,
  //   watchers: 0},
  //   {full_name: 'rroque98/movieListReact',
  //   description: null,
  //   url: 'https://api.github.com/repos/rroque98/movieListReact',
  //   forks: 0,
  //   watchers: 0}
  //   ];
  //   res.send(exampleData);
  // TODO - your code here!
  // res.send('yayyy')
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

