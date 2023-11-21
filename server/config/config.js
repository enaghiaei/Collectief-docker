module.exports = global.config = {
    vals: {
        local_ip: {
            value: "192.168.43.91"
        },
        root: {
            ip: "localhost:8081"
        },
        database: {                       
            user: "collectief_user",
            password: "collectief_user", 
            name: "collectief",
            port: "3307",
            host:"mysql_db"

        },        
        database_hub_core: {                      
            user: "root",
            password: "marco",  
            name: "collectief_db",
            port: "3306",
            host: "maria_db"
        }
        // rest of your translation object
    }
    // other global config variables you wish
    //  value: "192.168.43.91"
};