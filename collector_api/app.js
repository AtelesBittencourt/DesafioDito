let express = require('express');
var myParser = require("body-parser");
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(myParser.json({extended : true}));
app.use('/', require('./routes/routes.js'));

app.listen(3001);