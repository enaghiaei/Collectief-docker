const md5 = require("md5");
const sha1 = require("sha1");

exports.delete_ = function (schedule, res0) {
   //console.log(schedule)
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1 = false;
    var insert_id = 0;
    var mysql = require('mysql2'); var config = require('../config/config.js');
    var con = mysql.createConnection({
        host: "mysql_db", port:"3306",        
        user: global.config.vals.database.user,
        password: global.config.vals.database.password,
        database: global.config.vals.database.name
    });

    con.connect(function (err) {

        if (err) throw err;
        // var res1 = con.query("select * FROM session where s_token=?",[token.token], function (err, result0, fields) {  
        //console.log(result0);
        //var val = [[JSON.stringify(schedule)]];
        var sql = "update schedule set sc_deleted='1' where sc_id = ?";
        var where = [schedule.id];
        con.query(sql, where, function (err, result) {
            if (err) throw err;
            updated = result.affectedRows;
            if (updated > 0) {
                var res2 = con.query("select sc_schedule AS sce,sc_id AS id FROM schedule where sc_deleted =0 and user_id=?", [0], function (err, result, fields) {
                   //console.log(result);
                    res0.json({ message: 1,result: result });
                });
              
            }
            else {
                res0.json({ message: 0});
            }
           //console.log("Number of records updated: " + result.affectedRows);
        });
        //});
        //console.log(res.sql);

    });

};
