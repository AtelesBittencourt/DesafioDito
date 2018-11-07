let express = require('express');
let router = express.Router();
var mysql = require('mysql');

router.route('/')
  .get((request, response) => {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "desafiodito"
    });
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM navegacao", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        response.json(result);
      });
    });
  })

  .post((request, response) => {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "desafiodito"
    });
    con.connect(function(err) {
      if (err) throw err;
      //console.log("Connected!");
      var sql = "INSERT INTO navegacao (event, timestamp) VALUES ('" + request.body.event + "', '" + request.body.timestamp + "')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("1 record inserted");
      });
    });
    response.json(true);
    //console.log(request.body);
  })

module.exports = router;