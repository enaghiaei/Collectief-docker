const md5 = require("md5");
const sha1 = require("sha1");

exports.update_notification = function (schedule, res0) {
   //console.log(schedule)
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1 = false;
    var insert_id = 0;
    var mysql = require('mysql2'); var config = require('../config/config.js');
    var con = mysql.createConnection({
        host: "mysql_db", port:"3307",        
        user: global.config.vals.database.user,
        password: global.config.vals.database.password,
        database: global.config.vals.database.name
    });
   //console.log(global.config)
    con.connect(function (err) {

        if (err) throw err;
        // var res1 = con.query("select * FROM session where s_token=?",[token.token], function (err, result0, fields) {
        //console.log(result0);
        var x = JSON.stringify(schedule);
       //console.log(x)
        var val = [schedule.val, schedule.unit, schedule.operation];
        var where = [schedule.id];
        var sql = "update notification set nt_value='" + schedule.val + "',nte_id='" + schedule.unit + "',nt_operation='" + schedule.operation + "' where nt_id = ?";
        //var res = con.query("INSERT INTO notification (nt_value,nt_type,nt_operation) VALUES ?", [[val]], function (err, result, fields) {
            con.query(sql, where, function (err, result) {
            //console.log(res.sql);        
            //console.log(result); 
                insert_id = result.affectedRows;
            if (insert_id > 0 )
                res0.json({ message: 1, token: insert_id });
            else {
                res0.json({ message: 0});
            }
            //con.close();
           /* if (insert_id > 0) {

                sql = "update projects_file set pf_token='" + md5(sha1(insert_id)) + "' where pf_id = ?";
                var where = [insert_id];
                con.query(sql, where, function (err, result) {
                    if (err) throw err;
                    updated = result.affectedRows;
                    if (insert_id > 0 && updated > 0)
                        res0.json({ message: 1, r1: r1, token: md5(sha1(insert_id)) });
                    else {
                        res0.json({ message: 0, r1: r1 });
                    }
                   //console.log("Number of records updated: " + result.affectedRows);
                });
            }*/

        });
        //con.close();
        //});
        //console.log(res.sql);

    });
   

};