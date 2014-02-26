//requires
var express = require('express'), 
app = express()

app.get('/', function(req, res){
  res.send('hello')
});

app.listen(3000);
console.log('listening on 3000');

