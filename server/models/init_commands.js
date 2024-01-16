const md5 = require("md5");
const sha1 = require("sha1");
require('dotenv').config();
var mysql = require('mysql2/promise');
var config = require('../config/config.js');
async function init_(token, res0) {
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1 = false;
    //var sqlite3 = require('sqlite3');
    //var sqlite = require('sqlite-sync');
    const num_t = process.env.n;
    //const Database = require('better-sqlite3');


    let [rows, fields] = [[], []];
    var con = await mysql.createConnection({
        host: global.config.vals.database.host, port: global.config.vals.database.port,
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
        db.each(SELECT DISTINCT sensor_serial FROM main.node_22040367, (err, row) => {
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
    var date = new Date(today.getTime() - (1000 * 300 * 60 * 1));
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
    var [result_table] = await con.execute(`SELECT TABLE_NAME
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = 'collectief'
      AND TABLE_NAME = 'node_per_hour'`);
   
    [result] = await con.execute(` CREATE TABLE IF NOT EXISTS node_per_hour(
        nph_id bigint NOT NULL,
        nph_cl_id int NOT NULL DEFAULT '0',
        nph_max varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_min varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_avg varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_kind varchar(50) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_name varchar(50) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_from varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_to varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_from2 varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_to2 varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_unixtime bigint NOT NULL DEFAULT '0',
        sensor_serial varchar(20) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_status int NOT NULL DEFAULT '0'
    ) ENGINE = MyISAM DEFAULT CHARSET = utf16;
`);
    if (result_table.length === 0) {
        var [result_i1] = await con.execute(`ALTER TABLE node_per_hour
        ADD PRIMARY KEY (nph_id)`);
        var [result_i2] = await con.execute(`ALTER TABLE node_per_hour
        MODIFY nph_id bigint NOT NULL AUTO_INCREMENT;`);
    }
    console.log("result1", result)
    console.log("result_table", result_table)
    var [result_table2] = await con.execute(`SELECT TABLE_NAME
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = 'collectief'
      AND TABLE_NAME = 'node_per_4hour'`);
    var [result2] = await con.execute(` CREATE TABLE IF NOT EXISTS node_per_4hour(
            nph_id bigint NOT NULL,
            nph_cl_id int NOT NULL DEFAULT '0',
            nph_max varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_min varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_avg varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_kind varchar(50) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_name varchar(50) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_from varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_to varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_from2 varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_to2 varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_unixtime bigint NOT NULL DEFAULT '0',
            sensor_serial varchar(20) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
            nph_status int NOT NULL DEFAULT '0'
        ) ENGINE = MyISAM DEFAULT CHARSET = utf16;
    `);
    if (result_table2.length === 0) {
        var [result_i1] = await con.execute(`ALTER TABLE node_per_4hour
        ADD PRIMARY KEY (nph_id)`);
        var [result_i2] = await con.execute(`ALTER TABLE node_per_4hour
        MODIFY nph_id bigint NOT NULL AUTO_INCREMENT;`);
    }
    console.log("result2", result2)
    var [result_table3] = await con.execute(`SELECT TABLE_NAME
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = 'collectief'
      AND TABLE_NAME = 'node_per_4day'`);
    var [result3] = await con.execute(` CREATE TABLE IF NOT EXISTS node_per_4day(
        nph_id bigint NOT NULL,
        nph_cl_id int NOT NULL DEFAULT '0',
        nph_max varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_min varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_avg varchar(10) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_kind varchar(50) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_name varchar(50) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_from varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_to varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_from2 varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_to2 varchar(25) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_unixtime bigint NOT NULL DEFAULT '0',
        sensor_serial varchar(20) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
        nph_status int NOT NULL DEFAULT '0'
    ) ENGINE = MyISAM DEFAULT CHARSET = utf16;
`);
    if (result_table3.length === 0) {
        var [result_i1] = await con.execute(`ALTER TABLE node_per_4day
        ADD PRIMARY KEY (nph_id)`);
        var [result_i2] = await con.execute(`ALTER TABLE node_per_4day
        MODIFY nph_id bigint NOT NULL AUTO_INCREMENT;`);
    }
    console.log("result3", result3)
   //console.log("log", "SELECT measure_kind,measure_name,AVG(measure_value) AS av FROM node_2204036" + num_t + " WHERE " + " timestamp >= '" + x + "' GROUP BY measure_kind")
    //db.close();
    //var rows = db.prepare("SELECT DISTINCT sensor_serial FROM main.node_22040367").all();
   //console.log("Temprature::::::::::::::::::::",rows);
    await con.commit();
    con.close();
    //res0.json({ result: rows });  
    return { result: rows }
};

module.exports = {
    init_: init_
}
