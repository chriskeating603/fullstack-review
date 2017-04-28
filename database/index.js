var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
  var repoSchema = mongoose.Schema({
    'username': String,
    'reponame': String,
    'repoURL': String,
    'repoForkCount': Number
  });
// });


var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;