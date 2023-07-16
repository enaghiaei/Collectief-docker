const md5 = require("md5");
const sha1 = require("sha1");
require('dotenv').config();
exports.get_sensor_data = function (token,res0) {
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1 = false;
    //var sqlite3 = require('sqlite3');
    var sqlite = require('sqlite-sync');
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
    //console.log("sensor" + token.serial_id)
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

    var s = date.getSeconds();
    var m = date.getMinutes();
    var h = date.getHours();
    var x = today3 + "-" + today1 + "-" + today2 + " " + h + ":" + m + ":" + s;
    sqlite.connect("./db/XYZ_API_sphensor_data.db");
    if (num_t == "7")
        var rows = sqlite.run("SELECT * FROM main.node_2204036" + num_t + " where sensor_serial='" + token.serial + "' order by timestamp desc LIMIT 10");
    else {
        var rows = sqlite.run("SELECT * FROM main.node_2204036" + num_t + " where timestamp >= '" + x + "'" +" AND  sensor_serial='" + token.serial + "' order by timestamp desc LIMIT 10");
    }

    //var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_22040367").all();
    sqlite.close();
   //console.log(rows);
    res0.json({ result: rows });  
    return { result: rows }
  };
