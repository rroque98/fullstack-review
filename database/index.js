const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

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
  // console.log('data in save function here: ', data)
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repoInstance = new Repo(data);

  repoInstance.save(function(err, stored) {
    if (err) {
      console.log('err when saving data: ', err);
    }
    console.log('data I just stored: ', stored);

  });
  // Repo.create(data, function(err, storedData) {
  //   if (err) {
  //     console.log('ERROR CREATEING DATA: ', err);
  //   }
  //   console.log('data I just stored: ', storedData);
  // });

}

let find = Repo.find({}, null, function(err, repo) {
// let find = Repo.find({ full_name: 'rroque98/movieListReact'}, null, function(err, repo) {
  if (err) {
    console.log('err in database query: ', err);
  } else {
    console.log('inside find func, repo:', repo);
  }
});

module.exports.save = save;
module.exports.find = find;