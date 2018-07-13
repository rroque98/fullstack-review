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
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repoInstance = new Repo(data);

  repoInstance.save(function(err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports.save = save;