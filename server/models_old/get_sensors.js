const md5 = require("md5");
const sha1 = require("sha1");
require('dotenv').config();
var mysql = require('mysql2/promise');
var config = require('../config/config.js');
async function get_sensors(token,res0) {
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1 = false;
    //var sqlite3 = require('sqlite3');
    //var sqlite = require('sqlite-sync');
    //var sqlite = require('sqlite-sync');
    const num_t = process.env.n;
    //const Database = require('better-sqlite3');


    let [rows, fields] = [[], []];
    var con = await mysql.createConnection({
        host: "mysql_db", port:"3307",
        user: global.config.vals.database.user,
        password: global.config.vals.database.password,
        database: global.config.vals.database.name
    });

    await con.beginTransaction();
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
    //const db = require('better-sqlite3-int')('./db/XYZ_API_sphensor_data.db', options);
    if (num_t == "7") {
        //var rows = sqlite.run("SELECT DISTINCT sensor_serial FROM main.node_2204036" + num_t + " WHERE 1 = 1");
        //var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_2204036" + num_t + " WHERE 1 = 1").all();
       //console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    }
    else
        [rows, fields] = await con.execute("SELECT DISTINCT sl_sensor AS sensor_serial,cl_title AS title,cl_deleted,ca_deleted,sl_status AS status FROM sensors_list LEFT JOIN collectief_assignment ON sensors_list.sl_sensor = collectief_assignment.sensor_id LEFT JOIN collectief_location ON collectief_location.cl_id = collectief_assignment.cl_id  WHERE 1");
    //sqlite.close();
    //var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_22040367").all();
    //db.close();
    var sensors = []
    for (var key in rows) {
        if (!sensors.includes(rows[key].sensor_serial)) {
            var x = sensors.length;
            //sensors[x] = {};
            sensors[x] = rows[key].sensor_serial;
            
        }
    }
   //console.log(rows);
    res0.json({ result: sensors, all: rows });  
    await con.commit();
    con.close();
    return { result: sensors, all: rows }
};

module.exports = {
    get_sensors: get_sensors
}