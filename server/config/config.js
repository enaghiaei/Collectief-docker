module.exports = global.config = {
    vals: {
        local_ip: {
            value: "192.168.43.91"
        },
        root: {
            ip: "localhost:8081"
        },
        database: {
            password: "collectief_user",
            name: "collectief",
            user: "collectief_user",
            port: "3307",
            host:"mysql_db"

        }
        // rest of your translation object
    }
    // other global config variables you wish
    //  value: "192.168.43.91"
};