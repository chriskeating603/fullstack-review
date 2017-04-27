var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  username: "string",
  githubName: "string",
  url: "string"
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;