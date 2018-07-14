const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, cb/* TODO */) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  // console.log('username: ', username)
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  function callback(error, response, body) {
    if (error) {
      cb(error);
    }
    var bodyArr = JSON.parse(body);
    var customRepoArr = [];
    bodyArr.forEach(function(repo) {
      var customRepo = {
        full_name: repo.full_name,
        description: repo.description,
        url: repo.url,
        forks: repo.forks,
        watchers: repo.watchers
      }
      customRepoArr.push(customRepo);
    });
    // console.log('custom repos here', customRepoArr)
    cb(null, customRepoArr);

  // if (!error && response.statusCode == 200) {
  //   var info = JSON.parse(body);
  //   console.log(info.s + " Stars");
  //   console.log(info.forks_count + " Forks");
  // }
  }
request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;