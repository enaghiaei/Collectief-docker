const md5 = require("md5");
const sha1 = require("sha1");
require('dotenv').config();
exports.get_sensors_info = function (token,res0) {
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
    
    sqlite.connect("./db/XYZ_API_sphensor_data.db");
    var rows3 = [];
    if (num_t == "7") {
        var rows = sqlite.run("SELECT DISTINCT sensor_serial FROM main.node_2204036" + num_t);
    } else {
        var rows = sqlite.run("SELECT DISTINCT sensor_serial FROM main.node_2204036" + num_t);
    }
   //console.log(rows);
    for (var key in rows) {
        var rows2 = sqlite.run("SELECT * FROM main.node_2204036" + num_t +" where sensor_serial='" + rows[key].sensor_serial + "' order by timestamp desc LIMIT 1");
       //console.log(rows2)
        rows3[key] = rows2[0];
    }
    sqlite.close();
    //var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_22040367").all();
   //console.log(rows3);
    res0.json({ result: rows3 });  
    return { result: rows3 }
  };
