const e = require("express");
const md5 = require("md5");
const sha1 = require("sha1");

exports.get_users = function (token,res0) {
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1=false;
    var mysql = require('mysql2'); var config = require('../config/config.js');
    var con = mysql.createConnection({
        host: "mysql_db", port:"3307",
        user: global.config.vals.database.user,
        password: global.config.vals.database.password,
        database: global.config.vals.database.name
      });
     //console.log("eeeeeeesssssssssssssss");
     //console.log(token);
     //console.log("bbbbbbbbbbbbbeeeeeeesssssssssssssss");

      con.connect(function(err) {
        
        if (err) throw err;
        var res1 = con.query("select * FROM session where s_token=?",[token.token], function (err, result0, fields) {  
           //console.log(result0);
            if(result0[0]){
            var res = con.query("select * FROM users where user_id=? or owner=?",[result0[0].s_user_id,result0[0].s_user_id], function (err, result, fields) {        
           //console.log(result); 
            res0.json({ result: result });
        
        });
    }else{
        res0.json({ result: [] });
    }

    });
        //console.log(res.sql);
        
      });
      
  };