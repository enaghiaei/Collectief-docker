const md5 = require("md5");
const sha1 = require("sha1");

exports.save_ = function (schedule, res0) {
   //console.log("schedule",schedule)
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
   //console.log(global.config)
    con.connect(function (err) {

        if (err) throw err;
        var res1 = con.query("select * FROM session where s_token=?", [schedule.token], function (err, result0, fields) {
        //console.log(result0);
        var val = []
        if (schedule.boxes != "[]" && schedule.boxes_top != "[]")
            val = [[schedule.boxes, schedule.boxes_top]];
        else if (schedule.boxes != "[]")
            val = [[schedule.boxes]];
        else if (schedule.boxes_top != "[]")
            val = [[schedule.boxes_top]];
        var res;
            val = [[schedule.boxes, schedule.boxes_top, result0[0].s_user_id]];
        var query = ""
        if (schedule.boxes != "[]" && schedule.boxes_top != "[]")
            query = "INSERT INTO collectief_boxes (cb_type,cb_type_2,cb_user) VALUES ?";
        else if (schedule.boxes != "[]")
            query = "INSERT INTO collectief_boxes (cb_type,cb_user) VALUES ?";
        else if (schedule.boxes_top != "[]")
            query = "INSERT INTO collectief_boxes (cb_type_2,cb_user) VALUES ?";
             query = "INSERT INTO collectief_boxes (cb_type,cb_type_2,cb_user) VALUES ?";
       //console.log("val",val)
       //console.log("query", query); 
        
        res = con.query(query, [val], function (err, result, fields) {
           //console.log("sql",res.sql);        
            //console.log(result); 
            insert_id = result.insertId;
            if (insert_id > 0 )
                res0.json({ message: 1, token: insert_id });
            else {
                res0.json({ message: 0});
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
        
        });
        //console.log(res.sql);

    });
    //con.close();    
 

};