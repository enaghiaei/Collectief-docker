const md5 = require("md5");
const sha1 = require("sha1");

exports.create = function (req,ip,res0) {
   //console.log(req);
    var token = req.token;
    req.country = ""
    req.country = ""
    req.country = ""
    var login_time = Math.floor(new Date().getTime() / 1000);
    var result1=false;
    var insert_id = 0;
    var updated = 0;
    var mysql = require('mysql2'); 
    require('../config/config.js');
    var token_list = [];
    
    var con = mysql.createConnection({
        host: global.config.vals.database.host, port:global.config.vals.database.port,
        user: global.config.vals.database.user,
        password: global.config.vals.database.password,
        database: global.config.vals.database.name
      });
      
      con.connect(function(err) {
        
        if (err) throw err;
        

      });

    var res3 = con.query("select * FROM session where s_token=?", [token], function (err, result0, fields) {
        if (err) throw err;
       //console.log(res3.sql);
        // var res1 = con.query("select * FROM session where s_token=?",[token.token], function (err, result0, fields) {  
       //console.log(result0);
        var val = [[req.username, md5(req.password), req.name, req.phone, result0[0].s_user_id,req.user_type]];
        var res = con.query("INSERT INTO users (email,password,fullname,phone_number,owner,user_type) VALUES ?", [val], function (err, result, fields) {
           console.log(res.sql);
            console.log(result); 
            insert_id = result.insertId;
            if (insert_id > 0) {

                sql = "update users set token='" + md5(sha1(insert_id)) + "' where user_id = ?";
                var where = [insert_id];
                var res3 = con.query(sql, where, function (err, result) {
                    if (err) throw err;
                    updated = result.affectedRows;
                   //console.log(res3.sql);
                   //console.log(token_list);
                    var x = {};
                    var user_type = parseInt(req.user_type)
                    if (user_type === 4) {
                        var success = 0;
                        var fail = 0;
                        for (var key in req.location_id) {
                        x.unit = "";
                        x.building = "";
                        x.cluster = "";

                        var res4 = con.query("select cl_title,cl_id,cl_parent FROM collectief_location where cl_id = ?", [req.location_id[key]], function (err, result000, fields) {
                            x.unit = result000[0]["cl_title"];
                            console.log("x", x)
                            console.log(result000)
                            //console.log("x", x)
                            //console.log("/////////////////////////////////////////////////////")
                            //console.log(result000);
                            if (result000[0]) {
                                var res5 = con.query("select collectief_location.cl_title,collectief_location.cl_id,collectief_location.cl_parent,clt.cl_title AS cl_title2,clt.cl_id AS cl_id2,clt.cl_parent AS cl_parent2 FROM collectief_location JOIN collectief_location AS clt ON collectief_location.cl_parent = clt.cl_id where collectief_location.cl_id = ?", [result000[0]["cl_parent"]], function (err, result001, fields) {
                                    x.building = result001[0]["cl_title"];
                                    x.cluster = result001[0]["cl_title2"];
                                    //console.log("x", x)
                                    if (insert_id > 0 && updated > 0) {
                                        var val = [[req.country, req.address, req.position, insert_id, req.location_id[key], JSON.stringify(x)]];
                                        //console.log(val)
                                        var res20 = con.query("INSERT INTO users_detail (ud_country,ud_address,ud_position,user_id,location_id,location_detail) VALUES ?", [val], function (err, result4, fields) {
                                            //console.log(res20.sql);
                                            
                                            success++;
                                        });
                                        //res0.json({ message: 1 });

                                    }
                                    else {
                                        fail++;
                                    }
                                });
                            }
                        });
                        }

                        if (success > 0) {
                            res0.json({ message: 1 });
                            con.end();
                        } else {
                            res0.json({ message: 0 });
                            con.end();
                        }

                    }
                    else if (user_type === 3)
                    {

                        var res4 = con.query("select cl_title,cl_id,cl_parent FROM collectief_location where cl_id = ?", [req.location_id], function (err, result000, fields) {
                            x.building = result000[0]["cl_title"];
                           //console.log("x", x)
                            x.unit = "";
                           //console.log("x", x)
                           //console.log("/////////////////////////////////////////////////////")
                           //console.log(result000);
                            if (result000[0]) {
                                var res5 = con.query("select cl_title,cl_id,cl_parent FROM collectief_location where cl_id = ?", [result000[0]["cl_parent"]], function (err, result001, fields) {
                                    x.cluster = result001[0]["cl_title"];
                                   //console.log("x", x)
                                    if (insert_id > 0 && updated > 0) {
                                        var val = [[req.country, req.address, req.position, insert_id, req.location_id, JSON.stringify(x)]];
                                       //console.log(val)
                                        var res20 = con.query("INSERT INTO users_detail (ud_country,ud_address,ud_position,user_id,location_id,location_detail) VALUES ?", [val], function (err, result4, fields) {
                                           //console.log(res20.sql);
                                            res0.json({ message: 1 });
                                            con.end();
                                        });
                                        //res0.json({ message: 1 });

                                    }
                                    else {
                                        res0.json({ message: 0 });
                                        con.end();
                                    }
                                });
                            }
                        });                       
                        
                    }
                    else if (user_type === 2) {

                        x.unit = "";
                        x.building = "";
                        var res4 = con.query("select cl_title FROM collectief_location where cl_id = ?", [req.location_id], function (err, result000, fields) {
                            x.cluster = result000[0]["cl_title"];
                            if (insert_id > 0 && updated > 0) {
                                var val = [[req.country, req.address, req.position, insert_id, req.location_id, JSON.stringify(x)]];
                               //console.log(val)
                                var res20 = con.query("INSERT INTO users_detail (ud_country,ud_address,ud_position,user_id,location_id,location_detail) VALUES ?", [val], function (err, result4, fields) {
                                   //console.log(res20.sql);
                                    res0.json({ message: 1 });
                                    con.end();
                                });
                                //res0.json({ message: 1 });

                            }
                            else {
                                res0.json({ message: 0 });
                                con.end();
                            }
                        });                       
                       
                    }
                    else if (user_type === 1) {

                        x.cluster = "";
                        x.unit     = "";
                        x.building = "";
                        if (insert_id > 0 && updated > 0) {
                            var val = [[req.country, req.address, req.position, insert_id, req.location_id, JSON.stringify(x)]];
                           //console.log(val)
                            var res20 = con.query("INSERT INTO users_detail (ud_country,ud_address,ud_position,user_id,location_id,location_detail) VALUES ?", [val], function (err, result4, fields) {
                               //console.log(res20.sql);
                                res0.json({ message: 1 });
                                con.end();
                            });
                            //res0.json({ message: 1 });

                        }
                        else {
                            res0.json({ message: 0 });
                            con.end();
                        }
                        
                    }
                  
                   
                });

            } else {
                con.end();
            }

        });
        //});
        //console.log(res.sql);

    });
      
  };
