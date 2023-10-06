const md5 = require("md5");
const sha1 = require("sha1");

async function get_(token, res0) {
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1 = false;
    var mysql = require('mysql2');
    var config = require('../config/config.js');
    var con = mysql.createConnection({
        host: "mysql_db", port:"3307",
        user: global.config.vals.database.user,
        password: global.config.vals.database.password,
        database: global.config.vals.database.name
    });

    con.connect(function (err) {

        if (err) throw err;
        var res1 = con.query("select * FROM session where s_token=?", [token.token], function (err, result0, fields) {
           //console.log(result0);
            if (result0[0]) {
                var res = con.query("select * FROM collectief_boxes where  cb_deleted =0 and  cb_user=?", [result0[0].s_user_id], function (err, result, fields) {
                   //console.log(result);
                    if (result.length != 0) {
                        res0.json({ result: result });
                    } else {
                        var res2 = con.query("select * FROM collectief_boxes JOIN users ON collectief_boxes.cb_user = users.user_id where  cb_deleted =0 and  is_admin=1" , function (err, result2, fields) {
                            res0.json({ result: result2 });
                        });
                    }
        });
        //
            } else {
                res0.json({ result: [] });
            }
        });
        //console.log(res.sql);

    });

    //con.close();

};

module.exports = {
    get_: get_
}
