const md5 = require("md5");
const sha1 = require("sha1");
const db = require('./db');

require('../config/config.js');
var mysql = require('mysql2/promise');
//const  sql = require('mssql');
//console.log(config);
console.log(global.config);
/*var con = mysql.createConnection({
    host: global.config.vals.database.host, port:global.config.vals.database.port,
    user: global.config.vals.database.user,
    password: global.config.vals.database.password,
    database: global.config.vals.database.name
});*/
var config = {
  server: global.config.vals.database.host,
  user: global.config.vals.database.user,
  password: global.config.vals.database.password,
  options: {
    trustedconnection:  true,
    enableArithAbort:  true,
    instancename:  'SQLEXPRESS'  // SQL Server instance name
  },
  database: global.config.vals.database.name,
  port: 3307
};
var result1 = [];
var stat = false;
var login_time = Math.floor(new Date().getTime() / 1000);

async function check_(post,res1) {
  
    const conn = await db.connection();
   //console.log(post)
   //console.log("query","select * FROM session where s_token=")
    try {   
        if (post.token) {
            let [rows1, fields1] = await conn.execute("select * FROM session where s_token=?", [post.token]);

            if (rows1[0]) {

                let [rows, fields] = await conn.execute("select * FROM users where user_id=? ", [rows1[0].s_user_id]);

                conn.release();

                //return { stat : true , result : rows };
                if (rows[0]) {
                   //console.log(rows[0]["fullname"])
                    res1.json({ message: 1, name: rows[0]["fullname"] });

                } else {
                   //console.log("NO")
                    res1.json({ message: 0 })

                }

            } else {
               //console.log("NO")
                res1.json({ message: 0 })

            }
        } else {
           //console.log("NO")
            res1.json({ message: 0 })
        }

    }

    catch (err) {
        res1.json({ message: 0 })
       //console.log(err);
    
      }
      
    }
exports.check_ = function (token,res1) {
    var login_time = Math.floor(new Date().getTime() / 1000);
    var mysql = require('mysql2'); 
    var config = require('../config/config.js');
    var con = mysql.createConnection({
        host: global.config.vals.database.host, port:global.config.vals.database.port,
        user: "root",
        password: global.config.vals.database.password,
        database: global.config.vals.database.name
      });
      
      con.connect(function(err) {
        
        if (err) throw err;

        var res = con.query("select * FROM session where s_token=?",[token.token], function (err, result, fields) {        
           //console.log(result); 
            if(result[0]){
                var res = con.query("select * FROM users where user_id=?",[result[0].s_user_id], function (err, result2, fields) { 
                if(result[0]){
                    res1.json({ message: 1 , name: result2[0]["fullname"]});            
                }
                else{
                    res1.json({ message: 0 });
                }
                
                });
            }else{
                res1.json({ message: 0 });
            }
        });
       //console.log(res.sql);
      });
  };

  module.exports = {
    check_:  check_,
  }
