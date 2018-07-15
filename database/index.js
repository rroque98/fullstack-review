const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

db.once('open', function() {
    let repoSchema = mongoose.Schema({
    full_name: String,
    description: String,
    url: String,
    forks: Number,
    watchers: Number
  });

  let Repo = mongoose.model('Repo', repoSchema);

  let save = (data) => {
    var repoInstance = new Repo(data);
    repoInstance.save(function(err, stored) {
      if (err) {
        console.log('err when saving data: ', err);
      }
    });
  }

  let find = function(callback) {
    Repo.find({}, null, function(err, repos) {
      if (err) {
        console.log('err in database query: ', err);
      } else {
          callback(null, repos);
      }
    });
  };

  module.exports.save = save;
  module.exports.find = find;
});


