const md5 = require("md5");
const sha1 = require("sha1");

exports.save_ = function (schedule, res0) {
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
       //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        if (err) throw err;
        
    });

    var val = [schedule.sensor];
    var res1 = con.query("select * FROM collectief_assignment where sensor_id=? and ca_deleted=0", [val], function (err, result0, fields) {
       //console.log("***********************************************", result0);
       //console.log(res1.sql);
        if (result0.length == 0) {
            var val = [[schedule.location, schedule.sensor, 0]];
            var res = con.query("INSERT INTO collectief_assignment (cl_id,sensor_id,ca_user) VALUES ?", [val], function (err, result, fields) {
                //console.log(res.sql);
                //console.log(result); 
                insert_id = result.insertId;
                if (insert_id > 0)
                    res0.json({ message: 1, token: insert_id });
                else {
                    res0.json({ message: 0 });
                }
                con.end();
            });
        }
        else {
            res0.json({ message: -1, token: -1 });
            con.end();
        }

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
       // else {
       //     res0.json({ message: -1, token: -1 });
       // }
    
        //console.log(res.sql);

  
    //con.close();    
 

};
