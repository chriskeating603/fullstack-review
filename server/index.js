var express = require('express');
var bodyParser = require('body-parser')
var request = require('request')
var Repo = require('../database/index')
var app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/repos/import', function (req, res) {
  var term = req.body.term;
  request({
    'url': `https://api.github.com/users/${term}/repos?access_token=972a03af4b453deadd9fef79821285e6c555f71c`, 
    'headers': {'User-Agent': 'ckeating-nh'},
    'json': true
  }, function (error, response, body) {
    if (error) {return console.log('err', error)};
    // console.log(body[0])
    for (var i = 0; i < body.length; i++) {
      var obj = new Repo ({
        username: body[i].owner.login,
        url: body[i].url
      })
      obj.save(function (err, obj) {
        if (err) {return console.log('err', err)}
        else {console.log('saved')}
      })
    }
    res.send('posted')
  })
});

app.get('/repos', function (req, res) {
  Repo.find(function (err, repos) {
    if (err) {return console.log(err)}
    else {console.log(repos)}
    res.send(repos)
  })
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

