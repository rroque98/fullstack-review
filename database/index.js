const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.once('open', function() {
    // we're connected!
    let repoSchema = mongoose.Schema({
    // TODO: your schema here!
    full_name: String,
    description: String,
    url: String,
    forks: Number,
    watchers: Number
  });

  let Repo = mongoose.model('Repo', repoSchema);

  let save = (data) => {
    // console.log('data here: ', data)
    // console.log('data in save function here: ', data)
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
    var repoInstance = new Repo(data);

    repoInstance.save(function(err, stored) {
      if (err) {
        console.log('err when saving data: ', err);
      }
    });
  }

  let find = function(callback) {
    Repo.find({}, null, function(err, repos) {
    // let find = Repo.find({ full_name: 'rroque98/movieListReact'}, null, function(err, repo) {
      if (err) {
        console.log('err in database query: ', err);
      } else {
        //callback
          callback(null, repos); // array of repos
      }
    });
  };

  // let retrievedRepos = function(query, cb) {
  //   cb(null, repos);
  // }
  module.exports.save = save;
  module.exports.find = find;
  // module.exports.Repo = Repo;
});


