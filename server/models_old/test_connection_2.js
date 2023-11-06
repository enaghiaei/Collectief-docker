const e = require("express");
const md5 = require("md5");
const sha1 = require("sha1");

exports.test_connection_2 = function (token,res0) {

    

    const { Client } = require('ssh2');

    const conn = new Client();
    conn.on('ready', () => {
       //console.log('Client :: ready');
        conn.shell((err, stream) => {
            if (err) throw err;
            stream.on('close', () => {
               //console.log('Stream :: close');
                conn.end();
            }).on('data', (data) => {
               //console.log('OUTPUT: ' + data);
            });
            stream.end('ls -l\nexit\n');
        });
    }).connect({
        host: '194.4.144.60',
        port: 23822,
        username: 'root',
        password: '2c141d461390'
    });

      
  };
