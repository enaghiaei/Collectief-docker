const md5 = require("md5");
const sha1 = require("sha1");
require('dotenv').config();
exports.get_sensors_info = function (token,res0) {
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1 = false;
    //var sqlite3 = require('sqlite3');
    //var sqlite = require('sqlite-sync');
    const Database = require('better-sqlite3');
    const db = new Database('./db/XYZ_API_sphensor_data.db', { verbose: console.log });
    const num_t = process.env.n;
    /*let db = new sqlite('./db/XYZ_API_sphensor_data.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error("err00",err.message);
        }
       //console.log('Connected to the chinook database.');
    });

    db.serialize(() => {
        var result = [];
        db.each(`SELECT DISTINCT sensor_serial FROM main.node_22040367`, (err, row) => {
            if (err) {
                console.error("errrrrroor",err.message);
            }
           //console.log(row);
            result[result.length] = row;
        });
        res0.json({ result: result });   
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
       //console.log('Close the database connection.');
    });
    */
    var today = new Date();
    var date = new Date(today.getTime() - (1000 * 30 * 60 * 1));
    //let date = new Date();
    let today_ = date.toLocaleDateString();
   //console.log("today_", today_)
    var today_tmp = today_.split("/");
   //console.log("today_tmp", today_tmp)
    let today1 = today_tmp[0];
    let today2 = today_tmp[1];
    let today3 = today_tmp[2];
    if (today1 < 10) {
        today1 = "0" + today1;
    }
    if (today2 < 10) {
        today2 = "0" + today2;
    }
    var s = date.getSeconds();
    var m = date.getMinutes();
    var h = date.getHours();
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (h < 10) {
        h = "0" + h;
    }
    var x = today3 + "-" + today1 + "-" + today2 + " " + h + ":" + m + ":" + s;
    //sqlite.connect("./db/XYZ_API_sphensor_data.db");
    var rows3 = [];
    if (num_t == "7")
        var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_2204036" + num_t + " WHERE 1=1").all();
    else
        var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_2204036" + num_t + " WHERE timestamp >= '" + x + "'").all();
   //console.log(rows);
    var g = 0;
    for (var key in rows) {
        if (num_t == "7")
            var rows2 = db.prepare("SELECT * FROM main.node_2204036" + num_t + " where  sensor_serial='" + rows[key].sensor_serial + "' order by timestamp desc LIMIT 1").all();
        else
            var rows2 = db.prepare("SELECT * FROM main.node_2204036" + num_t + " where timestamp >= '" + x + "'" + " AND sensor_serial='" + rows[key].sensor_serial + "' order by timestamp desc LIMIT 1").all();

        var rows2_0 = db.prepare("SELECT DISTINCT sensor_serial,measure_name,measure_value,measure_kind,sensor_type,channel,timestamp FROM main.node_2204036" + num_t + " where timestamp = '" + rows2[0].timestamp + "'" + " AND sensor_serial='" + rows[key].sensor_serial + "'").all();
       //console.log(rows2)
        for (var key2_0 in rows2_0) {
            rows3[g++] = rows2_0[key2_0];
        }
    }
    db.close();
    //var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_22040367").all();
   //console.log(rows3);
    res0.json({ result: rows3 });  
    return { result: rows3 }
  };
